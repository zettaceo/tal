"use client";

// ── Guard sprite (Segurança) ──────────────────────────────────────────────────
export function GuardSprite({ walking = false, kneeling = false, scale = 2 }: { walking?: boolean; kneeling?: boolean; scale?: number }) {
  return (
    <svg
      width={20 * scale}
      height={32 * scale}
      viewBox="0 0 20 32"
      style={{ imageRendering: "pixelated" }}
      className={walking ? "animate-walk" : ""}
    >
      {/* head */}
      <rect x="6" y="0" width="8" height="8" fill="#F4C48A" />
      {/* helmet */}
      <rect x="5" y="0" width="10" height="4" fill="#888" />
      <rect x="4" y="1" width="1" height="3" fill="#777" />
      <rect x="15" y="1" width="1" height="3" fill="#777" />
      <rect x="6" y="4" width="8" height="1" fill="#999" />
      {/* face */}
      <rect x="7" y="5" width="2" height="1" fill="#6B4226" /> {/* left eye */}
      <rect x="11" y="5" width="2" height="1" fill="#6B4226" /> {/* right eye */}
      <rect x="8" y="7" width="4" height="1" fill="#C87060" /> {/* mouth */}

      {/* body / armor */}
      <rect x="5" y="8" width="10" height="12" fill="#8A8A8A" />
      <rect x="6" y="9" width="8" height="2" fill="#A0A0A0" /> {/* chest highlight */}
      <rect x="7" y="12" width="6" height="1" fill="#707070" /> {/* chest line */}
      {/* cape */}
      <rect x="3" y="9" width="2" height="10" fill="#2A2050" />
      <rect x="15" y="9" width="2" height="10" fill="#2A2050" />

      {/* belt */}
      <rect x="5" y="19" width="10" height="2" fill="#5A4A30" />
      <rect x="9" y="19" width="2" height="2" fill="#C8A020" />

      {/* legs */}
      {kneeling ? (
        <>
          <rect x="5" y="21" width="4" height="6" fill="#8A8A8A" />
          <rect x="11" y="21" width="4" height="6" fill="#8A8A8A" />
          <rect x="5" y="27" width="4" height="3" fill="#6A6A6A" />
          <rect x="11" y="27" width="4" height="3" fill="#6A6A6A" />
        </>
      ) : (
        <>
          <rect x="5" y="21" width="4" height="8" fill="#8A8A8A" />
          <rect x="11" y="21" width="4" height="8" fill="#8A8A8A" />
          <rect x="5" y="27" width="4" height="3" fill="#706050" />
          <rect x="11" y="27" width="4" height="3" fill="#706050" />
          <rect x="5" y="29" width="4" height="2" fill="#504030" />
          <rect x="11" y="29" width="4" height="2" fill="#504030" />
        </>
      )}

      {/* spear */}
      <rect x="17" y="0" width="2" height="28" fill="#A0784A" />
      <rect x="16" y="0" width="4" height="5" fill="#C0C0C0" />
      <rect x="17" y="0" width="2" height="3" fill="#E0E0E0" />
    </svg>
  );
}

