import { ArrowUpRight } from "lucide-react";
import { GithubMark } from "./GithubMark";

const GITHUB_URL = "https://github.com/Harish-11-V/ARCADIA-ENERGY-OPERATIONS-ANALYTICS";

export function GithubSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-navy-900 p-8 md:flex-row md:items-center md:p-10">
        <div className="max-w-lg">
          <h2 className="font-display text-xl font-semibold text-white md:text-2xl">
            Explore the full project
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Includes synthetic energy data, incident logs, an Excel dashboard, SQL analysis,
            and Python validation scripts.
          </p>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-teal-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-teal-400"
        >
          <GithubMark className="h-4 w-4" />
          View GitHub repository
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
