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
