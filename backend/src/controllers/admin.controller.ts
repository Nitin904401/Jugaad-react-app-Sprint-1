import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";

const JWT_SECRET = process.env.JWT_SECRET!;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check in users table with role 'admin'
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND role = 'admin'",
      [email]
    );

    const admin = result.rows[0];

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Check if admin account is blocked
    if (admin.status === 'blocked') {
      return res.status(403).json({ message: "Your admin account has been blocked. Please contact support." });
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("admin_token", token, cookieOptions).json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: "admin",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const adminLogout = (_req: Request, res: Response) => {
  res.clearCookie("admin_token", cookieOptions);
  res.json({ message: "Logged out" });
};

export const adminProfile = async (req: any, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, profile_picture FROM users WHERE id = $1",
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const adminUpdateProfile = async (req: any, res: Response) => {
  const { name, email, delete_profile_picture } = req.body;
  const adminId = req.user.id;

  try {
    let profilePictureValue: string | null = undefined as any;
    let shouldUpdateProfilePicture = false;

    // Handle profile picture deletion
    if (delete_profile_picture === "true") {
      profilePictureValue = null;
      shouldUpdateProfilePicture = true;
    } else if (req.file) {
      // New profile picture uploaded
      profilePictureValue = `/uploads/${req.file.filename}`;
      shouldUpdateProfilePicture = true;
    }

    // Build update query dynamically
    const updateFields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updateFields.push(`name = $${paramIndex++}`);
      values.push(name);
    }

    if (email !== undefined) {
      updateFields.push(`email = $${paramIndex++}`);
      values.push(email);
    }

    if (shouldUpdateProfilePicture) {
      updateFields.push(`profile_picture = $${paramIndex++}`);
      values.push(profilePictureValue);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    values.push(adminId);
    const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING id, name, email, role, profile_picture`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const adminUpdatePassword = async (req: any, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Current password and new password are required" });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: "New password must be at least 8 characters long" });
  }

  try {
    // Get current admin password
    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1 AND role = 'admin'",
      [adminId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = result.rows[0];

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, admin.password);

    if (!isValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, adminId]
    );

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update password" });
  }
};
