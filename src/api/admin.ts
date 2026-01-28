export const adminLogin = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return res.json();
};

export const adminLogout = async () => {
  await fetch("/api/admin/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const getAdminProfile = async () => {
  const res = await fetch("/api/admin/profile", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

export const adminUpdateProfile = async (data: {
  name: string;
  email: string;
}) => {
  const res = await fetch("/api/admin/profile", {
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

export const adminUpdateProfileWithPicture = async (data: FormData) => {
  const res = await fetch("/api/admin/profile", {
    method: "PUT",
    credentials: "include",
    body: data,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Update failed");
  }
  return res.json();
};
export const adminUpdatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await fetch("/api/admin/update-password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update password");
  }
  return res.json();
};

export const getAllAdminProducts = async () => {
  const res = await fetch("/api/admin/products", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

export const approveProduct = async (productId: number) => {
  const res = await fetch(`/api/admin/products/${productId}/approve`, {
    method: "PUT",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to approve product");
  }
  return res.json();
};

export const rejectProduct = async (productId: number, reason: string) => {
  const res = await fetch(`/api/admin/products/${productId}/reject`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to reject product");
  }
  return res.json();
};

export const getApprovedProducts = async () => {
  const res = await fetch("/api/admin/products/approved", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch approved products");
  }
  return res.json();
};