# NEO platform links: live QA · v1.2 (22.11.2026)

Live commit: 9b2a1c0 on main (www.neotheagency.de). Rollback: revert to 68fdfcf and push to main.

## What is live
- Trust strip "Sie finden uns auf" in the first screen of every page: Trustpilot, ProvenExpert, Sortlist and wlw logos, each linking to its profile. No stars, scores or counts.
- Footer block "Bewerten Sie uns" on every page:
  - 4 social links (Instagram, Facebook, YouTube, founder LinkedIn);
  - 4 review cards with each platform's logo and review link.
- JSON-LD: one Organization (`#organization`) with 7 sameAs:
  - Instagram, Facebook, YouTube;
  - Trustpilot, ProvenExpert, Sortlist, wlw.
- The founder's LinkedIn is on the Person node only.
- The old aggregateRating (5.0 from 20 ratings, with no real reviews behind it) has been removed.

## Results
- 8 sitemap pages × 1440 and 375 (16 runs):
  - 1 Organization with 7 sameAs, 11 platform links and 0 console errors on every run;
  - layout shift ≤ 0.0103 at 1440 and 0 at 375.
- Lighthouse on the live site:
  - home: Performance 99, Accessibility 85, Best Practices 96, SEO 100 (baseline: 75 / 85 / 96 / 100);
  - /seo-agentur/: 100 in all four categories.
- The 4 accessibility failures on home were already there before this change: contrast, list markup and the slider dots.
- Links:
  - every platform URL opens in real Chrome;
  - Sortlist review and wlw show a bot check to robots;
  - LinkedIn shows a login wall to robots.
- Visual check by eye: home 375, seo-agentur 1440, services/websites 375, uber-uns 1440. All pass.

## Open
- No verified NEO LinkedIn company page.
- Facebook link back to the website not verified; the page lists Bonn.
- YouTube link back to the website not verified.
- wlw has no review form, so its card links to the profile.
- ~~/datenschutz is 391 px wide at a 375 px screen.~~ Fixed in 5cab12b; see below.
- ~~Legal pages: white NEO logo and menu on a white background at the top.~~ Fixed in 8058562; see below.

## Follow-up fix (22.11.2026, commit 5cab12b)
- Cause: the single long word "Datenschutzerklärung" in the heading needed 371 px, but only 335 px were free.
- Fix: the heading on legal pages now hyphenates (`hyphens: auto`, `overflow-wrap: break-word`, `lang="de"`).
- Live recheck:
  - /datenschutz: 375 px wide at 375 and 1440 px wide at 1440, so no sideways scroll;
  - homepage: unchanged;
  - 0 console errors on all 4 runs.
- Screenshots: `after-datenschutz-fix/`.

## Follow-up fix 2 (22.11.2026, commit 8058562)
- Cause: the header picks its colours once, before the legal page has finished loading, so it stayed white until the visitor scrolled.
- Fix: the header checks again as soon as a page appears. Impressum and Datenschutz now show the dark logo and dark menu text the site already uses on light sections. Pages with a dark top area keep the white header.
- Live recheck: /impressum, /datenschutz and home at 375 and 1440; widths 375/1440, dark logo on both legal pages, white logo on home, 0 console errors on all 6 runs, checked by eye.
- Screenshots: `after-legal-header-fix/`.

## Changelog
- v1.2 (22.11.2026): legal-page header readability fix and recheck added.
- v1.1 (22.11.2026): privacy page width fix and recheck added.
- v1.0 (22.11.2026): first live QA note.
