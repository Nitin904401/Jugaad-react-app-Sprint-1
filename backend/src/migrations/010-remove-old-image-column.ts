import pool from '../config/db';

async function removeOldImageColumn() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Starting migration: Remove old image column from products table...');

    // Check if old image column exists
    const checkColumn = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' 
      AND column_name = 'image'
    `);

    if (checkColumn.rows.length > 0) {
      // Remove the old single image column
      await client.query('ALTER TABLE products DROP COLUMN IF EXISTS image');
      console.log('✅ Removed old "image" column');
    } else {
      console.log('ℹ️  Column "image" does not exist, skipping...');
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

removeOldImageColumn()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
