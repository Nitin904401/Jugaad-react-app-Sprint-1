import { Router } from "express";
import multer from "multer";
import path from "path";
import { requireAuth } from "../middleware/auth.middleware";
import {
  getUserVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller";

// Configure multer for vehicle image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/vehicle-images/");
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "vehicle-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
});

const router = Router();

router.get("/", requireAuth, getUserVehicles);
router.get("/:id", requireAuth, getVehicle);
router.post("/", requireAuth, upload.single("vehicle_image"), createVehicle);
router.put("/:id", requireAuth, upload.single("vehicle_image"), updateVehicle);
router.delete("/:id", requireAuth, deleteVehicle);

export default router;
