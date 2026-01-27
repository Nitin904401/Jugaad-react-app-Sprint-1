import { Request, Response } from "express";
import pool from "../config/db";

// Get all users (customers and vendors)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usersQuery = await pool.query(`
      SELECT id, name, email, role, status, created_at 
      FROM users 
      WHERE role IN ('customer', 'vendor')
      ORDER BY created_at DESC
    `);

    res.json(usersQuery.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Update user status (block/unblock)
export const updateUserStatus = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status } = req.body;

  if (!status || !['active', 'blocked'].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Must be 'active' or 'blocked'" });
  }

  try {
    const result = await pool.query(
      `UPDATE users 
       SET status = $1 
       WHERE id = $2 AND role IN ('customer', 'vendor')
       RETURNING id, name, email, role, status`,
      [status, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user status" });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM users 
       WHERE id = $1 AND role IN ('customer', 'vendor')
       RETURNING id, name, email`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found or cannot be deleted" });
    }

    res.json({ 
      message: "User deleted successfully", 
      user: result.rows[0] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
