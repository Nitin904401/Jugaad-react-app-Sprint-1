import pool from '../config/db';

async function addTopVendorColumn() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Adding top_vendor column to vendors table...');
    
    // Add top_vendor column if it doesn't exist
    await client.query(`
      ALTER TABLE vendors 
      ADD COLUMN IF NOT EXISTS top_vendor BOOLEAN DEFAULT false
    `);
    
    console.log('✅ Successfully added top_vendor column to vendors table');
  } catch (error) {
    console.error('❌ Error adding top_vendor column:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run migration
addTopVendorColumn()
  .then(() => {
    console.log('✅ Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
