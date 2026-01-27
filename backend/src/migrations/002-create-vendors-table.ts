import pool from "../config/db";

async function createVendorsTable() {
  try {
    // Check if table exists
    const checkTable = await pool.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'vendors'
      )
    `);

    if (checkTable.rows[0].exists) {
      console.log("Vendors table already exists");
      return;
    }

    // Create vendors table
    await pool.query(`
      CREATE TABLE vendors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        company_name VARCHAR(255),
        business_type VARCHAR(100),
        website VARCHAR(255),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100),
        postal_code VARCHAR(20),
        tax_id VARCHAR(50),
        bank_account_holder VARCHAR(255),
        bank_account_number VARCHAR(50),
        bank_routing_number VARCHAR(50),
        documents_verified BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Vendors table created successfully");
  } catch (error) {
    console.error("Error creating vendors table:", error);
  } finally {
    await pool.end();
  }
}

createVendorsTable();
