const API_BASE_URL = "http://localhost:5050";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_BASE_URL}/api/users`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const getAllUsers = async () => {
  const res = await fetch("/api/admin/users", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const updateUserStatus = async (userId: string, status: 'active' | 'blocked') => {
  const res = await fetch(`/api/admin/users/${userId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update user status");
  }
  return res.json();
};

export const deleteUser = async (userId: string) => {
  const res = await fetch(`/api/admin/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete user");
  }
  return res.json();
};
