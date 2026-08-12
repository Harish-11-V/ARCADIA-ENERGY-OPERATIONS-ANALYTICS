from pathlib import Path
import sys
sys.path.append(str(Path(__file__).resolve().parents[1]/"src"))
from validate_data import validate_energy_data

def test_dataset_validates():
    result=validate_energy_data(Path("data/processed/validated_energy_readings.csv"))
    assert result["rows"] > 0
    assert 0 <= result["valid_rate_pct"] <= 100
