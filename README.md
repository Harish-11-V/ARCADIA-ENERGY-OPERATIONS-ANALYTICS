# Energy Data Operations Analytics

An independent, one-page portfolio dashboard built for a **Data Analyst – Operations**
interview in the energy-data domain. All data is synthetic and generated locally in the
browser — there is no backend, database, or authentication.

> This is **not** an official Arcadia website. No Arcadia branding, logos, or confidential
> information are used anywhere in this project.

## What it shows

- **KPI dashboard** — data validity, missing data rate, active incidents, average
  resolution time, bill delivery, and records processed
- **Operations overview** — a six-stage pipeline from raw meter reading to report
- **Simple analytics** — energy consumption trend, data quality breakdown, and incident
  status, built with Recharts
- **Operations issues** — a sample incident queue with priority and status badges
- **Data quality** — six quality dimensions (accuracy, completeness, consistency,
  validity, timeliness, uniqueness)
- **Skills & workflow** — the analyst toolkit and core workflow behind the case study

Customer, country, and date-range filters recompute every KPI and chart from the local
synthetic dataset (`src/data/dataset.ts`) — no network calls involved.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Recharts · Lucide React

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and produce a production build in dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  components/   UI sections (Hero, KPI cards, charts, table, etc.)
  data/         Deterministic synthetic dataset generator
  lib/          Filtering and metric-computation utilities
  App.tsx       Page composition and filter state
```

---

Built by **Harish Kumar V** — B.Tech Artificial Intelligence & Machine Learning.
