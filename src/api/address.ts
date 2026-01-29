export interface Address {
  id?: number;
  full_name: string;
  address_type: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_primary?: boolean;
}

// Get all user addresses
export const getUserAddresses = async (): Promise<Address[]> => {
  const res = await fetch("/api/address", {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch addresses");
  }
  return res.json();
};

// Get single address
export const getUserAddress = async (id: number): Promise<Address> => {
  const res = await fetch(`/api/address/${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch address");
  }
  return res.json();
};

// Create new address
export const createAddress = async (data: Address): Promise<Address> => {
  const res = await fetch("/api/address", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create address");
  }
  return res.json();
};

// Update address
export const updateUserAddress = async (id: number, data: Address): Promise<Address> => {
  const res = await fetch(`/api/address/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update address");
  }
  return res.json();
};

// Delete address
export const deleteAddress = async (id: number): Promise<void> => {
  const res = await fetch(`/api/address/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete address");
  }
};
