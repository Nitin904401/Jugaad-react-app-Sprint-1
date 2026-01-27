import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  getFeaturedProducts
} from "../controllers/product.controller";

const router = Router();

router.get("/", getAllProducts);
router.get("/test", (_req, res) => res.json({ message: "Test route works!" }));
router.get("/featured", getFeaturedProducts);
router.get("/:id", getProductById);

export default router;
