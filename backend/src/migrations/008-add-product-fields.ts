import pool from '../config/db';

async function addProductFields() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Add new columns to products table
    const alterations = [
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS oem_reference VARCHAR(255)`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS sku VARCHAR(255)`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS mrp DECIMAL(10, 2)`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity_in_stock INTEGER DEFAULT 0`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS brand_type VARCHAR(50) CHECK (brand_type IN ('OEM', 'Aftermarket'))`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS condition VARCHAR(50) CHECK (condition IN ('New', 'Used', 'Refurb'))`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS images TEXT[]`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS compatible_vehicles JSONB`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES vendors(id)`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'archived'))`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS rejection_reason TEXT`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
    ];

    for (const sql of alterations) {
      console.log('Executing:', sql);
      await client.query(sql);
    }

    await client.query('COMMIT');
    console.log('✅ Product fields added successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error adding product fields:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

addProductFields();
