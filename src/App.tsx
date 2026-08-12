import { useMemo, useState } from "react";
import { Hero } from "./components/Hero";
import { FilterBar } from "./components/FilterBar";
import { KpiCards } from "./components/KpiCards";
import { OperationsFlow } from "./components/OperationsFlow";
import { ChartsSection } from "./components/ChartsSection";
import { IssuesTable } from "./components/IssuesTable";
import { DataQuality } from "./components/DataQuality";
import { SkillsSection } from "./components/SkillsSection";
import { GithubSection } from "./components/GithubSection";
import { Footer } from "./components/Footer";
import { DATE_RANGE } from "./data/dataset";
import {
  filterReadings,
  filterIncidents,
  computeKpis,
  computeConsumptionTrend,
  computeQualityBreakdown,
  computeIncidentStatusBreakdown,
  computeQualityDimensions,
  type Filters,
} from "./lib/metrics";

const DEFAULT_FILTERS: Filters = {
  customerId: "all",
  country: "all",
  startDate: DATE_RANGE.start,
  endDate: DATE_RANGE.end,
};

function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const readings = useMemo(() => filterReadings(filters), [filters]);
  const incidents = useMemo(() => filterIncidents(filters), [filters]);
  const kpis = useMemo(() => computeKpis(readings, incidents), [readings, incidents]);
  const trend = useMemo(() => computeConsumptionTrend(readings), [readings]);
  const quality = useMemo(() => computeQualityBreakdown(readings), [readings]);
  const incidentStatus = useMemo(() => computeIncidentStatusBreakdown(incidents), [incidents]);
  const qualityDimensions = useMemo(() => computeQualityDimensions(kpis), [kpis]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
        <div className="mt-8">
          <KpiCards kpis={kpis} />
        </div>
      </main>

      <OperationsFlow />
      <ChartsSection trend={trend} quality={quality} incidentStatus={incidentStatus} />
      <IssuesTable incidents={incidents} />
      <DataQuality dimensions={qualityDimensions} />
      <SkillsSection />
      <GithubSection />
      <Footer />
    </div>
  );
}

export default App;
