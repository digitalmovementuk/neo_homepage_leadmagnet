# QA note: Digital Movement removed from the NEO site · v1.0 (22.11.2026)

Changelog
- v1.0 (22.11.2026) First version after the live deploy of c8d5df6.

## What changed (Raoul, 22.11.2026)
- Impressum: line "NEO THE AGENCY ist eine Marke von Digital Movement Germany." removed; operator block now "NEO THE AGENCY · Inhaber: Raoul Müller und Johannes Kaluc", Berlin address and contact unchanged. No legal form added.
- Datenschutz (1. Verantwortlicher): "NEO THE AGENCY, Inhaber: Raoul Müller und Johannes Kaluc, Kolonnenstraße 8, 10827 Berlin."
- SEO page footer (src/content/seo-de.ts): "© 2026 NEO THE AGENCY · Inhaber: Raoul Müller und Johannes Kaluc".
- Code comments that named Digital Movement: src/index.css, scripts/prerender-seo.mjs, src/lib/seoHooks.ts.
- Already clean, unchanged: homepage footer, index.html JSON-LD (no parentOrganization, founder Raoul only), SEO page schema (founder Raoul).

## Checks (live, www.neotheagency.de, Playwright + Chrome, 1440 and 375)
| Page | No sideways scroll | No "Digital Movement" in page or loaded files | Owners line | Console errors |
|---|---|---|---|---|
| /impressum/ | pass | pass | yes | 0 |
| /datenschutz/ | pass | pass | yes | 0 |
| / (home) | pass | pass | n/a by design | 0 |
| /seo-agentur/ | pass | pass | yes (footer) | 0 |

- Build: passed; no "digital movement" anywhere in dist.
- Screenshots in this folder (live-*-1440.png, live-*-375.png), checked by eye.
- Live imprint opened in Raoul's Chrome on 22.11.2026.

## Undo
- `git revert c8d5df6` and push to origin main, or reset origin main to a10f6c8.

## Open
- Johannes Kaluc is not in the schema (founder = Raoul only). Add only if Raoul wants it.
