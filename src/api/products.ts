// Fake API for products
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  vendorLocation: string;
  image: string;
  category: string;
  stock: number;
  reviews: number;
  condition: string;
  delivery: string;
  warranty: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Toyota Corolla Engine Pulley OEM Genuine',
    price: 22000,
    originalPrice: 28000,
    vendorId: '1',
    vendorName: 'Premium Auto Parts',
    vendorRating: 4.8,
    vendorLocation: 'Delhi',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80',
    category: 'engine',
    stock: 15,
    reviews: 42,
    condition: 'New',
    delivery: '2-3 days',
    warranty: '2 Years'
  },
  {
    id: '2',
    title: 'Hyundai Santa Fe Automatic Transmission',
    price: 35000,
    originalPrice: 42000,
    vendorId: '2',
    vendorName: 'AutoMart',
    vendorRating: 4.6,
    vendorLocation: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    category: 'transmission',
    stock: 8,
    reviews: 30,
    condition: 'Used',
    delivery: '3-5 days',
    warranty: '1 Year'
  },
  {
    id: '3',
    title: 'Bosch Brake Pads Set',
    price: 3200,
    originalPrice: 4000,
    vendorId: '3',
    vendorName: 'Brake Masters',
    vendorRating: 4.9,
    vendorLocation: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    category: 'brakes',
    stock: 25,
    reviews: 55,
    condition: 'New',
    delivery: '1-2 days',
    warranty: '6 Months'
  },
  {
    id: '4',
    title: 'Alloy Wheel 16-inch',
    price: 7800,
    originalPrice: 9500,
    vendorId: '4',
    vendorName: 'Wheel World',
    vendorRating: 4.7,
    vendorLocation: 'Chennai',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80',
    category: 'wheels',
    stock: 12,
    reviews: 20,
    condition: 'New',
    delivery: '2-4 days',
    warranty: '1 Year'
  },
  {
    id: '5',
    title: 'Quick Spare Transmission',
    price: 135000,
    originalPrice: 165000,
    vendorId: '2',
    vendorName: 'Quick Spare Parts',
    vendorRating: 4.6,
    vendorLocation: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
    category: 'transmission',
    stock: 3,
    reviews: 28,
    condition: 'Used',
    delivery: '5-7 days',
    warranty: '1 Year'
  },
  {
    id: '3',
    title: 'Ford Endeavour EGR Valve',
    price: 8500,
    originalPrice: 10200,
    vendorId: '3',
    vendorName: 'Original Parts Hub',
    vendorRating: 4.7,
    vendorLocation: 'Bangalore',
    image: 'https://via.placeholder.com/300x200?text=EGR+Valve',
    category: 'exhaust',
    stock: 8,
    reviews: 35,
    condition: 'New',
    delivery: '1-2 days',
    warranty: '6 Months'
  },
  {
    id: '4',
    title: 'Toyota Fortuner Alloy Wheels with Tyres',
    price: 52000,
    originalPrice: 64000,
    vendorId: '4',
    vendorName: 'Budget Auto Store',
    vendorRating: 4.5,
    vendorLocation: 'Hyderabad',
    image: 'https://via.placeholder.com/300x200?text=Alloy+Wheels',
    category: 'wheels',
    stock: 5,
    reviews: 22,
    condition: 'New',
    delivery: '3-4 days',
    warranty: '3 Years'
  },
  {
    id: '5',
    title: 'Brake Booster Complete System',
    price: 18500,
    originalPrice: 22000,
    vendorId: '5',
    vendorName: 'Premium Auto Hub',
    vendorRating: 4.9,
    vendorLocation: 'Chennai',
    image: 'https://via.placeholder.com/300x200?text=Brake+Booster',
    category: 'brakes',
    stock: 12,
    reviews: 58,
    condition: 'New',
    delivery: '2-3 days',
    warranty: '18 Months'
  },
  {
    id: '6',
    title: 'Propeller Shaft Heavy Duty',
    price: 24000,
    originalPrice: 30000,
    vendorId: '1',
    vendorName: 'Premium Auto Parts',
    vendorRating: 4.8,
    vendorLocation: 'Delhi',
    image: 'https://via.placeholder.com/300x200?text=Propeller+Shaft',
    category: 'transmission',
    stock: 6,
    reviews: 33,
    condition: 'New',
    delivery: '4-5 days',
    warranty: '2 Years'
  }
];

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.find((p) => p.id === id));
    }, 300);
  });
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 400);
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.filter((p) => p.category === category));
    }, 400);
  });
};

export const getProductsByVendor = async (vendorId: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.filter((p) => p.vendorId === vendorId));
    }, 400);
  });
};