// ── Princess sprite ───────────────────────────────────────────────────────────
export function PrincessSprite({ happy = false, scale = 2 }: { happy?: boolean; scale?: number }) {
  return (
    <svg
      width={20 * scale}
      height={36 * scale}
      viewBox="0 0 20 36"
      style={{ imageRendering: "pixelated" }}
    >
      {/* crown */}
      <rect x="6" y="0" width="8" height="3" fill="#F0C000" />
      <rect x="6" y="0" width="2" height="5" fill="#F0C000" />
      <rect x="10" y="0" width="2" height="5" fill="#F0C000" />
      <rect x="14" y="0" width="2" height="5" fill="#F0C000" />
      <rect x="7" y="1" width="1" height="1" fill="#FF4444" />
      <rect x="11" y="1" width="1" height="1" fill="#4488FF" />
      <rect x="15" y="1" width="1" height="1" fill="#44CC44" />

      {/* head */}
      <rect x="5" y="4" width="10" height="10" fill="#F4C48A" />
      {/* hair */}
      <rect x="5" y="4" width="10" height="3" fill="#704010" />
      <rect x="3" y="5" width="2" height="6" fill="#704010" />
      <rect x="15" y="5" width="2" height="8" fill="#704010" />
      <rect x="4" y="11" width="1" height="5" fill="#704010" />
      <rect x="15" y="12" width="2" height="4" fill="#704010" />

      {/* face */}
      <rect x="7" y="9" width="2" height="1" fill={happy ? "#3A2010" : "#3A2010"} />
      <rect x="11" y="9" width="2" height="1" fill="#3A2010" />
      {happy ? (
        <>
          <rect x="8" y="12" width="4" height="1" fill="#E07070" />
          <rect x="7" y="11" width="2" height="1" fill="#E07070" />
          <rect x="11" y="11" width="2" height="1" fill="#E07070" />
          {/* blush */}
          <rect x="6" y="11" width="2" height="1" fill="rgba(255,150,150,0.7)" />
          <rect x="12" y="11" width="2" height="1" fill="rgba(255,150,150,0.7)" />
        </>
      ) : (
        <>
          <rect x="8" y="12" width="4" height="1" fill="#C07060" />
        </>
      )}

      {/* neck */}
      <rect x="7" y="14" width="6" height="2" fill="#F0B870" />

      {/* dress body */}
      <rect x="3" y="16" width="14" height="14" fill="#8040C0" />
      <rect x="4" y="17" width="12" height="3" fill="#9050D0" />
      {/* dress trim */}
      <rect x="3" y="16" width="14" height="1" fill="#C080FF" />
      <rect x="3" y="29" width="14" height="1" fill="#C080FF" />
      {/* dress center */}
      <rect x="8" y="17" width="4" height="12" fill="#9850E0" />
      {/* lace details */}
      <rect x="4" y="20" width="2" height="1" fill="#C080FF" />
      <rect x="14" y="20" width="2" height="1" fill="#C080FF" />
      <rect x="4" y="24" width="2" height="1" fill="#C080FF" />
      <rect x="14" y="24" width="2" height="1" fill="#C080FF" />

      {/* arms */}
      <rect x="1" y="16" width="3" height="9" fill="#8040C0" />
      <rect x="16" y="16" width="3" height="9" fill="#8040C0" />
      <rect x="1" y="24" width="3" height="2" fill="#F4C48A" />
      <rect x="16" y="24" width="3" height="2" fill="#F4C48A" />

      {/* skirt */}
      <rect x="1" y="30" width="18" height="6" fill="#6030A0" />
      <rect x="0" y="31" width="20" height="4" fill="#7040B0" />
      <rect x="1" y="35" width="18" height="1" fill="#C080FF" />
    </svg>
  );
}

// ── Pixel heart ───────────────────────────────────────────────────────────────
export function PixelHeart({ size = 8, color = "#FF4488" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      <rect x="1" y="0" width="2" height="1" fill={color} />
      <rect x="5" y="0" width="2" height="1" fill={color} />
      <rect x="0" y="1" width="8" height="3" fill={color} />
      <rect x="1" y="4" width="6" height="1" fill={color} />
      <rect x="2" y="5" width="4" height="1" fill={color} />
      <rect x="3" y="6" width="2" height="1" fill={color} />
      <rect x="4" y="7" width="1" height="1" fill={color} />
      {/* highlight */}
      <rect x="1" y="1" width="2" height="1" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

// ── Sword (big, comedic) ──────────────────────────────────────────────────────
export function SwordSprite({ scale = 2 }: { scale?: number }) {
  return (
    <svg width={12 * scale} height={40 * scale} viewBox="0 0 12 40" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="2" height="28" fill="#D0D8E8" />
      <rect x="4" y="0" width="1" height="28" fill="#E8EEF8" />
      <rect x="7" y="0" width="1" height="28" fill="#A0A8B8" />
      <rect x="5" y="0" width="2" height="4" fill="#F0F8FF" />
      {/* guard */}
      <rect x="1" y="26" width="10" height="3" fill="#C09020" />
      <rect x="0" y="27" width="12" height="1" fill="#E0B030" />
      {/* handle */}
      <rect x="4" y="29" width="4" height="9" fill="#703010" />
      <rect x="5" y="30" width="2" height="7" fill="#903020" />
      {/* pommel */}
      <rect x="3" y="37" width="6" height="3" fill="#C09020" />
    </svg>
  );
}
