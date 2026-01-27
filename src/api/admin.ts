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
