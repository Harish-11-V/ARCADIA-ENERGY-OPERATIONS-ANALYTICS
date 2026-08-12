import type { ReactNode } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { Section } from "./ui";

const TEAL = "#0d9488";
const GOOD = "#16a34a";
const WARN = "#d97706";
const BAD = "#dc2626";
const SLATE = "#94a3b8";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
  fontFamily: "Inter, sans-serif",
  boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
};

export function ChartsSection({
  trend,
  quality,
  incidentStatus,
}: {
  trend: { date: string; kwh: number }[];
  quality: { name: string; value: number; pct: number }[];
  incidentStatus: { name: string; value: number }[];
}) {
  const incidentColors: Record<string, string> = {
    Open: BAD,
    "In Progress": WARN,
    Closed: GOOD,
  };
  const qualityColors: Record<string, string> = {
    Valid: GOOD,
    Missing: BAD,
    Anomaly: WARN,
  };

  return (
    <Section
      eyebrow="Analytics"
      title="Simple analytics"
      description="Three views built from the filtered dataset — consumption, quality, and incident health."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Energy Consumption Trend" subtitle="Total load, thousand kWh / day">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trend} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                interval={Math.max(0, Math.floor(trend.length / 6))}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="kwh"
                stroke={TEAL}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Data Quality" subtitle="Record status distribution">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={quality} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, _name, item) => [
                  `${Number(value).toLocaleString()} records (${item.payload.pct.toFixed(1)}%)`,
                  item.payload.name,
                ]}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {quality.map((entry) => (
                  <Cell key={entry.name} fill={qualityColors[entry.name] ?? SLATE} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Incident Status" subtitle="Open, in progress, and closed">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                height={24}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, color: "#475569" }}
              />
              <Pie
                data={incidentStatus}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
                stroke="none"
              >
                {incidentStatus.map((entry) => (
                  <Cell key={entry.name} fill={incidentColors[entry.name] ?? SLATE} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Section>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="font-display text-sm font-semibold text-navy-900">{title}</p>
      <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
