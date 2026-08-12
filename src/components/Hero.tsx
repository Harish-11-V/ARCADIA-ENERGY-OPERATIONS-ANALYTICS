import { ArrowRight, Zap } from "lucide-react";
import { GithubMark } from "./GithubMark";

const GITHUB_URL = "https://github.com/Harish-11-V/ARCADIA-ENERGY-OPERATIONS-ANALYTICS";

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-2 text-xs font-mono-data font-semibold tracking-[0.18em] text-teal-700 uppercase">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 ring-1 ring-teal-100">
            <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          Data Analyst · Operations case study
        </div>

        <h1 className="font-display mt-5 max-w-3xl text-3xl font-semibold leading-tight text-navy-900 md:text-[42px]">
          Energy Data Operations Analytics
        </h1>

        <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
          Turning energy data into reliable operational insights.
        </p>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
          An independent Data Analyst case study focused on data quality, monitoring,
          troubleshooting and reporting — built on synthetic data.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            View dashboard
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <GithubMark className="h-4 w-4" />
            GitHub project
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Independent portfolio project using synthetic data. Not affiliated with Arcadia.
        </p>
      </div>
    </header>
  );
}
