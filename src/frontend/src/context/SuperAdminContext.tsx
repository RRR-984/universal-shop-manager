/**
 * SuperAdminContext — Single source of truth for super admin status.
 *
 * Architecture:
 * - localStorage (usm-super-admin-v1) is the PRIMARY initial value — shown immediately on mount.
 * - Module-level variable `adminResultCache` is set once per session after backend check.
 * - The API call isAdminCaller() runs in the background to UPDATE localStorage and cache.
 * - The link shows immediately on load if localStorage says admin=true — no flash-of-hidden.
 * - resetSuperAdminCache() on logout clears BOTH the module cache AND localStorage.
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
  isHydrated: boolean;
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
  isHydrated: false,
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
  // isHydrated starts false — set to true only once the async backend check resolves
  // (success OR error), preventing flickering when module cache is cleared by deployment.
  const [state, setState] = useState<SuperAdminState>(() => {
    // Priority 1: module-level cache (already checked this session)
    if (adminResultCache !== null) {
      return {
        isSuperAdmin: adminResultCache,
        isChecking: false,
        isHydrated: true,
      };
    }
    // Priority 2: localStorage (survives page reloads and IC cold starts)
    const stored = readStoredAdminStatus();
    return { isSuperAdmin: stored, isChecking: !stored, isHydrated: false };
  });

  const checkDone = useRef(false);

  const runAdminCheck = useCallback(async (actorInstance: backendInterface) => {
    try {
      // initAdmin() is idempotent — first caller becomes admin, subsequent calls are no-ops
      await actorInstance.initAdmin();
      const result = await actorInstance.isAdminCaller();
      // Persist to both module cache and localStorage
      adminResultCache = result;
      // CRITICAL: only write to localStorage when true; NEVER remove when false
      // during an active session — only resetSuperAdminCache() on logout may clear it.
      if (result) {
        writeStoredAdminStatus(true);
      }
      // Mark check as complete ONLY on success
      checkDone.current = true;
      // isHydrated=true: backend check resolved — sidebar can now use the definitive value
      setState({ isSuperAdmin: result, isChecking: false, isHydrated: true });
    } catch {
      // Backend error → keep current displayed value (never flip true→false on network error).
      // Do NOT set checkDone.current=true on error — allow retry on next render.
      checkDone.current = false;
      // isHydrated=true even on error — use the localStorage value as the definitive result
      // so the sidebar doesn't flicker waiting for a retry that may never succeed.
      setState((prev) => ({ ...prev, isChecking: false, isHydrated: true }));
      // Schedule one automatic retry after 2 seconds
      setTimeout(() => {
        checkDone.current = false;
      }, 2000);
    }
  }, []);

  useEffect(() => {
    // If module cache already has a result from this session, no backend call needed
    if (adminResultCache !== null) {
      setState({
        isSuperAdmin: adminResultCache,
        isChecking: false,
        isHydrated: true,
      });
      return;
    }

    // Actor not ready yet — wait for next render
    if (!actor || isFetching) return;

    // Already ran the check in this session
    if (checkDone.current) return;
    // Mark as in-progress immediately to prevent double-invocation
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
