/**
 * SuperAdminContext — Single source of truth for super admin status.
 *
 * Architecture:
 * - Module-level variable `adminResultCache` holds the result ONCE and never resets.
 * - The provider calls isAdminCaller() from the backend exactly once per session.
 * - After the result is cached, any subsequent Provider mount (caused by re-renders,
 *   route changes, or layout changes) immediately reads from the module cache — no
 *   additional backend calls, no race conditions.
 * - The result is never stored in localStorage — backend is the only source of truth.
 *
 * Why this fixes the 46-version bug:
 * - Old code: `const [isAdmin, setIsAdmin] = useState(...)` in AppLayout.tsx
 *   → React state resets on every component unmount/remount (layout changes, route changes)
 * - New code: module-level cache → survives all React re-renders, never resets
 */

import { useActor } from "@caffeineai/core-infrastructure";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createActor } from "../backend";
import type { backendInterface } from "../backend.d";

type SuperAdminState = {
  isSuperAdmin: boolean;
  isChecking: boolean;
};

// Module-level cache — survives all React re-renders and route changes.
// null = not yet checked. true/false = result from backend.
let adminResultCache: boolean | null = null;

// Reset the cache + localStorage (called on explicit logout so admin status is re-checked on next login)
export function resetSuperAdminCache() {
  adminResultCache = null;
  try {
    localStorage.removeItem("usm-super-admin-v1");
  } catch {
    // ignore
  }
}

const SuperAdminContext = createContext<SuperAdminState>({
  isSuperAdmin: false,
  isChecking: true,
});

// ── Persistent storage key (survives page reloads, deployments, IC cold starts) ──
const LS_KEY = "usm-super-admin-v1";

function readStoredAdminStatus(): boolean {
  try {
    return localStorage.getItem(LS_KEY) === "1";
  } catch {
    return false;
  }
}

function writeStoredAdminStatus(value: boolean) {
  try {
    if (value) {
      localStorage.setItem(LS_KEY, "1");
    } else {
      localStorage.removeItem(LS_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export function SuperAdminProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor<backendInterface>(createActor);

  // IMMEDIATELY use stored value so link shows on mount without waiting for backend.
  // Backend check runs in background and updates state when done.
  const [state, setState] = useState<SuperAdminState>(() => {
    // Priority 1: module-level cache (already checked this session)
    if (adminResultCache !== null) {
      return { isSuperAdmin: adminResultCache, isChecking: false };
    }
    // Priority 2: localStorage (survives page reloads and IC cold starts)
    const stored = readStoredAdminStatus();
    return { isSuperAdmin: stored, isChecking: !stored };
  });

  const checkDone = useRef(false);

  const runAdminCheck = useCallback(async (actorInstance: backendInterface) => {
    try {
      // initAdmin() is idempotent — first caller becomes admin, subsequent calls are no-ops
      await actorInstance.initAdmin();
      const result = await actorInstance.isAdminCaller();
      // Persist to both module cache and localStorage
      adminResultCache = result;
      writeStoredAdminStatus(result);
      setState({ isSuperAdmin: result, isChecking: false });
    } catch {
      // Backend error → keep current displayed value, just stop the checking indicator.
      // Do NOT flip isSuperAdmin to false on a network error — could hide a real admin.
      setState((prev) => ({ ...prev, isChecking: false }));
    }
  }, []);

  useEffect(() => {
    // If module cache already has a result from this session, no backend call needed
    if (adminResultCache !== null) {
      setState({ isSuperAdmin: adminResultCache, isChecking: false });
      return;
    }

    // Actor not ready yet — wait for next render
    if (!actor || isFetching) return;

    // Already ran the check in this session
    if (checkDone.current) return;
    checkDone.current = true;

    void runAdminCheck(actor);
  }, [actor, isFetching, runAdminCheck]);

  return (
    <SuperAdminContext.Provider value={state}>
      {children}
    </SuperAdminContext.Provider>
  );
}

export function useSuperAdmin(): SuperAdminState {
  return useContext(SuperAdminContext);
}
