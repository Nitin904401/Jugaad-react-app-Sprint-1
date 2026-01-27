import pool from "../config/db";

async function addProfilePictureToUsers() {
  try {
    // Check if column already exists
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND column_name = 'profile_picture'
    `);

    if (checkColumn.rows.length > 0) {
      console.log("✅ profile_picture column already exists in users table");
      process.exit(0);
    }

    // Add profile_picture column
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN profile_picture TEXT
    `);

    console.log("✅ Successfully added profile_picture column to users table");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

addProfilePictureToUsers();
