import pool from '../config/db';

async function addUnpublishedStatus() {
  try {
    console.log('🔄 Adding unpublished status to products table...');

    // Drop the old constraint
    await pool.query(`
      ALTER TABLE products 
      DROP CONSTRAINT IF EXISTS products_status_check;
    `);

    // Add the new constraint with unpublished
    await pool.query(`
      ALTER TABLE products 
      ADD CONSTRAINT products_status_check 
      CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'unpublished'));
    `);

    console.log('✅ Successfully added unpublished status to check constraint');
  } catch (error) {
    console.error('❌ Error adding unpublished status:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

addUnpublishedStatus();
