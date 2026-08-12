# ⚡ Arcadia Energy Operations Analytics

> **Arcadia-inspired portfolio project for a Data Analyst – Operations interview.**
> Uses **synthetic data** only. **Not affiliated with Arcadia and does not contain confidential/company data.**

## 🎯 Objective
Demonstrate the end-to-end skills expected for an Energy Data Analyst in Operations:

**Requirements → Data Generation → Monitoring → Validation → Troubleshooting → Reconciliation → Reporting**

## 🏗️ Architecture
```text
Energy / Utility Data
        ↓
Data Validation
        ↓
┌────────────┬────────────┬────────────┐
│   Excel    │    SQL     │   Python   │
│ Dashboard  │ Analytics  │ Validation │
└────────────┴────────────┴────────────┘
        ↓
Operational KPIs
        ↓
Customer / Team Reporting
```

## 📁 Structure
```text
ARCADIA-ENERGY-OPERATIONS-ANALYTICS/
├── data/
│   ├── raw/
│   │   ├── customer_master.csv
│   │   ├── meter_master.csv
│   │   ├── energy_readings.csv
│   │   ├── incident_log.csv
│   │   └── bill_reconciliation.csv
│   └── processed/
│       └── validated_energy_readings.csv
├── excel/
│   └── Arcadia_Energy_Operations_Dashboard.xlsx
├── sql/
│   ├── schema.sql
│   └── analysis_queries.sql
├── src/
│   ├── validate_data.py
│   └── kpis.py
├── tests/
│   └── test_validation.py
├── docs/
│   └── interview_talking_points.md
├── .github/workflows/python-tests.yml
├── requirements.txt
├── .gitignore
└── README.md
```

## 📊 Key KPIs
- Data Validity %
- Missing Reading %
- Anomaly Count
- Open/In-Progress Incidents
- Average Resolution Hours
- Bill Delivery %
- Customer impact / reconciliation gaps

## 🧹 Data Quality Checks
The Python layer checks:
- missing readings
- duplicates by meter/date
- invalid units
- negative values
- overall valid-data rate

## 🗃️ SQL Coverage
- `GROUP BY` / `HAVING`
- joins-ready schema
- subqueries
- CTEs
- window functions
- rolling averages
- data-quality analysis
- operational KPIs

## 📗 Excel Coverage
The workbook includes:
- Dashboard
- Energy Data
- Incident Log
- Bill Reconciliation
- KPI Summary
- formula-driven KPIs
- conditional formatting
- charts
- reconciliation analysis

## 🐍 Python Coverage
- pandas validation
- KPI calculation
- reusable functions
- basic automated tests

## ▶️ Run
```bash
pip install -r requirements.txt
python src/validate_data.py
python src/kpis.py
pytest -q
```

## ⚠️ Disclaimer
All data is synthetic. This repository is an independent portfolio project and is not an Arcadia internal project.

---
