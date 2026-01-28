import { Request, Response } from "express";
import pool from "../config/db";

// GET /api/admin/products - Get all products (including pending review)
export const getAllProductsAdmin = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        v.name as vendor_name,
        v.company_name as vendor_company
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      ORDER BY 
        CASE 
          WHEN p.status = 'pending_review' THEN 1
          WHEN p.status = 'draft' THEN 2
          WHEN p.status = 'approved' THEN 3
          WHEN p.status = 'rejected' THEN 4
          ELSE 5
        END,
        p.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET /api/admin/products/pending - Get products pending review
export const getPendingProducts = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        v.name as vendor_name,
        v.company_name as vendor_company,
        v.email as vendor_email
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      WHERE p.status = 'pending_review'
      ORDER BY p.created_at ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching pending products:', error);
    res.status(500).json({ message: "Failed to fetch pending products" });
  }
};

// PUT /api/admin/products/:id/approve - Approve a product
export const approveProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      `UPDATE products 
       SET status = 'approved', 
           updated_at = CURRENT_TIMESTAMP,
           rejection_reason = NULL
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log('✅ Product approved:', id);
    
    res.json({
      message: "Product approved successfully",
      product: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error approving product:', error);
    res.status(500).json({ message: "Failed to approve product" });
  }
};

// PUT /api/admin/products/:id/reject - Reject a product
export const rejectProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body;
  
  try {
    if (!reason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    const result = await pool.query(
      `UPDATE products 
       SET status = 'rejected', 
           rejection_reason = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [reason, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log('❌ Product rejected:', id, 'Reason:', reason);
    
    res.json({
      message: "Product rejected",
      product: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error rejecting product:', error);
    res.status(500).json({ message: "Failed to reject product" });
  }
};

// PUT /api/admin/products/:id/resubmit - Resubmit a rejected product for review
export const resubmitProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      `UPDATE products 
       SET status = 'pending_review', 
           rejection_reason = NULL,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log('🔄 Product resubmitted for review:', id);
    
    res.json({
      message: "Product resubmitted for review",
      product: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error resubmitting product:', error);
    res.status(500).json({ message: "Failed to resubmit product" });
  }
};

// GET /api/admin/products/:id - Get single product with full details
export const getProductByIdAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        v.name as vendor_name,
        v.company_name as vendor_company,
        v.email as vendor_email,
        v.phone_number as vendor_phone
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// GET /api/admin/products/approved - Get all approved products
export const getApprovedProducts = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        v.name as vendor_name,
        v.company_name as vendor_company
      FROM products p
      LEFT JOIN vendors v ON p.vendor_id = v.id
      WHERE p.status = 'approved'
      ORDER BY p.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching approved products:', error);
    res.status(500).json({ message: "Failed to fetch approved products" });
  }
};

// PUT /api/admin/products/:id/unpublish - Unpublish a product
export const unpublishProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body;
  
  try {
    if (!reason) {
      return res.status(400).json({ message: "Unpublish reason is required" });
    }

    // First check if product exists and is approved
    const checkResult = await pool.query(
      'SELECT status FROM products WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (checkResult.rows[0].status !== 'approved') {
      return res.status(400).json({ message: "Only approved products can be unpublished" });
    }

    const result = await pool.query(
      `UPDATE products 
       SET status = 'unpublished', 
           rejection_reason = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [reason, id]
    );

    console.log('🚫 Product unpublished:', id, 'Reason:', reason);
    
    res.json({
      message: "Product unpublished successfully",
      product: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error unpublishing product:', error);
    res.status(500).json({ message: "Failed to unpublish product" });
  }
};
