// Synthetic demo dataset — no real customer, meter, or billing data.
// Generated deterministically so the dashboard renders identically on every load.

export type DataStatus = "valid" | "missing" | "anomaly";
export type Priority = "Low" | "Medium" | "High";
export type IncidentStatus = "Open" | "In Progress" | "Closed";

export interface Customer {
  id: string;
  name: string;
  country: string;
}

export interface Reading {
  customer_id: string;
  customer_name: string;
  country: string;
  meter_id: string;
  date: string; // ISO date
  consumption_kwh: number;
  data_status: DataStatus;
  expected_bills: number;
  received_bills: number;
}

export interface Incident {
  id: string;
  customer_id: string;
  customer_name: string;
  country: string;
  date: string;
  incident_type: string;
  priority: Priority;
  incident_status: IncidentStatus;
  resolution_hours: number | null;
  action: string;
}

// --- deterministic PRNG (mulberry32) ---
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260812);

export const CUSTOMERS: Customer[] = [
  { id: "C-1001", name: "NorthStar Retail", country: "United States" },
  { id: "C-1002", name: "Atlas Manufacturing", country: "Germany" },
  { id: "C-1003", name: "SilverArc Data Centers", country: "United States" },
  { id: "C-1004", name: "GreenGrid Hotels", country: "United Kingdom" },
  { id: "C-1005", name: "BlueWave Utilities", country: "India" },
  { id: "C-1006", name: "Solace Retail Group", country: "United Kingdom" },
];

export const COUNTRIES = Array.from(new Set(CUSTOMERS.map((c) => c.country)));

const METERS_PER_CUSTOMER = 10;
const DAY_COUNT = 31;
const BASE_DATE = new Date("2026-07-13T00:00:00Z");

function formatDate(offset: number): string {
  const d = new Date(BASE_DATE);
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}

export const DATE_RANGE = {
  start: formatDate(0),
  end: formatDate(DAY_COUNT - 1),
};

const BASE_LOAD: Record<string, number> = {
  "C-1001": 420, // retail
  "C-1002": 1450, // manufacturing, highest load
  "C-1003": 980, // data centers
  "C-1004": 260, // hotels
  "C-1005": 610, // utilities
  "C-1006": 380, // retail
};

function buildReadings(): Reading[] {
  const rows: Reading[] = [];
  for (const customer of CUSTOMERS) {
    const base = BASE_LOAD[customer.id];
    for (let m = 1; m <= METERS_PER_CUSTOMER; m++) {
      const meterId = `${customer.id}-M${String(m).padStart(2, "0")}`;
      const meterDrift = 0.85 + rand() * 0.3; // per-meter baseline variance
      for (let day = 0; day < DAY_COUNT; day++) {
        const roll = rand();
        let status: DataStatus = "valid";
        if (roll > 0.9875) status = "missing";
        else if (roll > 0.965) status = "anomaly";

        const weekday = new Date(formatDate(day)).getUTCDay();
        const weekendDip = weekday === 0 || weekday === 6 ? 0.82 : 1;
        const noise = 0.9 + rand() * 0.2;
        let consumption = Math.round(base * meterDrift * weekendDip * noise);
        if (status === "anomaly") {
          consumption = Math.round(consumption * (rand() > 0.5 ? 1.8 : 0.35));
        }
        if (status === "missing") consumption = 0;

        const expected = 1;
        let received = 1;
        if (status === "missing") received = 0;
        else if (status === "anomaly" && rand() > 0.55) received = 0;

        rows.push({
          customer_id: customer.id,
          customer_name: customer.name,
          country: customer.country,
          meter_id: meterId,
          date: formatDate(day),
          consumption_kwh: consumption,
          data_status: status,
          expected_bills: expected,
          received_bills: received,
        });
      }
    }
  }
  return rows;
}

export const READINGS: Reading[] = buildReadings();

const INCIDENT_TYPES = [
  "Missing Reading",
  "Delayed Delivery",
  "Consumption Anomaly",
  "Duplicate Record",
  "Late Bill Sync",
  "Meter Communication Fault",
];

const PRIORITIES: Priority[] = ["Low", "Medium", "High"];

function buildIncidents(): Incident[] {
  const rows: Incident[] = [];
  const totalIncidents = 40;

  const seedRows: Array<[string, string, Priority, IncidentStatus, string]> = [
    ["Missing Reading", "C-1001", "Medium", "Open", "Investigate source"],
    ["Delayed Delivery", "C-1002", "High", "In Progress", "Escalated to engineering"],
    ["Consumption Anomaly", "C-1003", "Medium", "Closed", "Validated & resolved"],
    ["Duplicate Record", "C-1004", "Low", "Closed", "Removed duplicate"],
  ];

  seedRows.forEach(([type, custId, priority, status, action], i) => {
    const customer = CUSTOMERS.find((c) => c.id === custId)!;
    rows.push({
      id: `INC-${String(i + 1).padStart(3, "0")}`,
      customer_id: customer.id,
      customer_name: customer.name,
      country: customer.country,
      date: formatDate(Math.floor(rand() * DAY_COUNT)),
      incident_type: type,
      priority,
      incident_status: status,
      resolution_hours: status === "Closed" ? Math.round(18 + rand() * 30) : null,
      action,
    });
  });

  for (let i = seedRows.length; i < totalIncidents; i++) {
    const customer = CUSTOMERS[Math.floor(rand() * CUSTOMERS.length)];
    const type = INCIDENT_TYPES[Math.floor(rand() * INCIDENT_TYPES.length)];
    const priority = PRIORITIES[Math.floor(rand() * PRIORITIES.length)];
    const statusRoll = rand();
    // Tuned so open + in-progress ≈ 29 of 40, closed ≈ 11
    let status: IncidentStatus;
    if (statusRoll < 0.4) status = "Open";
    else if (statusRoll < 0.72) status = "In Progress";
    else status = "Closed";

    const actionByStatus: Record<IncidentStatus, string> = {
      Open: "Investigate source",
      "In Progress": "Escalated to engineering",
      Closed: "Validated & resolved",
    };

    rows.push({
      id: `INC-${String(i + 1).padStart(3, "0")}`,
      customer_id: customer.id,
      customer_name: customer.name,
      country: customer.country,
      date: formatDate(Math.floor(rand() * DAY_COUNT)),
      incident_type: type,
      priority,
      incident_status: status,
      resolution_hours:
        status === "Closed" ? Math.round(14 + rand() * 34) : null,
      action: actionByStatus[status],
    });
  }
  return rows;
}

export const INCIDENTS: Incident[] = buildIncidents();
