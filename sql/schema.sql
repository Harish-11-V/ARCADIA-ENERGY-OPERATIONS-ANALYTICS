CREATE TABLE customer_master (
 customer_id VARCHAR(10) PRIMARY KEY, customer_name VARCHAR(100), country VARCHAR(50), industry VARCHAR(100)
);
CREATE TABLE meter_master (
 meter_id VARCHAR(10) PRIMARY KEY, customer_id VARCHAR(10), country VARCHAR(50), facility_type VARCHAR(100), facility VARCHAR(50)
);
CREATE TABLE energy_readings (
 reading_date DATE, meter_id VARCHAR(10), customer_id VARCHAR(10), country VARCHAR(50), facility VARCHAR(50),
 consumption_kwh DECIMAL(14,2), unit VARCHAR(10), data_status VARCHAR(20)
);
CREATE TABLE incident_log (
 incident_id VARCHAR(20) PRIMARY KEY, created_date DATE, customer_id VARCHAR(10), meter_id VARCHAR(10),
 incident_type VARCHAR(100), priority VARCHAR(20), root_cause VARCHAR(200), status VARCHAR(30), resolved_date DATE, owner_team VARCHAR(50)
);
CREATE TABLE bill_reconciliation (
 billing_month VARCHAR(7), customer_id VARCHAR(10), country VARCHAR(50), expected_bills INT, received_bills INT,
 missing_bills INT, delivery_rate DECIMAL(8,4), reconciliation_status VARCHAR(30)
);
