import pool from "../config/db";

async function addPhoneNumberColumn() {
  try {
    // Check if column exists
    const checkColumn = await pool.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name='users' AND column_name='phone_number'
    `);

    if (checkColumn.rows.length > 0) {
      console.log("Phone number column already exists");
      return;
    }

    // Add the column if it doesn't exist
    await pool.query(`
      ALTER TABLE users ADD COLUMN phone_number VARCHAR(20)
    `);

    console.log("✅ Phone number column added successfully");
  } catch (error) {
    console.error("Error adding phone number column:", error);
  } finally {
    await pool.end();
  }
}

addPhoneNumberColumn();
