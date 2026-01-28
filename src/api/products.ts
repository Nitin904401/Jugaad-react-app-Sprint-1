const API_BASE_URL = "http://localhost:5050";

export interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  category: string;
  image: string;
  partNumber?: string;

  description?: string;
  voltage?: string;
  amperage?: string;
  pulleyType?: string;
  housing?: string;

  warranty?: string;
  delivery?: string;
  rating?: number;
  reviewsCount?: number;
}

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE_URL}/api/products/featured`);

  if (!res.ok) {
    throw new Error("Failed to fetch featured products");
  }

  return res.json();
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE_URL}/api/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  
  // Map snake_case fields from API to camelCase for frontend
  return data.map((product: any) => ({
    ...product,
    partNumber: product.part_number || product.partNumber,
  }));
};

export const fetchProductById = async (
  productId: string | number
): Promise<Product> => {
  const res = await fetch(
    `${API_BASE_URL}/api/products/${productId}`
  );

  if (!res.ok) {
    throw new Error("Product not found");
  }

  const data = await res.json();
  
  // Map snake_case fields from API to camelCase for frontend
  return {
    ...data,
    partNumber: data.part_number || data.partNumber,
  };
};

// Create a new product
export interface CreateProductData {
  name: string;
  sku?: string;
  oem_reference?: string;
  category: string;
  brand?: string;
  mrp?: number;
  price: number;
  quantity_in_stock?: number;
  brand_type?: string;
  condition?: string;
  images?: string[];
  compatible_vehicles?: any[];
  description?: string;
  status?: 'draft' | 'published';
}

export const createProduct = async (data: CreateProductData): Promise<any> => {
  const res = await fetch(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create product');
  }

  return res.json();
};

// Update a product
export const updateProduct = async (
  id: number,
  data: Partial<CreateProductData>
): Promise<any> => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update product');
  }

  return res.json();
};

// Delete a product
export const deleteProduct = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete product');
  }
};

// Get vendor's own products
export const fetchVendorProducts = async (): Promise<any[]> => {
  const res = await fetch(`${API_BASE_URL}/api/products/vendor/my-products`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch vendor products');
  }

  return res.json();
};
