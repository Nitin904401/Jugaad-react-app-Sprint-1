import { Pool } from 'pg';

export async function up(pool: Pool): Promise<void> {
  await pool.query(`
    ALTER TABLE vendors
    ADD COLUMN IF NOT EXISTS profile_picture TEXT;
  `);
  console.log('✅ Added profile_picture column to vendors table');
}

export async function down(pool: Pool): Promise<void> {
  await pool.query(`
    ALTER TABLE vendors
    DROP COLUMN IF EXISTS profile_picture;
  `);
  console.log('✅ Removed profile_picture column from vendors table');
}
