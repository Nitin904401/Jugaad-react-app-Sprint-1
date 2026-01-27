import pool from "./config/db";

async function addColumn() {
  try {
    await pool.query(`
      ALTER TABLE vendors
      ADD COLUMN IF NOT EXISTS profile_picture TEXT;
    `);
    console.log("✅ Added profile_picture column to vendors table");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to add column:", err);
    process.exit(1);
  }
}

addColumn();
