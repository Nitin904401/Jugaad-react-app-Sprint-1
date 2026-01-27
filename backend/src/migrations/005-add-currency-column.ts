import pool from "../config/db";

async function addCurrencyColumn() {
  try {
    // Check if currency column already exists
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'vendors' AND column_name = 'currency'
    `);

    if (checkColumn.rows.length > 0) {
      console.log("Currency column already exists");
      return;
    }

    // Add currency column
    await pool.query(`
      ALTER TABLE vendors 
      ADD COLUMN currency VARCHAR(20) DEFAULT 'INR (₹)'
    `);

    console.log("✅ Currency column added successfully");
  } catch (error) {
    console.error("Error adding currency column:", error);
  } finally {
    await pool.end();
  }
}

addCurrencyColumn();
