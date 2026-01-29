import pool from "../config/db";

const addAddressColumns = async () => {
  try {
    // Add address-related columns to users table
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS address_type VARCHAR(50) DEFAULT 'Home',
      ADD COLUMN IF NOT EXISTS street_address TEXT,
      ADD COLUMN IF NOT EXISTS city VARCHAR(100),
      ADD COLUMN IF NOT EXISTS state VARCHAR(100),
      ADD COLUMN IF NOT EXISTS zip_code VARCHAR(20),
      ADD COLUMN IF NOT EXISTS country VARCHAR(100),
      ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT true;
    `);

    console.log("✅ Address columns added to users table successfully");
  } catch (error) {
    console.error("❌ Error adding address columns:", error);
    throw error;
  } finally {
    await pool.end();
  }
};

addAddressColumns();
