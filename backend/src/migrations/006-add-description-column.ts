import pool from "../config/db";

async function addDescriptionColumn() {
  try {
    // Check if column already exists
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'vendors' AND column_name = 'description'
    `);

    if (checkColumn.rows.length > 0) {
      console.log("Description column already exists");
      return;
    }

    // Add description column
    await pool.query(`
      ALTER TABLE vendors 
      ADD COLUMN description TEXT
    `);

    console.log("✅ Description column added successfully");
  } catch (error) {
    console.error("Error adding description column:", error);
  } finally {
    await pool.end();
  }
}

addDescriptionColumn();
