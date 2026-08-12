import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-14 md:py-16 ${className}`}>
      <div className="mb-8 max-w-2xl">
        <p className="font-mono-data text-xs font-semibold tracking-[0.18em] text-teal-700 uppercase">
          {eyebrow}
        </p>
        <h2 className="font-display mt-2 text-2xl md:text-[28px] font-semibold text-navy-900">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

type Tone = "good" | "warn" | "bad" | "neutral";

const toneClasses: Record<Tone, string> = {
  good: "bg-good-50 text-good-700 ring-good-100",
  warn: "bg-warn-50 text-warn-700 ring-warn-100",
  bad: "bg-bad-50 text-bad-700 ring-bad-100",
  neutral: "bg-slate-100 text-navy-600 ring-slate-200",
};

export function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${toneClasses[tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  switch (status) {
    case "Closed":
    case "Healthy":
    case "Low Risk":
    case "Tracked":
    case "This Period":
      return "good";
    case "In Progress":
    case "Needs Attention":
      return "warn";
    case "Open":
      return "bad";
    default:
      return "neutral";
  }
}

export function priorityTone(priority: string): Tone {
  if (priority === "High") return "bad";
  if (priority === "Medium") return "warn";
  return "good";
}
