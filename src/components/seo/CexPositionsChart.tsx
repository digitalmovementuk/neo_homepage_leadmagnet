/**
 * Abschnitt 7 · Grafik „Positionen bei Google: CEx, Köln“ · v1.0 (19.11.2026)
 * Links die Tabelle mit allen gemessenen Werten (sie trägt die Zahlen, auch
 * für Vorleseprogramme). Rechts dieselben Positionen des letzten Stichtags
 * auf einer Skala von 1 bis 20. Alle Werte kommen aus dem Textmodul.
 */
import { seoDe } from "../../content/seo-de";
import { RichText } from "./ui";

const SCALE_MAX = 20;
const TICKS = [1, 10, 20];
const pct = (position: number) => ((Math.min(position, SCALE_MAX) - 1) / (SCALE_MAX - 1)) * 100;

function DateLabel({ date }: { date: string }) {
  const cut = date.lastIndexOf(".") + 1;
  return (
    <>
      {date.slice(0, cut)}
      <wbr />
      {date.slice(cut)}
    </>
  );
}

export function CexPositionsChart() {
  const { chart } = seoDe.channels;
  const last = chart.dates.length - 1;
  const lastDate = chart.dates[last];
  const plotted = chart.rows.filter((row) => typeof row.values[last] === "number");

  return (
    <figure className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[28px] sm:p-8 md:p-10">
      <h3 className="text-[20px] font-bold leading-tight tracking-tight text-white sm:text-[26px]">{chart.title}</h3>
      <p className="mt-1.5 text-[14px] text-white/70 sm:text-[16px]">{chart.subtitle}</p>

      <div className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-12">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">{chart.title}</caption>
          <colgroup>
            <col className="w-[34%] sm:w-[40%]" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="pb-3 pr-2 align-bottom text-[12px] font-semibold uppercase tracking-[0.1em] text-white/55">
                {chart.keywordHead}
              </th>
              {chart.dates.map((date, i) => (
                <th
                  key={date}
                  scope="col"
                  className={`seo-mono px-1 pb-3 text-center align-bottom text-[12px] font-semibold leading-tight sm:text-[13px] ${
                    i === last ? "text-white" : "text-white/55"
                  }`}
                >
                  <DateLabel date={date} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr key={row.keyword} className="border-t border-white/10">
                <th scope="row" className="py-3.5 pr-2 align-middle text-[13px] font-semibold leading-snug text-white [overflow-wrap:anywhere] sm:text-[15px]">
                  {row.keyword}
                </th>
                {row.values.map((value, i) => (
                  <td key={i} className="px-1 py-3.5 text-center align-middle">
                    {typeof value === "number" ? (
                      <span className="seo-mono text-[20px] font-bold leading-none text-white sm:text-[24px]">{value}</span>
                    ) : value === "nf" ? (
                      <span className="inline-block rounded-lg bg-white/[0.08] px-1.5 py-1 text-[12px] leading-tight text-white/70 sm:px-2">
                        {chart.notFound}
                      </span>
                    ) : (
                      <span className="text-[16px] text-white/55">{chart.notChecked}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Dieselben Werte als Bild; für Vorleseprogramme reicht die Tabelle. */}
        <div aria-hidden className="rounded-[20px] bg-white/[0.04] p-4 sm:p-6">
          <p className="seo-mono flex items-center gap-2 text-[13px] font-semibold text-white">
            <span className="h-3 w-3 rounded-full bg-[#FF7A45]" />
            {lastDate}
          </p>
          <div className="mt-5 space-y-4 px-2">
            {plotted.map((row) => {
              const value = row.values[last] as number;
              const left = pct(value);
              const labelLeft = left > 82;
              return (
                <div key={row.keyword}>
                  <p className="-mx-2 text-[13px] leading-snug text-white/70">{row.keyword}</p>
                  <div className="relative mt-1.5 h-7">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-white/25" />
                    {TICKS.map((tick) => (
                      <span
                        key={tick}
                        className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-white/30"
                        style={{ left: `${pct(tick)}%` }}
                      />
                    ))}
                    <span
                      title={`${row.keyword} · ${lastDate} · ${value}`}
                      className="absolute top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center"
                      style={{ left: `${left}%` }}
                    >
                      <span className="h-3.5 w-3.5 rounded-full bg-[#FF7A45] ring-2 ring-[#0a0a0c]" />
                    </span>
                    <span
                      className="seo-mono absolute top-1/2 -translate-y-1/2 text-[14px] font-bold text-white"
                      style={labelLeft ? { right: `calc(${100 - left}% + 14px)` } : { left: `calc(${left}% + 14px)` }}
                    >
                      {value}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="relative h-5">
              {TICKS.map((tick) => (
                <span
                  key={tick}
                  className="seo-mono absolute -translate-x-1/2 text-[12px] text-white/55"
                  style={{ left: `${pct(tick)}%` }}
                >
                  {tick}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-6 text-[13px] leading-[1.9] text-white/55 sm:mt-8">
        <RichText text={chart.legend} dark />
      </figcaption>
    </figure>
  );
}
