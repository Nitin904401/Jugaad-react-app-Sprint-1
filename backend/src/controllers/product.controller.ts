import { Request, Response } from "express";
import pool from "../config/db";

// GET /api/products/featured
export const getFeaturedProducts = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
     SELECT
        id,
        name,
        price,
        brand,
        category,
        image
      FROM products
      WHERE featured = true
      ORDER BY id ASC
      LIMIT 4;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch featured products" });
  }
};

// GET /api/products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    // Only show approved products to public
    const result = await pool.query(
      "SELECT * FROM products WHERE status = 'approved' ORDER BY id ASC"
    );

    const products = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      price: row.price,
      brand: row.brand,
      category: row.category,
      image: row.image,
      partNumber: row.part_number,
    }));

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("🔍 Getting product by ID:", id);

  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

   const row = result.rows[0];

res.json({
  id: row.id,
  name: row.name,
  price: row.price,
  brand: row.brand,
  category: row.category,
  image: row.image,
  partNumber: row.part_number,
  description: row.description,
  voltage: row.voltage,
  amperage: row.amperage,
  pulleyType: row.pulley_type,
  housing: row.housing,
  warranty: row.warranty,
  delivery: row.delivery,
  rating: row.rating,
  reviewsCount: row.reviews_count,
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// POST /api/products - Create a new product
export const createProduct = async (req: any, res: Response) => {
  try {
    const {
      name,
      sku,
      oem_reference,
      category,
      brand,
      mrp,
      price,
      quantity_in_stock,
      brand_type,
      condition,
      images,
      compatible_vehicles,
      description,
      status
    } = req.body;

    console.log('📦 Creating product with description:', description);

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({ 
        message: "Missing required fields: name, price, and category are required" 
      });
    }

    // Get vendor_id from authenticated user
    const vendor_id = req.user?.id || null;
    
    // New products go to pending_review unless admin is creating them
    const productStatus = req.user?.role === 'admin' ? (status || 'approved') : 'pending_review';
    
    console.log('📦 Creating product:', { name, vendor_id, productStatus, userRole: req.user?.role });

    const result = await pool.query(
      `INSERT INTO products (
        name, sku, oem_reference, category, brand, mrp, price, 
        quantity_in_stock, brand_type, condition, images, 
        compatible_vehicles, description, vendor_id, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP)
      RETURNING *`,
      [
        name,
        sku,
        oem_reference,
        category,
        brand,
        mrp || null,
        price,
        quantity_in_stock || 0,
        brand_type || 'OEM',
        condition || 'New',
        images || [],
        compatible_vehicles ? JSON.stringify(compatible_vehicles) : null,
        description,
        vendor_id,
        productStatus
      ]
    );

    const product = result.rows[0];
    
    console.log('✅ Product created:', product.id);
    
    res.status(201).json({
      message: "Product created successfully",
      product: {
        id: product.id,
        name: product.name,
        sku: product.sku,
        oem_reference: product.oem_reference,
        category: product.category,
        brand: product.brand,
        mrp: product.mrp,
        price: product.price,
        quantity_in_stock: product.quantity_in_stock,
        brand_type: product.brand_type,
        condition: product.condition,
        images: product.images,
        compatible_vehicles: product.compatible_vehicles,
        description: product.description,
        vendor_id: product.vendor_id,
        status: product.status,
        created_at: product.created_at
      }
    });

  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({ message: "Failed to create product", error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// PUT /api/products/:id - Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const {
      name,
      sku,
      oem_reference,
      category,
      brand,
      mrp,
      price,
      quantity_in_stock,
      brand_type,
      condition,
      images,
      compatible_vehicles,
      description,
      status
    } = req.body;

    const result = await pool.query(
      `UPDATE products SET 
        name = COALESCE($1, name),
        sku = COALESCE($2, sku),
        oem_reference = COALESCE($3, oem_reference),
        category = COALESCE($4, category),
        brand = COALESCE($5, brand),
        mrp = COALESCE($6, mrp),
        price = COALESCE($7, price),
        quantity_in_stock = COALESCE($8, quantity_in_stock),
        brand_type = COALESCE($9, brand_type),
        condition = COALESCE($10, condition),
        images = COALESCE($11, images),
        compatible_vehicles = COALESCE($12, compatible_vehicles),
        description = COALESCE($13, description),
        status = COALESCE($14, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $15
      RETURNING *`,
      [
        name,
        sku,
        oem_reference,
        category,
        brand,
        mrp,
        price,
        quantity_in_stock,
        brand_type,
        condition,
        images,
        compatible_vehicles ? JSON.stringify(compatible_vehicles) : null,
        description,
        status,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: result.rows[0]
    });

  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// DELETE /api/products/:id - Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// GET /api/products/vendor/my-products - Get products for the logged-in vendor
export const getVendorProducts = async (req: any, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    console.log('🔍 Getting products for vendor ID:', req.user.id);

    const result = await pool.query(
      `SELECT 
        id, name, sku, oem_reference, category, brand, mrp, price, 
        quantity_in_stock, brand_type, condition, images, 
        compatible_vehicles, description, status, vendor_id,
        created_at, updated_at
      FROM products 
      WHERE vendor_id = $1 
      ORDER BY created_at DESC`,
      [req.user.id]
    );

    console.log(`✅ Found ${result.rows.length} products for vendor`);

    const products = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      sku: row.sku,
      oem_reference: row.oem_reference,
      category: row.category,
      brand: row.brand,
      mrp: row.mrp,
      price: row.price,
      quantity_in_stock: row.quantity_in_stock,
      brand_type: row.brand_type,
      condition: row.condition,
      images: row.images,
      compatible_vehicles: row.compatible_vehicles,
      description: row.description,
      status: row.status,
      vendor_id: row.vendor_id,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));

    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching vendor products:', error);
    res.status(500).json({ message: "Failed to fetch vendor products" });
  }
};

