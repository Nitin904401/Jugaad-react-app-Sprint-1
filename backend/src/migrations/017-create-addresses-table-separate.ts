import pool from "../config/db";

async function createAddressesTable() {
  try {
    // Create addresses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        full_name VARCHAR(255) NOT NULL,
        address_type VARCHAR(50) DEFAULT 'Home',
        street_address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zip_code VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL,
        is_primary BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Addresses table created successfully");
  } catch (error) {
    console.error("❌ Error creating addresses table:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

createAddressesTable();
