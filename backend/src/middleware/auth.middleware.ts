import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/db";

const JWT_SECRET = process.env.JWT_SECRET!;

export const requireAuth = async (req: any, res: Response, next: NextFunction) => {
  // Check if this is an admin route
  const isAdminRoute = req.originalUrl.includes('/api/admin');
  
  // Check if this is a vendor route (profile, settings, etc.)
  const isVendorRoute = req.path.includes('/vendor') || req.originalUrl.includes('/vendor');
  
  // Get token based on route type - vendor routes prefer vendor_token
  let token;
  if (isVendorRoute && !isAdminRoute) {
    token = req.cookies?.vendor_token || req.cookies?.token;
  } else if (isAdminRoute) {
    token = req.cookies?.admin_token || req.cookies?.token;
  } else {
    token = req.cookies?.token || req.cookies?.vendor_token || req.cookies?.admin_token;
  }
  
  // Log for debugging
  console.log('🔐 Auth check:', { 
    url: req.originalUrl, 
    isAdminRoute, 
    isVendorRoute,
    hasToken: !!token,
    usingToken: token === req.cookies?.vendor_token ? 'vendor' : token === req.cookies?.admin_token ? 'admin' : 'regular',
    cookies: Object.keys(req.cookies || {})
  });

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // For vendor-specific routes OR if using vendor_token, MUST have vendor data
    if ((isVendorRoute && !isAdminRoute) || token === req.cookies?.vendor_token) {
      // Fetch vendor data from vendors table
      const result = await pool.query(
        "SELECT id, name, email, company_name, business_type, description, phone_number, address, city, state, country, postal_code, website, currency, tax_id, status, bank_account_holder, bank_routing_number, bank_account_number, bank_name, pan_document, cheque_document, profile_picture, created_at FROM vendors WHERE id = $1",
        [decoded.id]
      );

      const vendor = result.rows[0];
      if (!vendor) {
        return res.status(401).json({ message: "Vendor not found" });
      }

      req.user = { ...vendor, role: 'vendor' };
      return next();
    }
    
    // For other routes (admin, products, etc.), check users table
    const result = await pool.query(
      "SELECT id, name, email, role, phone_number, created_at FROM users WHERE id = $1",
      [decoded.id]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // For admin routes, verify the user role is admin
    if (isAdminRoute && user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
