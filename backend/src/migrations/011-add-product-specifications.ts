import pool from '../config/db';

async function addProductSpecifications() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Starting migration: Add product specifications fields...');

    // Add new specification fields
    await client.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS material VARCHAR(255),
      ADD COLUMN IF NOT EXISTS weight DECIMAL(10, 2),
      ADD COLUMN IF NOT EXISTS position VARCHAR(50),
      ADD COLUMN IF NOT EXISTS low_stock_threshold INTEGER DEFAULT 10,
      ADD COLUMN IF NOT EXISTS upc_barcode VARCHAR(100),
      ADD COLUMN IF NOT EXISTS supplier VARCHAR(255)
    `);

    console.log('✅ Added specification fields to products table');
    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

addProductSpecifications()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
