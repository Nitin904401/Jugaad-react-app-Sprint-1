import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  vendorRegister,
  vendorLogin,
  vendorLogout,
  vendorMe,
  vendorUpdateProfile,
} from "../controllers/vendor.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/vendor-documents/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allow specific file types
  const allowedMimes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, JPEG, and PNG allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

router.post("/register", upload.fields([
  { name: "pan_document", maxCount: 1 },
  { name: "cheque_document", maxCount: 1 },
]), vendorRegister);
router.post("/login", vendorLogin);
router.post("/logout", vendorLogout);
router.get("/me", requireAuth, vendorMe);
router.put("/profile", requireAuth, vendorUpdateProfile);

export default router;
