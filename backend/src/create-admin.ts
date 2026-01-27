import pool from "./config/db";
import bcrypt from "bcryptjs";

async function createAdmin() {
  const email = "admin@test.com";
  const password = "123456"; // Change this to a secure password
  const name = "Admin User";

  try {
    // Check if admin already exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      console.log("⚠️  Admin user already exists with email:", email);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin user
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, phone_number) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, "admin", null]
    );

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email:", result.rows[0].email);
    console.log("🔑 Password:", password);
    console.log("👤 Role:", result.rows[0].role);
    console.log("\n⚠️  IMPORTANT: Change the password after first login!");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
}

createAdmin();
