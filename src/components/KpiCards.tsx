import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  AlertTriangle,
  Siren,
  Timer,
  ReceiptText,
  Database,
} from "lucide-react";
import { Badge, statusTone } from "./ui";
import type { computeKpis } from "../lib/metrics";

type Kpis = ReturnType<typeof computeKpis>;

interface Card {
  label: string;
  value: string;
  status: string;
  icon: LucideIcon;
}

export function KpiCards({ kpis }: { kpis: Kpis }) {
  const cards: Card[] = [
    {
      label: "Data Validity",
      value: `${kpis.dataValidity.toFixed(2)}%`,
      status: kpis.dataValidity >= 97 ? "Healthy" : "Needs Attention",
      icon: ShieldCheck,
    },
    {
      label: "Missing Data",
      value: `${kpis.missingRate.toFixed(2)}%`,
      status: kpis.missingRate <= 2 ? "Low Risk" : "Needs Attention",
      icon: AlertTriangle,
    },
    {
      label: "Active Incidents",
      value: String(kpis.activeIncidents),
      status: "Needs Attention",
      icon: Siren,
    },
    {
      label: "Avg Resolution Time",
      value: `${kpis.avgResolution.toFixed(1)} hrs`,
      status: "Tracked",
      icon: Timer,
    },
    {
      label: "Bill Delivery",
      value: `${kpis.billDelivery.toFixed(2)}%`,
      status: kpis.billDelivery >= 95 ? "Healthy" : "Needs Attention",
      icon: ReceiptText,
    },
    {
      label: "Records Processed",
      value: kpis.recordsProcessed.toLocaleString(),
      status: "This Period",
      icon: Database,
    },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium text-slate-400">Synthetic demo data</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <card.icon className="h-4 w-4 text-teal-600" strokeWidth={2} />
            </div>
            <p className="font-mono-data mt-3 text-2xl font-semibold text-navy-900">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{card.label}</p>
            <div className="mt-2.5">
              <Badge tone={statusTone(card.status)}>{card.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
