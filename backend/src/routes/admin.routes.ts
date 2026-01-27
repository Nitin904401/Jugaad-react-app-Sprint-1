import { Router } from "express";
import { adminLogin, adminLogout, adminProfile, adminUpdateProfile } from "../controllers/admin.controller";
import { requireAuth } from "../middleware/auth.middleware";
import multer from "multer";
import path from "path";

const router = Router();

// Multer configuration for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "admin-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post("/login", adminLogin);
router.post("/logout", requireAuth, adminLogout);
router.get("/profile", requireAuth, adminProfile);
router.put("/profile", requireAuth, upload.single("profile_picture"), adminUpdateProfile);

export default router;
