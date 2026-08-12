-- Top customers by consumption
SELECT customer_id, SUM(consumption_kwh) AS total_kwh
FROM energy_readings WHERE consumption_kwh IS NOT NULL
GROUP BY customer_id ORDER BY total_kwh DESC LIMIT 10;

-- Missing reading rate by customer
SELECT customer_id, COUNT(*) AS total_rows,
SUM(CASE WHEN consumption_kwh IS NULL THEN 1 ELSE 0 END) AS missing_rows,
ROUND(100.0*SUM(CASE WHEN consumption_kwh IS NULL THEN 1 ELSE 0 END)/COUNT(*),2) AS missing_pct
FROM energy_readings GROUP BY customer_id ORDER BY missing_pct DESC;

-- Incident volume
SELECT priority, status, COUNT(*) AS incident_count
FROM incident_log GROUP BY priority,status ORDER BY incident_count DESC;

-- Average resolution time
SELECT AVG((JULIANDAY(resolved_date)-JULIANDAY(created_date))*24.0) AS avg_resolution_hours
FROM incident_log WHERE status='Closed' AND resolved_date IS NOT NULL;

-- Bill reconciliation
SELECT customer_id,billing_month,expected_bills,received_bills,missing_bills
FROM bill_reconciliation WHERE missing_bills>0 ORDER BY missing_bills DESC;

-- Duplicate meter/date
SELECT meter_id,reading_date,COUNT(*) AS row_count
FROM energy_readings GROUP BY meter_id,reading_date HAVING COUNT(*)>1;

-- Rolling 7-day average
WITH daily AS (
 SELECT meter_id,reading_date,SUM(consumption_kwh) AS daily_kwh
 FROM energy_readings WHERE consumption_kwh IS NOT NULL
 GROUP BY meter_id,reading_date
)
SELECT meter_id,reading_date,daily_kwh,
AVG(daily_kwh) OVER(PARTITION BY meter_id ORDER BY reading_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7d_avg_kwh
FROM daily;

-- Operational KPI
SELECT COUNT(*) total_rows,
SUM(CASE WHEN consumption_kwh IS NULL THEN 1 ELSE 0 END) missing_rows,
SUM(CASE WHEN data_status='ANOMALY' THEN 1 ELSE 0 END) anomalies,
ROUND(100.0*SUM(CASE WHEN consumption_kwh IS NOT NULL AND unit='kWh' THEN 1 ELSE 0 END)/COUNT(*),2) valid_pct
FROM energy_readings;
