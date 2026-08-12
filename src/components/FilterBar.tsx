import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { CUSTOMERS, COUNTRIES, DATE_RANGE } from "../data/dataset";
import type { Filters } from "../lib/metrics";

export function FilterBar({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
}) {
  return (
    <div
      id="dashboard"
      className="scroll-mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-end gap-4">
        <Field label="Customer">
          <select
            className={selectClass}
            value={filters.customerId}
            onChange={(e) => onChange({ ...filters, customerId: e.target.value })}
          >
            <option value="all">All customers</option>
            {CUSTOMERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Country">
          <select
            className={selectClass}
            value={filters.country}
            onChange={(e) => onChange({ ...filters, country: e.target.value })}
          >
            <option value="all">All countries</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="From">
          <input
            type="date"
            className={selectClass}
            value={filters.startDate}
            min={DATE_RANGE.start}
            max={filters.endDate}
            onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
          />
        </Field>

        <Field label="To">
          <input
            type="date"
            className={selectClass}
            value={filters.endDate}
            min={filters.startDate}
            max={DATE_RANGE.end}
            onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
          />
        </Field>

        <button
          onClick={onReset}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>
    </div>
  );
}

const selectClass =
  "h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-navy-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-500">
      {label}
      {children}
    </label>
  );
}
