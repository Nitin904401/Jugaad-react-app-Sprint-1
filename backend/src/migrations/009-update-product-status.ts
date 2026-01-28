import pool from '../config/db';

async function updateProductStatus() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Drop existing constraint
    await client.query(`
      ALTER TABLE products 
      DROP CONSTRAINT IF EXISTS products_status_check
    `);
    
    console.log('✅ Dropped old status constraint');
    
    // Add new constraint with approval statuses
    await client.query(`
      ALTER TABLE products 
      ADD CONSTRAINT products_status_check 
      CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'archived'))
    `);
    
    console.log('✅ Added new status constraint');
    
    // Add rejection reason column
    await client.query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS rejection_reason TEXT
    `);
    
    console.log('✅ Added rejection_reason column');
    
    await client.query('COMMIT');
    console.log('🎉 Product status migration completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error updating product status:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

updateProductStatus();
