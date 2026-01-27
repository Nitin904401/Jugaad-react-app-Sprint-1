// Fake API for vendors
export interface Vendor {
  id: string;
  name: string;
  logo: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  description: string;
  founded: number;
  products: number;
  responseTime: string;
  followers: number;
  email: string;
  phone: string;
}

export interface AdminVendor {
  id: string;
  name: string;
  email: string;
  company_name: string;
  phone_number: string;
  status: string;
  created_at: string;
}

export interface VendorDetails {
  id: string;
  name: string;
  email: string;
  company_name: string;
  business_type: string;
  phone_number: string;
  legal_business_name: string;
  tax_id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  website: string;
  bank_account_holder: string;
  bank_name: string;
  bank_routing_number: string;
  bank_account_number: string;
  pan_document: string;
  cheque_document: string;
  status: string;
  created_at: string;
  updated_at: string;
  profile_picture: string;
}

// Admin API functions
export const getAllVendors = async (): Promise<AdminVendor[]> => {
  const res = await fetch("/api/admin/vendors", {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch vendors");
  }
  return res.json();
};

export const getVendorById = async (vendorId: string): Promise<VendorDetails> => {
  const res = await fetch(`/api/admin/vendors/${vendorId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch vendor details");
  }
  return res.json();
};

export const updateVendorStatus = async (vendorId: string, status: string) => {
  const res = await fetch(`/api/admin/vendors/${vendorId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update vendor status");
  }
  return res.json();
};

export const deleteVendor = async (vendorId: string) => {
  const res = await fetch(`/api/admin/vendors/${vendorId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete vendor");
  }
  return res.json();
};

const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Premium Auto Parts',
    logo: '🏢',
    location: 'Delhi',
    rating: 4.8,
    reviews: 1250,
    verified: true,
    description: 'India\'s leading supplier of genuine auto parts with 20+ years experience',
    founded: 2004,
    products: 25,
    responseTime: '2 hours',
    followers: 12500,
    email: 'contact@premiumautoparts.in',
    phone: '+919072779989'
  },
  {
    id: '2',
    name: 'Quick Spare Parts',
    logo: '⚡',
    location: 'Mumbai',
    rating: 4.6,
    reviews: 980,
    verified: true,
    description: 'Fast delivery and competitive pricing on all car parts',
    founded: 2010,
    products: 18,
    responseTime: '4 hours',
    followers: 8900,
    email: 'support@quickspare.in',
    phone: '+919876543210'
  },
  {
    id: '3',
    name: 'Original Parts Hub',
    logo: '✓',
    location: 'Bangalore',
    rating: 4.7,
    reviews: 1100,
    verified: true,
    description: 'Authentic parts directly from manufacturers',
    founded: 2008,
    products: 22,
    responseTime: '3 hours',
    followers: 10200,
    email: 'hello@originalpartshub.in',
    phone: '+918765432109'
  },
  {
    id: '4',
    name: 'Budget Auto Store',
    logo: '💰',
    location: 'Hyderabad',
    rating: 4.5,
    reviews: 750,
    verified: true,
    description: 'Affordable parts for budget-conscious customers',
    founded: 2015,
    products: 15,
    responseTime: '6 hours',
    followers: 6300,
    email: 'info@budgetauto.in',
    phone: '+919876543211'
  },
  {
    id: '5',
    name: 'Premium Auto Hub',
    logo: '👑',
    location: 'Chennai',
    rating: 4.9,
    reviews: 650,
    verified: true,
    description: 'Premium quality parts with excellent warranty',
    founded: 2012,
    products: 20,
    responseTime: '1 hour',
    followers: 9100,
    email: 'service@premiumautohub.in',
    phone: '+919876543212'
  }
];

export const getVendors = async (): Promise<Vendor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockVendors), 500);
  });
};

export const getMockVendorById = async (id: string): Promise<Vendor | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVendors.find((v) => v.id === id));
    }, 300);
  });
};

export const searchVendors = async (query: string): Promise<Vendor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockVendors.filter((v) =>
        v.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 400);
  });
};
