import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db";
import { signToken } from "../utils/jwt";

const isDevelopment = process.env.NODE_ENV !== "production";

const cookieOptions = {
  httpOnly: true,
  sameSite: isDevelopment ? ("lax" as const) : ("none" as const),
  secure: !isDevelopment,
  path: "/",
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, phone_number)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, role, phone_number`,
      [name, email, hashed, role, null]
    );

    const user = result.rows[0];
    const token = signToken({ id: user.id, role: user.role });

    res.cookie("token", token, cookieOptions).json(user);
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ id: user.id, role: user.role });

  res.cookie("token", token, cookieOptions).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone_number: user.phone_number,
  });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Logged out" });
};

export const me = (req: any, res: Response) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    phone_number: req.user.phone_number,
    created_at: req.user.created_at,
  });
};

export const updateProfile = async (req: any, res: Response) => {
  const { name, phone_number } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE users SET name = $1, phone_number = $2 WHERE id = $3
       RETURNING id, name, email, role, phone_number`,
      [name, phone_number || null, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
