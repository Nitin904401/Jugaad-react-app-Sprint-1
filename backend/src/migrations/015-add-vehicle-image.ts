import pool from "../config/db";

const addVehicleImageColumn = async () => {
  try {
    await pool.query(`
      ALTER TABLE vehicles 
      ADD COLUMN IF NOT EXISTS vehicle_image VARCHAR(255);
    `);
    console.log("✅ Added vehicle_image column to vehicles table");
  } catch (error) {
    console.error("❌ Error adding vehicle_image column:", error);
    throw error;
  }
};

addVehicleImageColumn()
  .then(() => {
    console.log("Migration completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
