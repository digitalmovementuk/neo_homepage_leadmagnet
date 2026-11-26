/**
 * Zeichnungen der SEO-Seite · v1.0 (19.11.2026)
 * Alles hier ist als Code gezeichnet (keine Fotos, keine KI-Bilder, keine
 * fremden Logos). Linien in Tinte, Akzente in Blau und Orange.
 */
import type { ReactNode } from "react";

const INK = "#231F20";
const BLUE = "#9A2FC6"; // brand violet-deep (kit v1.1); name kept
const ORANGE = "#F05F22";
const LINE = "rgba(38,39,47,0.14)";
const SOFT = "rgba(38,39,47,0.22)";

/* ───────── Abschnitt 7: drei große Zeichnungen ───────── */

function SearchArt() {
  return (
    <>
      <rect x="40" y="24" width="320" height="42" rx="21" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <circle cx="64" cy="44" r="7" stroke={INK} strokeWidth="2.2" />
      <path d="m69.5 49.5 5 5" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="86" y="40.5" width="128" height="8" rx="4" fill={SOFT} />

      <rect x="40" y="82" width="320" height="64" rx="16" fill="#fff" stroke={BLUE} strokeWidth="2" />
      <circle cx="68" cy="114" r="14" fill={BLUE} />
      <path d="M66 108.5 69.5 106v16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="94" y="99" width="150" height="10" rx="5" fill={BLUE} />
      <rect x="94" y="118" width="206" height="7" rx="3.5" fill={SOFT} />
      <circle cx="334" cy="114" r="13" fill="rgba(240,95,34,0.16)" />
      <path d="M334 120v-12m-5 5 5-5 5 5" stroke={ORANGE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="40" y="158" width="320" height="40" rx="14" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <circle cx="64" cy="178" r="9" fill="rgba(38,39,47,0.08)" />
      <rect x="86" y="170" width="118" height="7" rx="3.5" fill={SOFT} />
      <rect x="86" y="182" width="180" height="5" rx="2.5" fill={LINE} />

      <rect x="40" y="208" width="320" height="40" rx="14" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <circle cx="64" cy="228" r="9" fill="rgba(38,39,47,0.08)" />
      <rect x="86" y="220" width="96" height="7" rx="3.5" fill={SOFT} />
      <rect x="86" y="232" width="160" height="5" rx="2.5" fill={LINE} />
    </>
  );
}

function MapsArt() {
  return (
    <>
      <clipPath id="seo-map-clip">
        <rect x="24" y="20" width="352" height="220" rx="20" />
      </clipPath>
      <rect x="24" y="20" width="352" height="220" rx="20" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <g clipPath="url(#seo-map-clip)">
        <path d="M24 196c60-30 96-10 140-44s80-24 212-70v158H24Z" fill="rgba(154,47,198,0.07)" />
        <path d="M24 92h352M24 160h352" stroke="#ECECF0" strokeWidth="12" />
        <path d="M108 20v220M232 20v220M318 20v220" stroke="#ECECF0" strokeWidth="12" />
        <path d="M24 226 190 20" stroke="#E2E2E8" strokeWidth="8" />
      </g>
      <g fill="rgba(38,39,47,0.38)">
        <path d="M70 66c0 8-9 17-9 17s-9-9-9-17a9 9 0 0 1 18 0Z" />
        <path d="M302 70c0 8-9 17-9 17s-9-9-9-17a9 9 0 0 1 18 0Z" />
      </g>
      <circle cx="61" cy="66" r="3" fill="#fff" />
      <circle cx="293" cy="70" r="3" fill="#fff" />
      <path d="M172 112c0 17-20 38-20 38s-20-21-20-38a20 20 0 0 1 40 0Z" fill={ORANGE} />
      <circle cx="152" cy="112" r="7.5" fill="#fff" />

      <rect x="204" y="118" width="156" height="108" rx="16" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <rect x="220" y="134" width="34" height="34" rx="10" fill="rgba(154,47,198,0.12)" />
      <path d="M229 158v-12l8-5 8 5v12Z" stroke={BLUE} strokeWidth="2" strokeLinejoin="round" />
      <rect x="264" y="138" width="78" height="9" rx="4.5" fill={INK} />
      <rect x="264" y="154" width="54" height="6" rx="3" fill={SOFT} />
      <rect x="220" y="182" width="72" height="28" rx="14" fill={BLUE} />
      <path
        d="M246 190.5c1 .2 2.2 2.6 2 3.4-.3.8-1.4 1-1.2 1.8.5 1.6 2.6 3.7 4.2 4.2.8.2 1-.9 1.8-1.2.8-.2 3.2 1 3.4 2 .2 1.2-1.4 2.8-2.8 2.8-5.6 0-10.2-4.6-10.2-10.2 0-1.4 1.6-3 2.8-2.8Z"
        fill="#fff"
      />
      <rect x="300" y="182" width="44" height="28" rx="14" stroke={SOFT} strokeWidth="1.5" />
      <path d="M316 196h12m-4-4 4 4-4 4" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function AiArt() {
  return (
    <>
      <rect x="150" y="22" width="210" height="42" rx="21" fill={INK} />
      <rect x="172" y="39" width="140" height="8" rx="4" fill="rgba(255,255,255,0.7)" />

      <rect x="40" y="78" width="320" height="160" rx="20" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <path
        d="M66 96c1.4 6.6 3.4 8.600 10 10-6.600 1.4-8.600 3.4-10 10-1.400-6.600-3.400-8.600-10-10 6.600-1.400 8.600-3.400 10-10Z"
        fill={ORANGE}
      />
      <rect x="88" y="100" width="170" height="9" rx="4.5" fill={INK} />
      <rect x="60" y="130" width="280" height="7" rx="3.5" fill={SOFT} />
      <rect x="56" y="146" width="188" height="15" rx="5" fill="rgba(154,47,198,0.14)" />
      <rect x="60" y="150" width="180" height="7" rx="3.5" fill={BLUE} />
      <rect x="252" y="150" width="70" height="7" rx="3.5" fill={SOFT} />
      <rect x="60" y="170" width="230" height="7" rx="3.5" fill={SOFT} />

      <rect x="60" y="194" width="168" height="30" rx="15" fill="rgba(154,47,198,0.08)" stroke={BLUE} strokeWidth="1.5" />
      <path
        d="M80 205.500h-2.500a3.500 3.500 0 0 0 0 7H80m5-7h2.500a3.500 3.500 0 0 1 0 7H85m-5.500-3.500h6"
        stroke={BLUE}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="100" y="205" width="110" height="8" rx="4" fill={BLUE} />
      <rect x="238" y="194" width="92" height="30" rx="15" stroke={LINE} strokeWidth="1.5" />
      <rect x="254" y="205" width="60" height="8" rx="4" fill={SOFT} />
    </>
  );
}

const CHANNEL_ART: Record<string, () => ReactNode> = { search: SearchArt, maps: MapsArt, ai: AiArt };

export function ChannelArt({ kind, alt }: { kind: string; alt: string }) {
  const Art = CHANNEL_ART[kind] ?? SearchArt;
  return (
    <svg viewBox="0 0 400 260" width={400} height={260} fill="none" role="img" aria-label={alt} className="seo-art">
      <Art />
    </svg>
  );
}

/* ───────── Abschnitt 3: Schmuckbild „Audit als Video“ ───────── */

export function AuditArt() {
  return (
    <svg viewBox="0 0 440 240" width={440} height={240} fill="none" aria-hidden className="seo-art">
      <rect x="12" y="14" width="300" height="200" rx="20" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <path d="M12 52h300" stroke={LINE} strokeWidth="1.5" />
      <circle cx="34" cy="33" r="5" fill="rgba(38,39,47,0.16)" />
      <circle cx="52" cy="33" r="5" fill="rgba(38,39,47,0.16)" />
      <rect x="76" y="26" width="150" height="14" rx="7" fill="rgba(38,39,47,0.07)" />
      <rect x="32" y="72" width="120" height="11" rx="5.5" fill={INK} />
      <rect x="32" y="94" width="180" height="7" rx="3.5" fill={SOFT} />
      <rect x="32" y="108" width="150" height="7" rx="3.5" fill={SOFT} />
      <rect x="32" y="132" width="78" height="60" rx="12" fill="rgba(154,47,198,0.09)" />
      <rect x="120" y="132" width="78" height="60" rx="12" fill="rgba(38,39,47,0.05)" />
      <rect x="208" y="132" width="84" height="60" rx="12" fill="rgba(240,95,34,0.12)" />
      <circle cx="162" cy="118" r="30" fill={BLUE} />
      <path d="M154 105v26l22-13-22-13Z" fill="#fff" />

      <rect x="252" y="62" width="176" height="150" rx="18" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 44})`}>
          <circle cx="280" cy="94" r="11" fill={i === 2 ? "rgba(240,95,34,0.18)" : "rgba(154,47,198,0.12)"} />
          <path
            d="m275 94 3.500 3.500 6.500-7"
            stroke={i === 2 ? ORANGE : BLUE}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="302" y="86" width={i === 1 ? 82 : 104} height="7" rx="3.5" fill={INK} opacity="0.8" />
          <rect x="302" y="99" width={i === 1 ? 100 : 70} height="5" rx="2.5" fill={SOFT} />
        </g>
      ))}
    </svg>
  );
}

/* ───────── Abschnitt 10: neun kleine Zeichnungen ───────── */

const BLOCK_ART: Record<string, ReactNode> = {
  technik: (
    <>
      <rect x="6" y="9" width="36" height="30" rx="6" stroke={INK} strokeWidth="2" />
      <path d="M6 17h36" stroke={INK} strokeWidth="2" />
      <path d="m18 24-4 4.500 4 4.500m12-9 4 4.500-4 4.500" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m26 23-4 11" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  inhalte: (
    <>
      <rect x="10" y="6" width="28" height="36" rx="5" stroke={INK} strokeWidth="2" />
      <path d="M16 15h12" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M16 23h16M16 29h16M16 35h9" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  lokal: (
    <>
      <path d="M38 20c0 10-14 23-14 23S10 30 10 20a14 14 0 0 1 28 0Z" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="20" r="5" fill={ORANGE} />
    </>
  ),
  profil: (
    <>
      <rect x="6" y="10" width="36" height="28" rx="6" stroke={INK} strokeWidth="2" />
      <circle cx="17" cy="21" r="4.500" stroke={BLUE} strokeWidth="2.2" />
      <path d="M26 19h10M26 25h7" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 32h24" stroke={ORANGE} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  links: (
    <>
      <path d="M21 27a7 7 0 0 0 10 0l6-6a7 7 0 0 0-10-10l-2 2" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M27 21a7 7 0 0 0-10 0l-6 6a7 7 0 0 0 10 10l2-2" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  ladezeit: (
    <>
      <path d="M7 33a17 17 0 0 1 34 0" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 21.500 14.500 24M24 15v3.500M36 21.500 33.500 24" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="m24 33 8-10" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="33" r="3" fill={INK} />
    </>
  ),
  daten: (
    <>
      <path d="M17 8c-4 0-5 2-5 5v6c0 3-2 5-4 5 2 0 4 2 4 5v6c0 3 1 5 5 5" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 8c4 0 5 2 5 5v6c0 3 2 5 4 5-2 0-4 2-4 5v6c0 3-1 5-5 5" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19.500" cy="24" r="2" fill={BLUE} />
      <circle cx="24" cy="24" r="2" fill={BLUE} />
      <circle cx="28.500" cy="24" r="2" fill={BLUE} />
    </>
  ),
  ki: (
    <>
      <path d="M8 14a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H22l-8 7v-7a6 6 0 0 1-6-6Z" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 12c1.200 5.600 2.900 7.300 8.500 8.500-5.600 1.200-7.300 2.900-8.500 8.500-1.200-5.600-2.900-7.300-8.500-8.500 5.600-1.200 7.300-2.900 8.500-8.500Z" fill={ORANGE} />
    </>
  ),
  bericht: (
    <>
      <rect x="9" y="6" width="30" height="36" rx="5" stroke={INK} strokeWidth="2" />
      <path d="M15 14h12" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 35v-6M24 35V23" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      <path d="M31 35V19" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
};

export function BlockArt({ kind, alt }: { kind: string; alt: string }) {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" role="img" aria-label={alt} className="h-12 w-12">
      {BLOCK_ART[kind] ?? BLOCK_ART.technik}
    </svg>
  );
}

/* ───────── Abschnitt 19: neutrale Zeichen für die Werkzeuge (keine Logos) ───────── */

const TOOL_ART: Record<string, ReactNode> = {
  gsc: (
    <>
      <circle cx="21" cy="21" r="12" stroke={INK} strokeWidth="2" />
      <path d="m30 30 10 10" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M16 25v-4M21 25v-8" stroke={BLUE} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M26 25v-6" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  ga4: (
    <>
      <path d="M8 40h32" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <rect x="10" y="26" width="7" height="10" rx="2.5" fill={INK} />
      <rect x="20.500" y="18" width="7" height="18" rx="2.5" fill={BLUE} />
      <rect x="31" y="9" width="7" height="27" rx="2.5" fill={ORANGE} />
    </>
  ),
  semrush: (
    <>
      <path d="M7 8v32h34" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m13 32 8-9 6 5 11-14" stroke={BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="38" cy="14" r="3.500" fill={ORANGE} />
    </>
  ),
  frog: (
    <>
      <rect x="18" y="6" width="12" height="10" rx="3" stroke={INK} strokeWidth="2" />
      <path d="M24 16v8M10 32v-4a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v4M24 24v8" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <rect x="5" y="32" width="10" height="9" rx="3" fill={BLUE} />
      <rect x="19" y="32" width="10" height="9" rx="3" fill={BLUE} />
      <rect x="33" y="32" width="10" height="9" rx="3" fill={ORANGE} />
    </>
  ),
  psi: (
    <>
      <path d="M7 34a17 17 0 0 1 34 0" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 34a17 17 0 0 1 9-15" stroke={BLUE} strokeWidth="3.4" strokeLinecap="round" />
      <path d="m24 34 9-9" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="34" r="3" fill={INK} />
    </>
  ),
};

export function ToolArt({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden className="h-9 w-9">
      {TOOL_ART[kind] ?? TOOL_ART.gsc}
    </svg>
  );
}
