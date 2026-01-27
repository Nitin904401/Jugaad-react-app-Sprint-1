import { Request, Response, NextFunction } from "express";

export const requireRole =
  (role: "admin" | "vendor" | "customer" | Array<"admin" | "vendor" | "customer">) =>
  (req: any, res: Response, next: NextFunction) => {
    const roles = Array.isArray(role) ? role : [role];
    
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. This resource requires ${roles.join(' or ')} privileges.` 
      });
    }
    next();
  };
