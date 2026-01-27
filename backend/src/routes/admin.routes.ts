import { Router } from "express";
import { adminLogin, adminLogout, adminProfile } from "../controllers/admin.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", adminLogin);
router.post("/logout", requireAuth, adminLogout);
router.get("/profile", requireAuth, adminProfile);

export default router;
