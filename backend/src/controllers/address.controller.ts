import { Response } from "express";
import pool from "../config/db";

// Get all user addresses
export const getUserAddresses = async (req: any, res: Response) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT id, full_name, address_type, street_address, city, state, zip_code, country, is_primary 
       FROM addresses WHERE user_id = $1 ORDER BY is_primary DESC, created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};

// Get single address
export const getUserAddress = async (req: any, res: Response) => {
  const userId = req.user.id;
  const addressId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT id, full_name, address_type, street_address, city, state, zip_code, country, is_primary 
       FROM addresses WHERE id = $1 AND user_id = $2`,
      [addressId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch address" });
  }
};

// Create new address
export const createAddress = async (req: any, res: Response) => {
  const userId = req.user.id;
  const {
    full_name,
    address_type,
    street_address,
    city,
    state,
    zip_code,
    country,
    is_primary,
  } = req.body;

  if (!full_name || !street_address || !city || !state || !zip_code || !country) {
    return res.status(400).json({ message: "All address fields are required" });
  }

  try {
    // If setting as primary, unset other primary addresses
    if (is_primary) {
      await pool.query(
        `UPDATE addresses SET is_primary = false WHERE user_id = $1`,
        [userId]
      );
    }

    const result = await pool.query(
      `INSERT INTO addresses (user_id, full_name, address_type, street_address, city, state, zip_code, country, is_primary)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, full_name, address_type, street_address, city, state, zip_code, country, is_primary`,
      [
        userId,
        full_name,
        address_type || 'Home',
        street_address,
        city,
        state,
        zip_code,
        country,
        is_primary !== undefined ? is_primary : false,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Error creating address:", err);
    res.status(500).json({ 
      message: "Failed to create address",
      error: err.message
    });
  }
};

// Update address
export const updateUserAddress = async (req: any, res: Response) => {
  const userId = req.user.id;
  const addressId = req.params.id;
  const {
    full_name,
    address_type,
    street_address,
    city,
    state,
    zip_code,
    country,
    is_primary,
  } = req.body;

  if (!full_name || !street_address || !city || !state || !zip_code || !country) {
    return res.status(400).json({ message: "All address fields are required" });
  }

  try {
    // If setting as primary, unset other primary addresses
    if (is_primary) {
      await pool.query(
        `UPDATE addresses SET is_primary = false WHERE user_id = $1 AND id != $2`,
        [userId, addressId]
      );
    }

    const result = await pool.query(
      `UPDATE addresses SET
        full_name = $1,
        address_type = $2,
        street_address = $3,
        city = $4,
        state = $5,
        zip_code = $6,
        country = $7,
        is_primary = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9 AND user_id = $10
      RETURNING id, full_name, address_type, street_address, city, state, zip_code, country, is_primary`,
      [
        full_name,
        address_type || 'Home',
        street_address,
        city,
        state,
        zip_code,
        country,
        is_primary !== undefined ? is_primary : false,
        addressId,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    console.error("Error updating address:", err);
    res.status(500).json({ 
      message: "Failed to update address",
      error: err.message
    });
  }
};

// Delete address
export const deleteAddress = async (req: any, res: Response) => {
  const userId = req.user.id;
  const addressId = req.params.id;

  try {
    const result = await pool.query(
      `DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING id`,
      [addressId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err: any) {
    console.error("Error deleting address:", err);
    res.status(500).json({ 
      message: "Failed to delete address",
      error: err.message
    });
  }
};
