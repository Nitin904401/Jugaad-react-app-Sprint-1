import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);

export default app;
