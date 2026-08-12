import { Badge, priorityTone, statusTone, Section } from "./ui";
import type { Incident } from "../data/dataset";

export function IssuesTable({ incidents }: { incidents: Incident[] }) {
  const rows = incidents.slice(0, 8);

  return (
    <Section
      eyebrow="Case queue"
      title="Operations issues"
      description="A working queue of open data and delivery issues, prioritized by customer impact."
      className="bg-slate-50"
    >
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-xs font-medium uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 font-medium">Incident</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                    No incidents match the current filters.
                  </td>
                </tr>
              )}
              {rows.map((incident) => (
                <tr key={incident.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-medium text-navy-900">{incident.incident_type}</td>
                  <td className="px-4 py-3 text-slate-600">{incident.customer_name}</td>
                  <td className="px-4 py-3">
                    <Badge tone={priorityTone(incident.priority)}>{incident.priority}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(incident.incident_status)}>{incident.incident_status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{incident.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
