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
        images[1] as image
      FROM products
      WHERE featured = true AND status = 'approved'
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
      "SELECT id, name, price, brand, category, images[1] as image, part_number FROM products WHERE status = 'approved' ORDER BY id ASC"
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
      "SELECT * FROM products WHERE id = $1 AND status = 'approved'",
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
  image: row.images ? row.images[0] : null,
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
    
    // Handle status: admin can set any status, vendors can save as draft or submit for review
    let productStatus = 'pending_review'; // default
    if (req.user?.role === 'admin') {
      productStatus = status || 'approved';
    } else if (status === 'draft') {
      productStatus = 'draft';
    } else {
      productStatus = 'pending_review'; // when vendor submits for review
    }
    
    console.log('📦 Creating product:', { name, vendor_id, productStatus, userRole: req.user?.role, requestedStatus: status });

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
      compatible_models,
      description,
      status,
      material,
      weight,
      position,
      low_stock_threshold,
      upc_barcode,
      supplier
    } = req.body;

    console.log('📝 Updating product:', id, 'Compatible vehicles:', compatible_vehicles);

    // Build dynamic query based on what fields are provided
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (sku !== undefined) {
      updates.push(`sku = $${paramIndex++}`);
      values.push(sku);
    }
    if (oem_reference !== undefined) {
      updates.push(`oem_reference = $${paramIndex++}`);
      values.push(oem_reference);
    }
    if (category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      values.push(category);
    }
    if (brand !== undefined) {
      updates.push(`brand = $${paramIndex++}`);
      values.push(brand);
    }
    if (mrp !== undefined) {
      updates.push(`mrp = $${paramIndex++}`);
      values.push(mrp);
    }
    if (price !== undefined) {
      updates.push(`price = $${paramIndex++}`);
      values.push(price);
    }
    if (quantity_in_stock !== undefined) {
      updates.push(`quantity_in_stock = $${paramIndex++}`);
      values.push(quantity_in_stock);
    }
    if (brand_type !== undefined) {
      updates.push(`brand_type = $${paramIndex++}`);
      values.push(brand_type);
    }
    if (condition !== undefined) {
      updates.push(`condition = $${paramIndex++}`);
      values.push(condition);
    }
    if (images !== undefined) {
      updates.push(`images = $${paramIndex++}`);
      values.push(images);
    }
    if (compatible_vehicles !== undefined) {
      updates.push(`compatible_vehicles = $${paramIndex++}`);
      values.push(JSON.stringify(compatible_vehicles));
    } else if (compatible_models !== undefined) {
      updates.push(`compatible_vehicles = $${paramIndex++}`);
      values.push(JSON.stringify({ models: compatible_models }));
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(status);
    }
    if (material !== undefined) {
      updates.push(`material = $${paramIndex++}`);
      values.push(material);
    }
    if (weight !== undefined) {
      updates.push(`weight = $${paramIndex++}`);
      values.push(weight);
    }
    if (position !== undefined) {
      updates.push(`position = $${paramIndex++}`);
      values.push(position);
    }
    if (low_stock_threshold !== undefined) {
      updates.push(`low_stock_threshold = $${paramIndex++}`);
      values.push(low_stock_threshold);
    }
    if (upc_barcode !== undefined) {
      updates.push(`upc_barcode = $${paramIndex++}`);
      values.push(upc_barcode);
    }
    if (supplier !== undefined) {
      updates.push(`supplier = $${paramIndex++}`);
      values.push(supplier);
    }

    // Always update the updated_at timestamp
    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    if (updates.length === 1) { // Only updated_at
      return res.status(400).json({ message: "No fields to update" });
    }

    values.push(id);
    const query = `UPDATE products SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    console.log('🔧 Update query:', query);
    console.log('🔧 Update values:', values);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log('✅ Product updated:', result.rows[0].id);

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
        material, weight, position, low_stock_threshold, upc_barcode, supplier,
        rejection_reason, featured,
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
      material: row.material,
      weight: row.weight,
      position: row.position,
      low_stock_threshold: row.low_stock_threshold,
      upc_barcode: row.upc_barcode,
      supplier: row.supplier,
      rejection_reason: row.rejection_reason,
      featured: row.featured,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));

    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching vendor products:', error);
    res.status(500).json({ message: "Failed to fetch vendor products" });
  }
};

// PUT /api/products/vendor/:id/featured
export const toggleFeaturedStatus = async (req: any, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const productId = parseInt(req.params.id);
    const { featured } = req.body;

    if (typeof featured !== 'boolean') {
      return res.status(400).json({ message: "Featured status must be a boolean" });
    }

    // Verify the product belongs to this vendor
    const productCheck = await pool.query(
      "SELECT id, vendor_id, status FROM products WHERE id = $1",
      [productId]
    );

    if (productCheck.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (productCheck.rows[0].vendor_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    // Only approved products can be marked as featured
    if (featured && productCheck.rows[0].status !== 'approved') {
      return res.status(400).json({ message: "Only approved products can be marked as featured" });
    }

    // Update featured status
    await pool.query(
      "UPDATE products SET featured = $1, updated_at = NOW() WHERE id = $2",
      [featured, productId]
    );

    console.log(`✅ Product ${productId} featured status updated to ${featured}`);

    res.json({ message: "Featured status updated successfully", featured });
  } catch (error) {
    console.error('❌ Error updating featured status:', error);
    res.status(500).json({ message: "Failed to update featured status" });
  }
};
