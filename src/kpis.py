import pandas as pd

def build_kpis(energy_path: str, incident_path: str, bill_path: str) -> dict:
    e = pd.read_csv(energy_path)
    i = pd.read_csv(incident_path)
    b = pd.read_csv(bill_path)
    missing = int(e["consumption_kwh"].isna().sum())
    closed = i[i["status"]=="Closed"].copy()
    avg_hours = None
    if not closed.empty:
        c = pd.to_datetime(closed["created_date"])
        r = pd.to_datetime(closed["resolved_date"])
        avg_hours = round((r-c).dt.total_seconds().mean()/3600,2)
    return {
        "total_energy_rows": len(e),
        "missing_readings": missing,
        "missing_rate_pct": round(100*missing/len(e),2),
        "anomalies": int((e["data_status"]=="ANOMALY").sum()),
        "avg_incident_resolution_hours": avg_hours,
        "bill_delivery_rate_pct": round(100*b["received_bills"].sum()/b["expected_bills"].sum(),2)
    }

if __name__ == "__main__":
    print(build_kpis("data/processed/validated_energy_readings.csv","data/raw/incident_log.csv","data/raw/bill_reconciliation.csv"))
