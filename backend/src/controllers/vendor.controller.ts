import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db";
import { signToken } from "../utils/jwt";

type VendorRequest = Request & { files?: any };

const isDevelopment = process.env.NODE_ENV !== "production";

const cookieOptions = {
  httpOnly: true,
  sameSite: isDevelopment ? ("lax" as const) : ("none" as const),
  secure: !isDevelopment,
  path: "/",
};

export const vendorRegister = async (req: VendorRequest, res: Response) => {
  const {
    name,
    email,
    password,
    company_name,
    business_type,
    phone_number,
    legal_business_name,
    tax_id,
    address,
    city,
    postal_code,
    bank_account_holder,
    bank_name,
    bank_routing_number,
    bank_account_number,
  } = req.body;

  // Validate required fields
  if (!name || !email || !password || !company_name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hashed = await bcrypt.hash(password, 10);

  // Get file paths if files were uploaded
  const pan_document = req.files?.pan_document?.[0]?.path || null;
  const cheque_document = req.files?.cheque_document?.[0]?.path || null;

  try {
    const result = await pool.query(
      `INSERT INTO vendors (
        name, email, password, company_name, business_type, phone_number,
        legal_business_name, tax_id, address, city, postal_code,
        bank_account_holder, bank_name, bank_routing_number, bank_account_number,
        pan_document, cheque_document, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING id, name, email, company_name, business_type, phone_number, status, legal_business_name`,
      [
        name,
        email,
        hashed,
        company_name,
        business_type || null,
        phone_number || null,
        legal_business_name || null,
        tax_id || null,
        address || null,
        city || null,
        postal_code || null,
        bank_account_holder || null,
        bank_name || null,
        bank_routing_number || null,
        bank_account_number || null,
        pan_document,
        cheque_document,
        "pending",
      ]
    );

    const vendor = result.rows[0];
    const token = signToken({ id: vendor.id, role: "vendor" });

    res.cookie("vendor_token", token, cookieOptions).json({
      ...vendor,
      role: "vendor",
      message: "Registration submitted successfully. Awaiting verification.",
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const vendorLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM vendors WHERE email = $1",
      [email]
    );

    const vendor = result.rows[0];
    if (!vendor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if vendor account is blocked
    if (vendor.status === 'blocked') {
      return res.status(403).json({ message: "Your account has been blocked by admin. Please contact support." });
    }

    const match = await bcrypt.compare(password, vendor.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({ id: vendor.id, role: "vendor" });

    res.cookie("vendor_token", token, cookieOptions).json({
      id: vendor.id,
      name: vendor.name,
      email: vendor.email,
      company_name: vendor.company_name,
      business_type: vendor.business_type,
      phone_number: vendor.phone_number,
      role: "vendor",
      status: vendor.status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const vendorLogout = (_req: Request, res: Response) => {
  res.clearCookie("vendor_token", cookieOptions);
  res.json({ message: "Logged out" });
};

export const vendorMe = (req: any, res: Response) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    company_name: req.user.company_name,
    business_type: req.user.business_type,
    description: req.user.description,
    phone_number: req.user.phone_number,
    address: req.user.address,
    city: req.user.city,
    state: req.user.state,
    country: req.user.country,
    postal_code: req.user.postal_code,
    website: req.user.website,
    currency: req.user.currency,
    tax_id: req.user.tax_id,
    status: req.user.status,
    bank_account_holder: req.user.bank_account_holder,
    bank_routing_number: req.user.bank_routing_number,
    bank_account_number: req.user.bank_account_number,
    bank_name: req.user.bank_name,
    pan_document: req.user.pan_document,
    cheque_document: req.user.cheque_document,
    profile_picture: req.user.profile_picture,
    role: "vendor",
    created_at: req.user.created_at,
  });
};

export const vendorUpdateProfile = async (req: any, res: Response) => {
  const { 
    name, 
    email,
    phone_number, 
    company_name, 
    business_type,
    description,
    address,
    city,
    state,
    country,
    postal_code,
    website,
    currency
  } = req.body;
  const vendorId = req.user.id;
  
  // Handle profile picture upload or deletion
  let shouldUpdateProfilePicture = false;
  let profilePictureValue = null;
  
  if (req.file) {
    // New file uploaded
    shouldUpdateProfilePicture = true;
    profilePictureValue = `uploads/${req.file.filename}`;
  } else if (req.body.delete_profile_picture === 'true') {
    // Delete existing profile picture
    shouldUpdateProfilePicture = true;
    profilePictureValue = null;
  }

  if (!name || !company_name) {
    return res.status(400).json({ message: "Name and company name are required" });
  }

  try {
    let query, params;
    
    if (shouldUpdateProfilePicture) {
      // Update with profile picture (set or delete)
      query = `UPDATE vendors SET 
        name = $1, 
        email = $2,
        phone_number = $3, 
        company_name = $4, 
        business_type = $5,
        description = $6,
        address = $7,
        city = $8,
        state = $9,
        country = $10,
        postal_code = $11,
        website = $12,
        currency = $13,
        profile_picture = $14,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $15
       RETURNING id, name, email, company_name, business_type, description, phone_number, address, city, state, country, postal_code, website, currency, tax_id, status, profile_picture, created_at`;
      params = [
        name, 
        email || null,
        phone_number || null, 
        company_name, 
        business_type || null,
        description || null,
        address || null,
        city || null,
        state || null,
        country || null,
        postal_code || null,
        website || null,
        currency || null,
        profilePictureValue, // Can be URL string or null (for deletion)
        vendorId
      ];
    } else {
      // Don't update profile picture column
      query = `UPDATE vendors SET 
        name = $1, 
        email = $2,
        phone_number = $3, 
        company_name = $4, 
        business_type = $5,
        description = $6,
        address = $7,
        city = $8,
        state = $9,
        country = $10,
        postal_code = $11,
        website = $12,
        currency = $13,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $14
       RETURNING id, name, email, company_name, business_type, description, phone_number, address, city, state, country, postal_code, website, currency, tax_id, status, profile_picture, created_at`;
      params = [
        name, 
        email || null,
        phone_number || null, 
        company_name, 
        business_type || null,
        description || null,
        address || null,
        city || null,
        state || null,
        country || null,
        postal_code || null,
        website || null,
        currency || null,
        vendorId
      ];
    }
    
    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({
      ...result.rows[0],
      role: "vendor",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Update financial/bank information
export const vendorUpdateFinancial = async (req: Request, res: Response) => {
  const vendorId = (req as any).user?.id;

  if (!vendorId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const {
    bank_account_holder,
    bank_routing_number,
    bank_account_number,
    bank_name,
  } = req.body;

  // Get uploaded files if any
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  const chequeDoc = files?.cheque_document?.[0];
  const panDoc = files?.pan_document?.[0];

  try {
    // Build update query dynamically based on what's provided
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (bank_account_holder !== undefined) {
      updates.push(`bank_account_holder = $${paramCount++}`);
      values.push(bank_account_holder);
    }
    if (bank_routing_number !== undefined) {
      updates.push(`bank_routing_number = $${paramCount++}`);
      values.push(bank_routing_number);
    }
    if (bank_account_number !== undefined) {
      updates.push(`bank_account_number = $${paramCount++}`);
      values.push(bank_account_number);
    }
    if (bank_name !== undefined) {
      updates.push(`bank_name = $${paramCount++}`);
      values.push(bank_name);
    }
    if (chequeDoc) {
      updates.push(`cheque_document = $${paramCount++}`);
      values.push(chequeDoc.path);
    }
    if (panDoc) {
      updates.push(`pan_document = $${paramCount++}`);
      values.push(panDoc.path);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(vendorId);

    const query = `UPDATE vendors SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING id, bank_account_holder, bank_routing_number, bank_account_number, bank_name, cheque_document, pan_document`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({
      ...result.rows[0],
      role: "vendor",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update financial information" });
  }
};

// Submit financial information for verification
export const vendorSubmitFinancial = async (req: Request, res: Response) => {
  const vendorId = (req as any).user?.id;

  if (!vendorId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const {
    bank_account_holder,
    bank_routing_number,
    bank_account_number,
    bank_name,
  } = req.body;

  // Validate required fields
  if (!bank_account_holder || !bank_routing_number || !bank_account_number || !bank_name) {
    return res.status(400).json({ message: "All bank fields are required for verification" });
  }

  // Get uploaded files
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  const chequeDoc = files?.cheque_document?.[0];
  const panDoc = files?.pan_document?.[0];

  try {
    // First, check if documents are already uploaded or being uploaded now
    const vendorCheck = await pool.query(
      "SELECT pan_document, cheque_document FROM vendors WHERE id = $1",
      [vendorId]
    );

    if (vendorCheck.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const existingPan = vendorCheck.rows[0].pan_document;
    const existingCheque = vendorCheck.rows[0].cheque_document;

    if (!panDoc && !existingPan) {
      return res.status(400).json({ message: "PAN card document is required" });
    }
    if (!chequeDoc && !existingCheque) {
      return res.status(400).json({ message: "Cheque/Bank statement document is required" });
    }

    // Update all financial information and set status to pending (re-verification if needed)
    const result = await pool.query(
      `UPDATE vendors SET 
        bank_account_holder = $1,
        bank_routing_number = $2,
        bank_account_number = $3,
        bank_name = $4,
        cheque_document = COALESCE($5, cheque_document),
        pan_document = COALESCE($6, pan_document),
        status = 'pending',
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, bank_account_holder, bank_routing_number, bank_account_number, bank_name, cheque_document, pan_document, status`,
      [
        bank_account_holder,
        bank_routing_number,
        bank_account_number,
        bank_name,
        chequeDoc?.path || null,
        panDoc?.path || null,
        vendorId,
      ]
    );

    res.json({
      ...result.rows[0],
      role: "vendor",
      message: "Financial information submitted for verification successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit financial information" });
  }
};
