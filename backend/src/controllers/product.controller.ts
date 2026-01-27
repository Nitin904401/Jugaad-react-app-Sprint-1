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
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
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

