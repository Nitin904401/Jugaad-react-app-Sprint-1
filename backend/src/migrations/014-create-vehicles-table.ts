import pool from "../config/db";

async function createVehiclesTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        year VARCHAR(4) NOT NULL,
        make VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        variant VARCHAR(100),
        license_plate VARCHAR(50),
        fuel_type VARCHAR(50),
        transmission VARCHAR(50),
        engine_size VARCHAR(100),
        vehicle_nickname VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Vehicles table created successfully");
  } catch (error) {
    console.error("❌ Error creating vehicles table:", error);
    throw error;
  }
}

createVehiclesTable()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
