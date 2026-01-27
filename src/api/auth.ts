export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔥 REQUIRED
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }
  return res.json();
};

export const registerUser = async (data: any) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

export const getCurrentUser = async () => {
  const res = await fetch("/api/auth/current-user", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

export const logoutUser = async () => {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const updateProfile = async (data: {
  name: string;
  phone_number?: string;
}) => {
  const res = await fetch("/api/auth/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Update profile error:", errorData);
    throw new Error(errorData.message || "Update failed");
  }
  return res.json();
};
