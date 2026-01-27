import pool from "./config/db";

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB Connected:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
}

testConnection();
