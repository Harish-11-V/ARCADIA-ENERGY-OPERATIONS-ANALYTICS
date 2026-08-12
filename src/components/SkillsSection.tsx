import {
  Table2,
  Database,
  Code2,
  BarChart3,
  ShieldCheck,
  LineChart,
  Settings2,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";
import { Section } from "./ui";

const SKILLS = [
  { label: "Excel", icon: Table2 },
  { label: "SQL", icon: Database },
  { label: "Python & Pandas", icon: Code2 },
  { label: "Data Quality", icon: ShieldCheck },
  { label: "Reporting", icon: BarChart3 },
  { label: "Operations", icon: Settings2 },
  { label: "Analytics", icon: LineChart },
  { label: "Root-cause Analysis", icon: BrainCircuit },
];

const WORKFLOW = ["Customer Requirement", "Data Validation", "Monitoring", "Troubleshooting", "Reporting"];

export function SkillsSection() {
  return (
    <Section
      eyebrow="Toolkit"
      title="Data analyst skills"
      description="The tools and habits behind this case study."
      className="bg-slate-50"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SKILLS.map((skill) => (
          <div
            key={skill.label}
            className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-navy-900 shadow-sm"
          >
            <skill.icon className="h-4 w-4 shrink-0 text-teal-600" strokeWidth={2} />
            {skill.label}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="font-mono-data text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
          Core workflow
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {WORKFLOW.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-700 shadow-sm">
                {step}
              </span>
              {i < WORKFLOW.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 text-slate-300" strokeWidth={2} />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
