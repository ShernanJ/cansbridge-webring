"use client";

import * as React from "react";
import Link from "next/link";
import type { ScholarLink } from "@/app/components/types";
import { cohortLabel } from "@/app/data/cohorts";
function domainFromUrl(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

export default function LinkDirectory({ links }: { links: ScholarLink[] }) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;

    return links.filter((l) => {
      const hay = [
        l.website,
        domainFromUrl(l.website),
        l.city,
        l.region,
        l.cohort,
        cohortLabel(l.cohort),
        l.firstName ?? "",
        l.lastName ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [links, query]);


  return (
    <section className="w-[min(92vw,65%)] max-w-5xl mx-auto">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center gap-3 text-white/70">
          <span className="select-none text-white/55">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search by site / cohort / location"
            className="w-full bg-transparent text-sm tracking-[0.08em] text-white/90 outline-none placeholder:text-white/50
                      selection:bg-white/20 focus:placeholder:text-white/40"
          />
        </div>

        <div className="mt-3 h-px w-full bg-white/25" />

        <ul className="
          mt-6 grid list-none pb-12
          gap-x-12 gap-y-12
          [grid-template-columns:repeat(auto-fit,minmax(min(22ch,100%),1fr))]
        ">
          {filtered.map((l) => {
            const domain = domainFromUrl(l.website);
            return (
              <li key={l.website} className="text-center py-3" style={{ minHeight: '30px' }}>
                <Link
                  href={l.website}
                  target="_blank"
                  className="
                    block text-center
                    text-[11px]
                    tracking-[0.10em] sm:tracking-[0.16em]
                    text-white/65 hover:text-white/95 transition
                    break-words [overflow-wrap:anywhere]
                  "
                >
                  {domain}
                </Link>

              </li>
            );
          })}
        </ul>


        <div className="mt-10 flex justify-center">
        <a href="https://github.com/ShernanJ/cansbridge-webring" target="_blank"
        className="relative inline-flex items-center justify-center rounded-full px-6 py-2 text-[12px]
                  font-medium tracking-[0.10em] text-white/90
                  transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/25"
      >
        add your site here →
      </a>
        </div>
      </div>
    </section>
  );
}
