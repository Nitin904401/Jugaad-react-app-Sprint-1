import { Response } from "express";
import pool from "../config/db";

// Get all vehicles for a user
export const getUserVehicles = async (req: any, res: Response) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT * FROM vehicles WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
};

// Get a single vehicle
export const getVehicle = async (req: any, res: Response) => {
  const userId = req.user.id;
  const vehicleId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT * FROM vehicles WHERE id = $1 AND user_id = $2`,
      [vehicleId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vehicle" });
  }
};

// Create a new vehicle
export const createVehicle = async (req: any, res: Response) => {
  const userId = req.user.id;
  const {
    year,
    make,
    model,
    variant,
    license_plate,
    fuel_type,
    transmission,
    engine_size,
    vehicle_nickname,
  } = req.body;

  const vehicle_image = req.file ? `/uploads/vehicle-images/${req.file.filename}` : null;

  if (!year || !make || !model) {
    return res.status(400).json({ message: "Year, make, and model are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO vehicles (
        user_id, year, make, model, variant, license_plate, 
        fuel_type, transmission, engine_size, vehicle_nickname, vehicle_image
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        userId,
        year,
        make,
        model,
        variant || null,
        license_plate || null,
        fuel_type || null,
        transmission || null,
        engine_size || null,
        vehicle_nickname || null,
        vehicle_image,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Error creating vehicle:", err);
    console.error("Error details:", {
      message: err.message,
      detail: err.detail,
      code: err.code,
    });
    res.status(500).json({ 
      message: "Failed to create vehicle",
      error: err.message,
      detail: err.detail
    });
  }
};

// Update a vehicle
export const updateVehicle = async (req: any, res: Response) => {
  const userId = req.user.id;
  const vehicleId = req.params.id;
  const {
    year,
    make,
    model,
    variant,
    license_plate,
    fuel_type,
    transmission,
    engine_size,
    vehicle_nickname,
  } = req.body;

  const vehicle_image = req.file ? `/uploads/vehicle-images/${req.file.filename}` : undefined;

  if (!year || !make || !model) {
    return res.status(400).json({ message: "Year, make, and model are required" });
  }

  try {
    // Build update query dynamically to only update image if provided
    let query = `UPDATE vehicles SET 
      year = $1, 
      make = $2, 
      model = $3, 
      variant = $4, 
      license_plate = $5,
      fuel_type = $6,
      transmission = $7,
      engine_size = $8,
      vehicle_nickname = $9`;
    
    const params: any[] = [
      year,
      make,
      model,
      variant || null,
      license_plate || null,
      fuel_type || null,
      transmission || null,
      engine_size || null,
      vehicle_nickname || null,
    ];

    if (vehicle_image) {
      query += `, vehicle_image = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 AND user_id = $12`;
      params.push(vehicle_image, vehicleId, userId);
    } else {
      query += `, updated_at = CURRENT_TIMESTAMP WHERE id = $10 AND user_id = $11`;
      params.push(vehicleId, userId);
    }

    query += ` RETURNING *`;

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update vehicle" });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req: any, res: Response) => {
  const userId = req.user.id;
  const vehicleId = req.params.id;

  try {
    const result = await pool.query(
      `DELETE FROM vehicles WHERE id = $1 AND user_id = $2 RETURNING id`,
      [vehicleId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete vehicle" });
  }
};
