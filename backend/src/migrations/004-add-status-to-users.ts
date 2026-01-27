import pool from "../config/db";

async function addStatusToUsers() {
  try {
    // Check if column already exists
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND column_name = 'status'
    `);

    if (checkColumn.rows.length > 0) {
      console.log("✅ status column already exists in users table");
      process.exit(0);
    }

    // Add status column with default 'active'
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN status VARCHAR(20) DEFAULT 'active'
    `);

    // Update existing records to have 'active' status
    await pool.query(`
      UPDATE users 
      SET status = 'active' 
      WHERE status IS NULL
    `);

    console.log("✅ Successfully added status column to users table");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

addStatusToUsers();
