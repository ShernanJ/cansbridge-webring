"use client";

import TopLogo3D from "@/app/components/TopLogo3D";
import LinkDirectory from "@/app/components/LinkDirectory";
import linksJson from "@/app/data/links.json";
import type { ScholarLink } from "@/app/components/types";

const LINKS = linksJson as ScholarLink[];

export default function Page() {
  return (
    <main className="min-h-screen text-white">
      <div className="absolute left-6 top-6">
        <div className="h-6 w-6 rounded-sm border border-white/80" />
      </div>

      {/* IMPORTANT: make this fill the screen */}
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-6">
        <TopLogo3D />

        {/* push directory to bottom */}
        <div className="pb-12 flex w-full justify-center">
          <LinkDirectory links={LINKS} />
        </div>
      </div>
    </main>
  );
}
