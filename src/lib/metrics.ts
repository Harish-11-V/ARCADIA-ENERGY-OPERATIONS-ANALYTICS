import { READINGS, INCIDENTS, type Reading, type Incident } from "../data/dataset";

export interface Filters {
  customerId: string; // "all" | customer id
  country: string; // "all" | country
  startDate: string;
  endDate: string;
}

export function filterReadings(filters: Filters): Reading[] {
  return READINGS.filter((r) => {
    if (filters.customerId !== "all" && r.customer_id !== filters.customerId) return false;
    if (filters.country !== "all" && r.country !== filters.country) return false;
    if (r.date < filters.startDate || r.date > filters.endDate) return false;
    return true;
  });
}

export function filterIncidents(filters: Filters): Incident[] {
  return INCIDENTS.filter((i) => {
    if (filters.customerId !== "all" && i.customer_id !== filters.customerId) return false;
    if (filters.country !== "all" && i.country !== filters.country) return false;
    if (i.date < filters.startDate || i.date > filters.endDate) return false;
    return true;
  });
}

export function pct(n: number, d: number): number {
  if (d === 0) return 0;
  return (n / d) * 100;
}

export function computeKpis(readings: Reading[], incidents: Incident[]) {
  const total = readings.length;
  const missing = readings.filter((r) => r.data_status === "missing").length;
  const anomaly = readings.filter((r) => r.data_status === "anomaly").length;
  const valid = total - missing - anomaly;

  const dataValidity = pct(total - missing, total); // non-missing share
  const missingRate = pct(missing, total);

  const activeIncidents = incidents.filter(
    (i) => i.incident_status === "Open" || i.incident_status === "In Progress"
  ).length;

  const closed = incidents.filter((i) => i.incident_status === "Closed" && i.resolution_hours !== null);
  const avgResolution =
    closed.length > 0
      ? closed.reduce((sum, i) => sum + (i.resolution_hours ?? 0), 0) / closed.length
      : 0;

  const expected = readings.reduce((s, r) => s + r.expected_bills, 0);
  const received = readings.reduce((s, r) => s + r.received_bills, 0);
  const billDelivery = pct(received, expected);

  return {
    total,
    valid,
    missing,
    anomaly,
    dataValidity,
    missingRate,
    activeIncidents,
    avgResolution,
    billDelivery,
    recordsProcessed: total,
  };
}

export function computeConsumptionTrend(readings: Reading[]) {
  const byDate = new Map<string, { total: number; count: number }>();
  for (const r of readings) {
    if (r.data_status === "missing") continue;
    const entry = byDate.get(r.date) ?? { total: 0, count: 0 };
    entry.total += r.consumption_kwh;
    entry.count += 1;
    byDate.set(r.date, entry);
  }
  return Array.from(byDate.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, { total }]) => ({
      date: date.slice(5), // MM-DD
      kwh: Math.round(total / 1000) , // thousands for readability
    }));
}

export function computeQualityBreakdown(readings: Reading[]) {
  const total = readings.length || 1;
  const missing = readings.filter((r) => r.data_status === "missing").length;
  const anomaly = readings.filter((r) => r.data_status === "anomaly").length;
  const valid = total - missing - anomaly;
  return [
    { name: "Valid", value: valid, pct: pct(valid, total) },
    { name: "Missing", value: missing, pct: pct(missing, total) },
    { name: "Anomaly", value: anomaly, pct: pct(anomaly, total) },
  ];
}

export function computeIncidentStatusBreakdown(incidents: Incident[]) {
  const open = incidents.filter((i) => i.incident_status === "Open").length;
  const inProgress = incidents.filter((i) => i.incident_status === "In Progress").length;
  const closed = incidents.filter((i) => i.incident_status === "Closed").length;
  return [
    { name: "Open", value: open },
    { name: "In Progress", value: inProgress },
    { name: "Closed", value: closed },
  ];
}

export interface QualityDimension {
  label: string;
  value: number;
}

export function computeQualityDimensions(kpis: ReturnType<typeof computeKpis>): QualityDimension[] {
  // Derived, explainable composite scores for demo purposes.
  const accuracy = clamp(99.1 - kpis.anomaly * 0.02);
  const completeness = clamp(100 - kpis.missingRate);
  const consistency = clamp(99.3 - kpis.anomaly * 0.015);
  const validity = clamp(kpis.dataValidity);
  const timeliness = clamp(kpis.billDelivery - 0.3);
  const uniqueness = 99.4;
  return [
    { label: "Accuracy", value: accuracy },
    { label: "Completeness", value: completeness },
    { label: "Consistency", value: consistency },
    { label: "Validity", value: validity },
    { label: "Timeliness", value: timeliness },
    { label: "Uniqueness", value: uniqueness },
  ];
}

function clamp(n: number, min = 90, max = 100) {
  return Math.min(max, Math.max(min, n));
}
