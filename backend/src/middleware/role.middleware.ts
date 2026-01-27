import { Request, Response, NextFunction } from "express";

export const requireRole =
  (roles: Array<"admin" | "vendor" | "customer">) =>
  (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
