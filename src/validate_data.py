from pathlib import Path
import pandas as pd

def validate_energy_data(path: str | Path) -> dict:
    df = pd.read_csv(path)
    required = ["reading_date","meter_id","customer_id","consumption_kwh","unit"]
    missing = [c for c in required if c not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")
    result = {
        "rows": len(df),
        "missing_consumption": int(df["consumption_kwh"].isna().sum()),
        "duplicate_meter_date": int(df.duplicated(["meter_id","reading_date"]).sum()),
        "invalid_units": int((df["unit"]!="kWh").sum()),
        "negative_values": int((df["consumption_kwh"]<0).fillna(False).sum()),
    }
    result["valid_rows"] = max(0, result["rows"]-result["missing_consumption"]-
                               result["duplicate_meter_date"]-result["invalid_units"]-result["negative_values"])
    result["valid_rate_pct"] = round(100*result["valid_rows"]/result["rows"],2) if result["rows"] else 0
    return result

if __name__ == "__main__":
    print(validate_energy_data("data/processed/validated_energy_readings.csv"))
