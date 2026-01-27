import pool from "./config/db";
import bcrypt from "bcryptjs";

async function updateAdminPassword() {
  const name = "Nitin Gautam"; // Update by name instead
  const newPassword = "123456";

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password for admin user
    const result = await pool.query(
      `UPDATE users 
       SET password = $1 
       WHERE name = $2 AND role = 'admin'
       RETURNING id, name, email, role`,
      [hashedPassword, name]
    );

    if (result.rows.length === 0) {
      console.log("❌ Admin user not found with name:", name);
      process.exit(1);
    }

    console.log("✅ Password updated successfully!");
    console.log("📧 Email:", result.rows[0].email);
    console.log("🔑 New Password:", newPassword);
    console.log("👤 Role:", result.rows[0].role);
    console.log("👤 Name:", result.rows[0].name);
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to update password:", err);
    process.exit(1);
  }
}

updateAdminPassword();
