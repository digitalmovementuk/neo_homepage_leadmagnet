import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(projectRoot, "public", "brand", "logo-options");

mkdirSync(outDir, { recursive: true });

const BLUE = "#0037D8";
const BLUE_DARK = "#0026A3";
const INK = "#26272F";
const SOFT = "#66636D";
const ACCENT = "#FF7A45";
const WHITE = "#FFFFFF";

const font = "Geist, Helvetica Neue, Arial, sans-serif";

function svgShell(title, desc, body, defs = "") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="720" viewBox="0 0 1600 720" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${desc}</desc>
  <defs>
    ${defs}
  </defs>
  ${body}
</svg>
`;
}

function neoVector({ x, y, scale = 1, color = BLUE, accent = ACCENT, skew = -8, accentRing = false }) {
  const ring = accentRing
    ? `<path d="M650 38 C728 48 775 92 786 150" fill="none" stroke="${accent}" stroke-width="24" stroke-linecap="round"/>
       <path d="M498 220 C536 270 592 292 654 280" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>`
    : "";

  return `
  <g transform="translate(${x} ${y}) scale(${scale}) skewX(${skew})">
    <polygon points="0,280 58,280 88,0 30,0" fill="${color}"/>
    <polygon points="170,280 228,280 258,0 200,0" fill="${color}"/>
    <polygon points="61,0 125,0 199,280 135,280" fill="${color}"/>

    <polygon points="320,0 585,0 572,68 383,68 374,112 542,112 530,178 362,178 354,212 548,212 535,280 290,280" fill="${color}"/>

    <circle cx="715" cy="140" r="112" fill="none" stroke="${color}" stroke-width="58"/>
    ${ring}
  </g>`;
}

function subline(x, y, color = INK, tracking = 12, size = 44) {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="${font}" font-size="${size}" font-weight="800" letter-spacing="${tracking}">THE AGENCY</text>`;
}

