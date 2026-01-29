// Vehicle API functions
export const getVehicles = async () => {
  const res = await fetch("/api/vehicles", {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch vehicles");
  }
  return res.json();
};

export const getVehicle = async (id: string) => {
  const res = await fetch(`/api/vehicles/${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch vehicle");
  }
  return res.json();
};

export const createVehicle = async (data: {
  year: string;
  make: string;
  model: string;
  variant?: string;
  license_plate?: string;
  fuel_type?: string;
  transmission?: string;
  engine_size?: string;
  vehicle_nickname?: string;
}) => {
  const res = await fetch("/api/vehicles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create vehicle");
  }
  return res.json();
};

export const updateVehicle = async (
  id: string,
  data: {
    year: string;
    make: string;
    model: string;
    variant?: string;
    license_plate?: string;
    fuel_type?: string;
    transmission?: string;
    engine_size?: string;
    vehicle_nickname?: string;
  }
) => {
  const res = await fetch(`/api/vehicles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update vehicle");
  }
  return res.json();
};

export const deleteVehicle = async (id: string) => {
  const res = await fetch(`/api/vehicles/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete vehicle");
  }
  return res.json();
};

// Mock functions for vehicle selector
export const getCarMakes = async (): Promise<string[]> => {
  return ["BMW", "Mercedes-Benz", "Audi", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Volkswagen", "Hyundai"];
};

export const getCarModels = async (make: string): Promise<string[]> => {
  const models: Record<string, string[]> = {
    "BMW": ["M4", "M3", "X5", "3 Series", "5 Series"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLC"],
    "Audi": ["A4", "A6", "Q5", "Q7", "R8"],
    "Toyota": ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"],
    "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
    "Ford": ["F-150", "Mustang", "Explorer", "Escape", "Bronco"],
    "Chevrolet": ["Silverado", "Camaro", "Equinox", "Malibu", "Tahoe"],
    "Nissan": ["Altima", "Rogue", "Sentra", "Pathfinder", "Frontier"],
    "Volkswagen": ["Jetta", "Passat", "Tiguan", "Atlas", "Golf"],
    "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade"],
  };
  return models[make] || [];
};

export const getCarYears = async (make: string, model: string): Promise<number[]> => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year);
  }
  return years;
};
