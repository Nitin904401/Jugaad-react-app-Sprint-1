export const vendorLogin = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch("/api/vendor/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }
  return res.json();
};

export const vendorRegister = async (data: FormData | any) => {
  // Check if data is FormData (has file uploads)
  const isFormData = data instanceof FormData;
  
  const res = await fetch("/api/vendor/auth/register", {
    method: "POST",
    headers: isFormData ? {} : { "Content-Type": "application/json" }, // Don't set Content-Type for FormData, browser will set it with boundary
    credentials: "include",
    body: isFormData ? data : JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }
  return res.json();
};

export const vendorGetMe = async () => {
  const res = await fetch("/api/vendor/auth/profile", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

export const vendorLogout = async () => {
  await fetch("/api/vendor/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const vendorUpdateProfile = async (data: {
  name: string;
  email: string;
  phone_number?: string;
  company_name: string;
  business_type?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  website?: string;
  currency?: string;
}) => {
  const res = await fetch("/api/vendor/auth/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Update failed");
  }
  return res.json();
};