function smallLabel(x, y, text, color = SOFT) {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="${font}" font-size="28" font-weight="600" letter-spacing="3">${text}</text>`;
}

const options = [
  {
    file: "neo-logo-01-velocity.svg",
    title: "NEO Logo 01 - Velocity",
    desc: "A fast italic NEO wordmark with orange orbit accents.",
    note: "Closest to the current mark. Fast, bold, loud.",
    svg: svgShell(
      "NEO Logo 01 - Velocity",
      "A fast italic NEO wordmark with orange orbit accents.",
      `
      ${neoVector({ x: 95, y: 88, scale: 1.78, color: BLUE, accentRing: true })}
      ${subline(118, 642, INK, 14, 48)}
      <rect x="118" y="666" width="430" height="8" rx="4" fill="${ACCENT}"/>
      `
    ),
  },
  {
    file: "neo-logo-02-orbit.svg",
    title: "NEO Logo 02 - Orbit",
    desc: "A balanced NEO lockup with the O treated as a growth orbit.",
    note: "More polished and tech-driven, with an SEO growth signal.",
    svg: svgShell(
      "NEO Logo 02 - Orbit",
      "A balanced NEO lockup with the O treated as a growth orbit.",
      `
      ${neoVector({ x: 138, y: 124, scale: 1.45, color: INK, skew: -5 })}
      <ellipse cx="1108" cy="327" rx="178" ry="108" transform="rotate(-17 1108 327)" fill="none" stroke="${BLUE}" stroke-width="18"/>
      <circle cx="1243" cy="272" r="18" fill="${ACCENT}"/>
      ${subline(148, 605, BLUE, 11, 44)}
      <text x="746" y="605" fill="${SOFT}" font-family="${font}" font-size="32" font-weight="650" letter-spacing="1">PERFORMANCE MARKETING</text>
      `
    ),
  },
  {
    file: "neo-logo-03-stacked-badge.svg",
    title: "NEO Logo 03 - Stacked Badge",
    desc: "A compact badge and stacked wordmark for premium agency use.",
    note: "Useful for avatars, favicons, pitch decks and small spaces.",
    svg: svgShell(
      "NEO Logo 03 - Stacked Badge",
      "A compact badge and stacked wordmark for premium agency use.",
      `
      <rect x="96" y="96" width="432" height="432" rx="72" fill="${BLUE}"/>
      <g transform="translate(174 180) scale(1.2) skewX(-8)">
        <polygon points="0,260 54,260 82,0 28,0" fill="${WHITE}"/>
        <polygon points="160,260 214,260 242,0 188,0" fill="${WHITE}"/>
        <polygon points="56,0 114,0 190,260 132,260" fill="${WHITE}"/>
      </g>
      <circle cx="456" cy="166" r="44" fill="${ACCENT}"/>
      <text x="614" y="292" fill="${INK}" font-family="${font}" font-size="184" font-weight="950" font-style="italic" letter-spacing="-8">NEO</text>
      ${subline(626, 392, BLUE, 12, 42)}
      <text x="626" y="464" fill="${SOFT}" font-family="${font}" font-size="30" font-weight="600">Websites. SEO. Paid growth.</text>
      `
    ),
  },
  {
    file: "neo-logo-04-monogram-lockup.svg",
    title: "NEO Logo 04 - Monogram Lockup",
    desc: "A clean N monogram with a corporate wordmark.",
    note: "Simple, serious and easy to use across business documents.",
    svg: svgShell(
      "NEO Logo 04 - Monogram Lockup",
      "A clean N monogram with a corporate wordmark.",
      `
      <g transform="translate(118 132)">
        <rect x="0" y="0" width="374" height="374" rx="52" fill="${WHITE}" stroke="${INK}" stroke-width="14"/>
        <g transform="translate(76 62) skewX(-7)">
          <polygon points="0,250 50,250 76,0 26,0" fill="${BLUE}"/>
          <polygon points="166,250 216,250 242,0 192,0" fill="${BLUE}"/>
          <polygon points="54,0 110,0 190,250 134,250" fill="${BLUE}"/>
        </g>
        <rect x="262" y="44" width="58" height="12" rx="6" fill="${ACCENT}"/>
      </g>
      <text x="590" y="300" fill="${INK}" font-family="${font}" font-size="168" font-weight="900" letter-spacing="-7">NEO</text>
      <text x="604" y="388" fill="${BLUE}" font-family="${font}" font-size="44" font-weight="850" letter-spacing="10">THE AGENCY</text>
      <rect x="604" y="424" width="506" height="3" fill="${INK}" opacity="0.25"/>
      `
    ),
  },
  {
    file: "neo-logo-05-signal.svg",
    title: "NEO Logo 05 - Signal",
    desc: "A wordmark with rising bars for search visibility and demand growth.",
    note: "Best when the logo needs to explain growth at first glance.",
    svg: svgShell(
      "NEO Logo 05 - Signal",
      "A wordmark with rising bars for search visibility and demand growth.",
      `
      ${neoVector({ x: 116, y: 122, scale: 1.42, color: BLUE_DARK, skew: -7 })}
      <g transform="translate(1192 238)">
        <rect x="0" y="138" width="42" height="102" rx="20" fill="${ACCENT}"/>
        <rect x="70" y="92" width="42" height="148" rx="20" fill="${ACCENT}"/>
        <rect x="140" y="38" width="42" height="202" rx="20" fill="${ACCENT}"/>
        <path d="M-4 70 C50 24 110 24 188 0" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      </g>
      ${subline(134, 604, INK, 11, 42)}
      <text x="686" y="604" fill="${SOFT}" font-family="${font}" font-size="32" font-weight="650">RANK. CONVERT. SCALE.</text>
      `
    ),
  },
  {
    file: "neo-logo-06-framed.svg",
    title: "NEO Logo 06 - Framed",
    desc: "A sharp framed wordmark inspired by interface windows and campaign dashboards.",
    note: "Feels structured, digital and premium without being too playful.",
    svg: svgShell(
      "NEO Logo 06 - Framed",
      "A sharp framed wordmark inspired by interface windows and campaign dashboards.",
      `
      <path d="M128 160 V96 H336" fill="none" stroke="${BLUE}" stroke-width="20" stroke-linecap="square"/>
      <path d="M1472 160 V96 H1264" fill="none" stroke="${BLUE}" stroke-width="20" stroke-linecap="square"/>
      <path d="M128 560 V624 H336" fill="none" stroke="${BLUE}" stroke-width="20" stroke-linecap="square"/>
      <path d="M1472 560 V624 H1264" fill="none" stroke="${BLUE}" stroke-width="20" stroke-linecap="square"/>
      <text x="190" y="416" fill="${INK}" font-family="${font}" font-size="294" font-weight="950" font-style="italic" letter-spacing="-18">NEO</text>
      <rect x="836" y="222" width="42" height="42" rx="21" fill="${ACCENT}"/>
      <text x="928" y="318" fill="${BLUE}" font-family="${font}" font-size="84" font-weight="900" letter-spacing="5">THE</text>
      <text x="928" y="430" fill="${BLUE}" font-family="${font}" font-size="84" font-weight="900" letter-spacing="5">AGENCY</text>
      `
    ),
  },
  {
    file: "neo-logo-07-pulse.svg",
    title: "NEO Logo 07 - Pulse",
    desc: "A conversion-focused lockup with a pulse line through the O.",
    note: "Good for a performance marketing story: leads, tracking and motion.",
    svg: svgShell(
      "NEO Logo 07 - Pulse",
      "A conversion-focused lockup with a pulse line through the O.",
      `
      <text x="118" y="400" fill="${BLUE}" font-family="${font}" font-size="270" font-weight="950" font-style="italic" letter-spacing="-16">NE</text>
      <circle cx="724" cy="306" r="110" fill="none" stroke="${BLUE}" stroke-width="52"/>
      <path d="M595 306 H658 L688 250 L730 362 L764 306 H860" fill="none" stroke="${ACCENT}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="918" y="316" fill="${INK}" font-family="${font}" font-size="76" font-weight="900" letter-spacing="8">THE</text>
      <text x="918" y="430" fill="${INK}" font-family="${font}" font-size="76" font-weight="900" letter-spacing="8">AGENCY</text>
      <rect x="118" y="486" width="740" height="6" rx="3" fill="${INK}" opacity="0.18"/>
      `
    ),
  },
  {
    file: "neo-logo-08-prism.svg",
    title: "NEO Logo 08 - Prism",
    desc: "A gradient prism version with a folded N mark and clean wordmark.",
    note: "Most modern and app-like, useful if the brand should feel newer.",
    svg: svgShell(
      "NEO Logo 08 - Prism",
      "A gradient prism version with a folded N mark and clean wordmark.",
      `
      <g transform="translate(110 116)">
        <polygon points="0,420 88,420 152,0 64,0" fill="url(#neoPrism)"/>
        <polygon points="282,420 370,420 434,0 346,0" fill="${BLUE_DARK}"/>
        <polygon points="104,0 192,0 334,420 246,420" fill="${ACCENT}"/>
      </g>
      <text x="626" y="318" fill="${INK}" font-family="${font}" font-size="174" font-weight="900" letter-spacing="-7">NEO</text>
      <text x="640" y="410" fill="${BLUE}" font-family="${font}" font-size="45" font-weight="850" letter-spacing="12">THE AGENCY</text>
      <text x="642" y="474" fill="${SOFT}" font-family="${font}" font-size="29" font-weight="600">Performance systems for ambitious brands</text>
      `,
      `
      <linearGradient id="neoPrism" x1="100" y1="100" x2="520" y2="520" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="${BLUE}"/>
        <stop offset="0.58" stop-color="#315CFF"/>
        <stop offset="1" stop-color="${ACCENT}"/>
      </linearGradient>
      `
    ),
  },
  {
    file: "neo-logo-09-apex.svg",
    title: "NEO Logo 09 - Apex",
    desc: "A premium apex mark above a restrained NEO THE AGENCY wordmark.",
    note: "More luxury and founder-led. Good for high-ticket clients.",
    svg: svgShell(
      "NEO Logo 09 - Apex",
      "A premium apex mark above a restrained NEO THE AGENCY wordmark.",
      `
      <g transform="translate(638 98)">
        <path d="M0 140 L112 0 L224 140" fill="none" stroke="${BLUE}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M72 140 L112 88 L152 140" fill="none" stroke="${ACCENT}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <text x="222" y="420" fill="${INK}" font-family="${font}" font-size="246" font-weight="900" letter-spacing="-8">NEO</text>
      <text x="832" y="342" fill="${BLUE}" font-family="${font}" font-size="66" font-weight="900" letter-spacing="10">THE</text>
      <text x="832" y="438" fill="${BLUE}" font-family="${font}" font-size="66" font-weight="900" letter-spacing="10">AGENCY</text>
      <rect x="398" y="494" width="804" height="5" rx="3" fill="${ACCENT}"/>
      `
    ),
  },
  {
    file: "neo-logo-10-grid-system.svg",
    title: "NEO Logo 10 - Grid System",
    desc: "A modular grid logo made from blocks, built for digital systems.",
    note: "Strong for a studio that builds repeatable marketing machines.",
    svg: svgShell(
      "NEO Logo 10 - Grid System",
      "A modular grid logo made from blocks, built for digital systems.",
      `
      <g transform="translate(116 126)">
        ${[
          [0, 0, BLUE], [0, 1, BLUE], [0, 2, BLUE], [0, 3, BLUE], [0, 4, BLUE],
          [1, 1, BLUE], [1, 2, BLUE], [2, 2, ACCENT], [2, 3, BLUE], [3, 0, BLUE],
          [3, 1, BLUE], [3, 2, BLUE], [3, 3, BLUE], [3, 4, BLUE],
        ]
          .map(([cx, cy, fill]) => `<rect x="${Number(cx) * 78}" y="${Number(cy) * 78}" width="58" height="58" rx="12" fill="${fill}"/>`)
          .join("\n        ")}
      </g>
      <text x="536" y="336" fill="${INK}" font-family="${font}" font-size="178" font-weight="950" letter-spacing="-8">NEO</text>
      <text x="550" y="430" fill="${BLUE}" font-family="${font}" font-size="45" font-weight="850" letter-spacing="12">THE AGENCY</text>
      <text x="552" y="494" fill="${SOFT}" font-family="${font}" font-size="30" font-weight="600">Marketing systems that compound.</text>
      `
    ),
  },
];

for (const option of options) {
  writeFileSync(join(outDir, option.file), option.svg);
}

const preview = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NEO THE AGENCY - Logo Options</title>
    <style>
      :root {
        --ink: ${INK};
        --soft: ${SOFT};
        --blue: ${BLUE};
        --accent: ${ACCENT};
        --paper: #f5f5f7;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: ${font};
        color: var(--ink);
        background: var(--paper);
      }
      main {
        width: min(1440px, calc(100% - 48px));
        margin: 0 auto;
        padding: 56px 0 72px;
      }
      header {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 32px;
      }
      h1 {
        margin: 0;
        font-size: clamp(34px, 5vw, 72px);
        line-height: 0.92;
        letter-spacing: -0.04em;
      }
      .meta {
        max-width: 440px;
        margin: 0;
        color: var(--soft);
        font-size: 16px;
        line-height: 1.5;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
      }
      .card {
        background: white;
        border: 1px solid rgba(38, 39, 47, 0.09);
        border-radius: 18px;
        padding: 18px;
        box-shadow: 0 18px 50px rgba(38, 39, 47, 0.08);
      }
      .logo {
        display: grid;
        place-items: center;
        min-height: 230px;
        border-radius: 12px;
        background:
          linear-gradient(45deg, rgba(38, 39, 47, 0.035) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(38, 39, 47, 0.035) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, rgba(38, 39, 47, 0.035) 75%),
          linear-gradient(-45deg, transparent 75%, rgba(38, 39, 47, 0.035) 75%);
        background-size: 24px 24px;
        background-position: 0 0, 0 12px, 12px -12px, -12px 0;
        overflow: hidden;
      }
      img {
        display: block;
        width: 100%;
        height: auto;
      }
      .caption {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-top: 14px;
      }
      h2 {
        margin: 0;
        font-size: 18px;
        letter-spacing: -0.02em;
      }
      p {
        margin: 6px 0 0;
        color: var(--soft);
        font-size: 14px;
        line-height: 1.35;
      }
      a {
        color: var(--blue);
        font-weight: 750;
        text-decoration: none;
        white-space: nowrap;
      }
      @media (max-width: 860px) {
        main { width: min(100% - 28px, 720px); padding-top: 32px; }
        header { display: block; }
        .meta { margin-top: 14px; }
        .grid { grid-template-columns: 1fr; }
        .logo { min-height: 180px; }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>NEO logo options</h1>
        <p class="meta">Ten SVG logo directions for NEO THE AGENCY. Each file is in this folder and uses the current brand DNA: electric blue, graphite, white and orange.</p>
      </header>
      <section class="grid">
        ${options
          .map(
            (option) => `<article class="card">
          <div class="logo"><img src="./${option.file}" alt="${option.title}" /></div>
          <div class="caption">
            <div>
              <h2>${option.title.replace("NEO Logo ", "")}</h2>
              <p>${option.note}</p>
            </div>
            <a href="./${option.file}">SVG</a>
          </div>
        </article>`
          )
          .join("\n        ")}
      </section>
    </main>
  </body>
</html>
`;

writeFileSync(join(outDir, "index.html"), preview);

const readme = `# NEO THE AGENCY Logo Options

This folder contains 10 SVG logo explorations for NEO THE AGENCY.

Files:

${options.map((option) => `- \`${option.file}\` - ${option.note}`).join("\n")}

Open \`index.html\` to compare every option on one preview sheet.
`;

writeFileSync(join(outDir, "README.md"), readme);

console.log(`Generated ${options.length} logo SVGs in ${outDir}`);
