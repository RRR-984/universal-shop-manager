import { useId } from "react";

type LogoProps = {
  size?: number;
  showText?: boolean;
  collapsed?: boolean;
  className?: string;
};

export function Logo({
  size = 32,
  showText = true,
  collapsed = false,
  className = "",
}: LogoProps) {
  const iconSize = size;
  // useId ensures each Logo instance has unique gradient IDs — prevents
  // gradient conflicts when multiple Logo instances render simultaneously.
  const uid = useId();
  const id = `logo-${uid.replace(/:/g, "")}`;

  const icon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        {/* Main globe gradient */}
        <radialGradient id={`${id}-globe`} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        {/* Orbit ring gradient */}
        <linearGradient id={`${id}-ring1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-ring2`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
        </linearGradient>
        {/* Globe sheen */}
        <radialGradient id={`${id}-sheen`} cx="30%" cy="25%" r="45%">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Drop shadow filter */}
        <filter
          id={`${id}-shadow`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2.5"
            floodColor="#1d4ed8"
            floodOpacity="0.35"
          />
        </filter>
      </defs>

      {/* ── Outer orbit ring 1 (wide, tilted ~20deg) ── */}
      <ellipse
        cx="24"
        cy="24"
        rx="22"
        ry="7.5"
        fill="none"
        stroke={`url(#${id}-ring1)`}
        strokeWidth="1.6"
        transform="rotate(-22 24 24)"
      />

      {/* ── Outer orbit ring 2 (tilted other way) ── */}
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="6.5"
        fill="none"
        stroke={`url(#${id}-ring2)`}
        strokeWidth="1.2"
        strokeDasharray="3 2"
        transform="rotate(55 24 24)"
      />

      {/* ── Globe body ── */}
      <circle
        cx="24"
        cy="24"
        r="13.5"
        fill={`url(#${id}-globe)`}
        filter={`url(#${id}-shadow)`}
      />

      {/* ── Latitude lines (3 arcs) ── */}
      <ellipse
        cx="24"
        cy="24"
        rx="13.5"
        ry="4.2"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="0.9"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="13.5"
        ry="8.5"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.9"
      />

      {/* ── Longitude line (vertical center) ── */}
      <path
        d="M24 10.5 C 30 17, 30 31, 24 37.5 C 18 31, 18 17, 24 10.5 Z"
        fill="none"
        stroke="rgba(255,255,255,0.20)"
        strokeWidth="0.9"
      />
      {/* ── Longitude line (left arc) ── */}
      <path
        d="M14.5 16 C 19 20, 19 28, 14.5 32"
        fill="none"
        stroke="rgba(255,255,255,0.13)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* ── Globe sheen / highlight ── */}
      <circle cx="24" cy="24" r="13.5" fill={`url(#${id}-sheen)`} />

      {/* ── Inner orbit dot accent (small cyan node on ring) ── */}
      <circle cx="44" cy="20.5" r="2" fill="#22d3ee" opacity="0.85" />
      <circle cx="6" cy="30.5" r="1.4" fill="#a78bfa" opacity="0.7" />
    </svg>
  );

  if (collapsed || !showText) {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        {icon}
      </span>
    );
  }

  const textSize =
    size >= 40 ? "1.0625rem" : size >= 32 ? "0.9375rem" : "0.8125rem";
  const subtextSize = size >= 40 ? "0.6875rem" : "0.625rem";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {icon}
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
          lineHeight: 1.15,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontWeight: 700,
            fontSize: textSize,
            letterSpacing: "-0.01em",
            color: "oklch(var(--foreground))",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Universal Shop
        </span>
        <span
          style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontWeight: 500,
            fontSize: subtextSize,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "oklch(var(--muted-foreground))",
            whiteSpace: "nowrap",
          }}
        >
          Manager
        </span>
      </span>
    </span>
  );
}

export default Logo;
