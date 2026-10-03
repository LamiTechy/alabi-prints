/** Stylised press / print-roll illustration used in the hero (pure SVG, no images). */
export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 420"
      role="img"
      aria-label="Illustration of a printing press producing a colourful banner"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDEFF3" />
        </linearGradient>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26262F" />
          <stop offset="100%" stopColor="#121218" />
        </linearGradient>
        <clipPath id="sheetClip">
          <rect x="92" y="36" width="296" height="150" rx="14" />
        </clipPath>
      </defs>

      {/* ink splashes */}
      <g opacity="0.9">
        <circle cx="48" cy="70" r="26" fill="#00AEEF" opacity="0.55" />
        <circle cx="432" cy="54" r="18" fill="#EC008C" opacity="0.6" />
        <circle cx="444" cy="330" r="30" fill="#FFD500" opacity="0.45" />
        <circle cx="40" cy="356" r="16" fill="#E11D2E" opacity="0.7" />
        <path d="M400 120c10 4 14 16 6 24s-24 2-24-10 8-18 18-14Z" fill="#00AEEF" opacity="0.5" />
        <path d="M56 200c8-6 20-2 22 8s-8 18-18 15-12-17-4-23Z" fill="#EC008C" opacity="0.5" />
        <path d="M420 236l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2Z" fill="#FFD500" opacity="0.7" />
      </g>

      {/* printed sheet coming out of the press */}
      <g>
        <rect x="92" y="36" width="296" height="150" rx="14" fill="url(#paper)" />
        <g clipPath="url(#sheetClip)">
          <rect x="112" y="60" width="150" height="16" rx="8" fill="#0B0B0F" />
          <rect x="112" y="92" width="220" height="10" rx="5" fill="#C9CCD4" />
          <rect x="112" y="112" width="180" height="10" rx="5" fill="#C9CCD4" />
          <rect x="112" y="140" width="52" height="24" rx="6" fill="#00AEEF" />
          <rect x="172" y="140" width="52" height="24" rx="6" fill="#EC008C" />
          <rect x="232" y="140" width="52" height="24" rx="6" fill="#FFD500" />
          <rect x="292" y="140" width="52" height="24" rx="6" fill="#E11D2E" />
        </g>
        <rect
          x="92"
          y="36"
          width="296"
          height="150"
          rx="14"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.12"
        />
      </g>

      {/* press body */}
      <rect x="60" y="196" width="360" height="132" rx="26" fill="url(#body)" />
      <rect x="60" y="196" width="360" height="132" rx="26" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" />
      <rect x="60" y="196" width="360" height="14" rx="7" fill="#0B0B0F" />

      {/* ink tanks */}
      <g>
        <rect x="92" y="232" width="54" height="66" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeOpacity="0.1" />
        <rect x="99" y="272" width="40" height="19" rx="8" fill="#00AEEF" />
        <rect x="158" y="232" width="54" height="66" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeOpacity="0.1" />
        <rect x="165" y="272" width="40" height="19" rx="8" fill="#EC008C" />
        <rect x="224" y="232" width="54" height="66" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeOpacity="0.1" />
        <rect x="231" y="272" width="40" height="19" rx="8" fill="#FFD500" />
        <rect x="290" y="232" width="54" height="66" rx="12" fill="#0B0B0F" stroke="#FFFFFF" strokeOpacity="0.1" />
        <rect x="297" y="272" width="40" height="19" rx="8" fill="#F5F6F8" />
      </g>

      {/* control panel */}
      <g>
        <rect x="356" y="236" width="44" height="24" rx="8" fill="#E11D2E" />
        <circle cx="378" cy="286" r="10" fill="#FFFFFF" opacity="0.15" />
        <circle cx="378" cy="286" r="5" fill="#00AEEF" />
      </g>

      {/* roll */}
      <rect x="150" y="344" width="180" height="34" rx="17" fill="#1A1A22" />
      <rect x="150" y="344" width="180" height="34" rx="17" fill="none" stroke="#FFFFFF" strokeOpacity="0.1" />
      <rect x="176" y="352" width="26" height="18" rx="6" fill="#00AEEF" />
      <rect x="212" y="352" width="26" height="18" rx="6" fill="#EC008C" />
      <rect x="248" y="352" width="26" height="18" rx="6" fill="#FFD500" />
      <rect x="284" y="352" width="26" height="18" rx="6" fill="#E11D2E" />

      {/* motion accents */}
      <g stroke="#FFFFFF" strokeOpacity="0.18" strokeLinecap="round">
        <path d="M28 250h18" strokeWidth="4" />
        <path d="M20 268h30" strokeWidth="4" />
        <path d="M434 262h16" strokeWidth="4" />
      </g>
    </svg>
  );
}
