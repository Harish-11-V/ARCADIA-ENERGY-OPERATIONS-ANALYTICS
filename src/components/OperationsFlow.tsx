import {
  Plug,
  ListChecks,
  Activity,
  SearchCode,
  Wrench,
  FileBarChart,
} from "lucide-react";
import { Section } from "./ui";

const STAGES = [
  {
    title: "Energy Data",
    description: "Incoming utility / meter readings",
    icon: Plug,
  },
  {
    title: "Validation",
    description: "Check completeness and validity",
    icon: ListChecks,
  },
  {
    title: "Monitoring",
    description: "Track data delivery",
    icon: Activity,
  },
  {
    title: "Issue Detection",
    description: "Identify anomalies and missing records",
    icon: SearchCode,
  },
  {
    title: "Resolution",
    description: "Investigate and escalate",
    icon: Wrench,
  },
  {
    title: "Reporting",
    description: "Generate operational insights",
    icon: FileBarChart,
  },
];

export function OperationsFlow() {
  return (
    <Section
      eyebrow="How it works"
      title="Operations overview"
      description="One record's path from raw meter reading to an operational report."
      className="bg-slate-50"
    >
      <div className="relative">
        {/* connecting rail, desktop */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-6 hidden h-px bg-slate-200 md:block"
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-6 md:gap-x-0">
          {STAGES.map((stage, i) => (
            <div key={stage.title} className="relative flex flex-col items-start md:items-center md:text-center">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-teal-700 shadow-sm">
                <stage.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <p className="font-mono-data mt-3 text-[11px] font-semibold tracking-wide text-slate-400">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display mt-1 text-sm font-semibold text-navy-900">
                {stage.title}
              </p>
              <p className="mt-1 text-xs leading-snug text-slate-500 md:px-2">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
