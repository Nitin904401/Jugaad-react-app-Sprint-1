import pool from "../config/db";

async function addVendorRegistrationFields() {
  try {
    // Check if columns exist
    const checkColumns = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'vendors' 
      AND column_name IN ('legal_business_name', 'pan_document', 'cheque_document')
    `);

    const existingColumns = checkColumns.rows.map(row => row.column_name);

    // Add legal_business_name if not exists
    if (!existingColumns.includes('legal_business_name')) {
      await pool.query(`
        ALTER TABLE vendors 
        ADD COLUMN legal_business_name VARCHAR(255)
      `);
      console.log("✅ Added legal_business_name column");
    }

    // Add pan_document if not exists
    if (!existingColumns.includes('pan_document')) {
      await pool.query(`
        ALTER TABLE vendors 
        ADD COLUMN pan_document VARCHAR(500)
      `);
      console.log("✅ Added pan_document column");
    }

    // Add cheque_document if not exists
    if (!existingColumns.includes('cheque_document')) {
      await pool.query(`
        ALTER TABLE vendors 
        ADD COLUMN cheque_document VARCHAR(500)
      `);
      console.log("✅ Added cheque_document column");
    }

    // Verify updated schema
    const verifySchema = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'vendors'
      ORDER BY ordinal_position
    `);

    console.log("\n✅ Vendors table schema:");
    verifySchema.rows.forEach(row => {
      console.log(`   - ${row.column_name}: ${row.data_type}`);
    });

  } catch (error) {
    console.error("Error updating vendors table:", error);
  } finally {
    await pool.end();
  }
}

// Run migration
addVendorRegistrationFields();
