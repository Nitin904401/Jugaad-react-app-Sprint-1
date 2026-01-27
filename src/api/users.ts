const API_BASE_URL = "http://localhost:5050";

export type User = {
  id: number;
  name: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_BASE_URL}/api/users`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};
