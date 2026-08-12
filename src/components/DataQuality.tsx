import { Section } from "./ui";
import type { QualityDimension } from "../lib/metrics";

export function DataQuality({ dimensions }: { dimensions: QualityDimension[] }) {
  return (
    <Section
      eyebrow="Data quality"
      title="Data quality"
      description="Reliable energy data is critical because incorrect data can affect cost forecasting, procurement and sustainability reporting."
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
        {dimensions.map((dim) => (
          <div key={dim.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium text-navy-900">{dim.label}</span>
              <span className="font-mono-data font-semibold text-navy-900">
                {dim.value.toFixed(1)}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-teal-600"
                style={{ width: `${dim.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
