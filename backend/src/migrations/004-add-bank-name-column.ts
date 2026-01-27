import pool from "../config/db";

async function addBankNameColumn() {
  try {
    // Check if bank_name column exists
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'vendors' 
      AND column_name = 'bank_name'
    `);

    // Add bank_name if not exists
    if (checkColumn.rows.length === 0) {
      await pool.query(`
        ALTER TABLE vendors 
        ADD COLUMN bank_name VARCHAR(255)
      `);
      console.log("✅ Added bank_name column");
    } else {
      console.log("ℹ️  bank_name column already exists");
    }

    // Verify the column was added
    const verify = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'vendors' 
      AND column_name = 'bank_name'
    `);

    console.log("\n✅ Verification:");
    console.log("   - bank_name:", verify.rows[0]?.data_type || "NOT FOUND");

    console.log("\n✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

addBankNameColumn();
