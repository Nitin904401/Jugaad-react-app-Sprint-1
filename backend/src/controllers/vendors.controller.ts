import { Request, Response } from "express";
import pool from "../config/db";

// Get all vendors (admin only)
export const getAllVendors = async (req: Request, res: Response) => {
  try {
    const vendorsQuery = await pool.query(`
      SELECT 
        id, 
        name, 
        email, 
        company_name,
        phone_number,
        status, 
        created_at 
      FROM vendors 
      ORDER BY created_at DESC
    `);

    res.json(vendorsQuery.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vendors" });
  }
};

// Get single vendor details (admin only)
export const getVendorById = async (req: Request, res: Response) => {
  const { vendorId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM vendors WHERE id = $1`,
      [vendorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const vendor = result.rows[0];
    // Remove password from response
    delete vendor.password;

    res.json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vendor details" });
  }
};

// Update vendor status (admin only)
export const updateVendorStatus = async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'approved', 'suspended', 'rejected'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ 
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
    });
  }

  try {
    const result = await pool.query(
      `UPDATE vendors 
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, name, email, status`,
      [status, vendorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update vendor status" });
  }
};

// Delete vendor (admin only)
export const deleteVendor = async (req: Request, res: Response) => {
  const { vendorId } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM vendors 
       WHERE id = $1
       RETURNING id, name, email`,
      [vendorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ 
      message: "Vendor deleted successfully", 
      vendor: result.rows[0] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete vendor" });
  }
};
