"use client";

import StarsBackground from "@/app/components/StarsBackground";
import TopLogo3D from "@/app/components/TopLogo3D";
import LinkDirectory from "@/app/components/LinkDirectory";
import linksJson from "@/app/data/links.json";
import type { ScholarLink } from "@/app/components/types";

const LINKS = linksJson as ScholarLink[];

export default function Page() {
  return (
    <>
      {/* fullscreen starfield */}
      <StarsBackground />

      <main className="relative min-h-screen text-white z-10">
        <div className="absolute left-6 top-6">
          <div className="h-6 w-6 rounded-sm border border-white/80" />
        </div>

        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-6">
          <TopLogo3D />

          <div className="pb-12 flex w-full justify-center">
            <LinkDirectory links={LINKS} />
          </div>
        </div>
      </main>
    </>
  );
}
