import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  getUserVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller";

const router = Router();

router.get("/", requireAuth, getUserVehicles);
router.get("/:id", requireAuth, getVehicle);
router.post("/", requireAuth, createVehicle);
router.put("/:id", requireAuth, updateVehicle);
router.delete("/:id", requireAuth, deleteVehicle);

export default router;
