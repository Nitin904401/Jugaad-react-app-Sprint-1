// Vendors/Sellers - Multi-Vendor Support
export const vendors = [
  {
    id: 1,
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
    image: 'https://via.placeholder.com/400x200?text=Premium+Auto+Parts'
  },
  {
    id: 2,
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
    image: 'https://via.placeholder.com/400x200?text=Quick+Spare+Parts'
  },
  {
    id: 3,
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
    image: 'https://via.placeholder.com/400x200?text=Original+Parts+Hub'
  },
  {
    id: 4,
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
    image: 'https://via.placeholder.com/400x200?text=Budget+Auto+Store'
  },
  {
    id: 5,
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
    image: 'https://via.placeholder.com/400x200?text=Premium+Auto+Hub'
  }
];

export const carMakes = [
  'Hyundai', 'Maruti Suzuki', 'Tata', 'Mahindra', 'Honda', 'Ford', 
  'Chevrolet', 'Toyota', 'Volkswagen', 'Skoda', 'Renault', 'Mercedes', 'Audi'
];

export const carModels = {
  'Hyundai': ['Creta', 'Venue', 'Aura', 'Grand i10', 'Santro'],
  'Maruti Suzuki': ['Swift', 'Alto', 'Celerio', 'Brezza', 'Vitara'],
  'Tata': ['Nexon', 'Tiago', 'Harrier', 'Altroz', 'Safari'],
  'Mahindra': ['Thar', 'XUV500', 'Bolero', 'Scorpio', 'KUV100'],
  'Honda': ['Jazz', 'City', 'CR-V', 'Brio', 'Amaze'],
  'Ford': ['Fiesta', 'Endeavour', 'EcoSport', 'Aspire', 'Figo'],
  'Toyota': ['Corolla', 'Fortuner', 'Innova', 'Glanza', 'Urban Cruiser'],
  'Skoda': ['Rapid', 'Superb', 'Laura', 'Yeti', 'Kodiaq'],
  'Mercedes': ['E-Class', 'C-Class', 'A-Class', 'GLC', 'GLE'],
  'Audi': ['Q5', 'A4', 'A6', 'Q3', 'A3'],
  'Volkswagen': ['Polo', 'Vento', 'Passat', 'Tiguan', 'T-Roc'],
  'Renault': ['Duster', 'Kwid', 'Lodgy', 'Pulse', 'Kiger']
};

export const partCategories = [
  { id: 'brakes', name: 'Brakes', icon: '🛑' },
  { id: 'engine', name: 'Engine Parts', icon: '⚙️' },
  { id: 'steering', name: 'Steering Wheels', icon: '🎯' },
  { id: 'wheels', name: 'Alloy Wheels', icon: '🔴' },
  { id: 'lights', name: 'Headlights', icon: '💡' },
  { id: 'interior', name: 'Interiors', icon: '🪑' },
  { id: 'transmission', name: 'Transmission', icon: '⚡' },
  { id: 'suspension', name: 'Suspension', icon: '🏎️' },
  { id: 'battery', name: 'Battery', icon: '🔋' },
  { id: 'exhaust', name: 'Exhaust Systems', icon: '💨' }
];

export const featuredParts = [
  {
    id: 1,
    title: 'Toyota Corolla Altis 2010 Engine Pulley OEM Genuine',
    price: '₹22,000',
    originalPrice: '₹28,000',
    availability: 'In Stock',
    condition: 'New',
    delivery: '2-3 days',
    warranty: '2 Years',
    image: 'https://via.placeholder.com/300x200?text=Engine+Pulley',
    vendorId: 1,
    vendorName: 'Premium Auto Parts',
    vendorRating: 4.8,
    vendorLocation: 'Delhi',
    category: 'engine',
    stock: 15,
    reviews: 42
  },
  {
    id: 2,
    title: 'Hyundai Santa Fe Automatic Transmission & Gearbox 4x4, 2015',
    price: '₹135,000',
    originalPrice: '₹165,000',
    availability: 'In Stock',
    condition: 'Used',
    delivery: '5-7 days',
    warranty: '1 Year',
    image: 'https://via.placeholder.com/300x200?text=Transmission',
    vendorId: 2,
    vendorName: 'Quick Spare Parts',
    vendorRating: 4.6,
    vendorLocation: 'Mumbai',
    category: 'transmission',
    stock: 3,
    reviews: 28
  },
  {
    id: 3,
    title: 'Ford Endeavour 2013 EGR Valve/Cooler, Exhaust Systems',
    price: '₹8,500',
    originalPrice: '₹10,200',
    availability: 'In Stock',
    condition: 'New',
    delivery: '1-2 days',
    warranty: '6 Months',
    image: 'https://via.placeholder.com/300x200?text=EGR+Valve',
    vendorId: 3,
    vendorName: 'Original Parts Hub',
    vendorRating: 4.7,
    vendorLocation: 'Bangalore',
    category: 'exhaust',
    stock: 8,
    reviews: 35
  },
  {
    id: 4,
    title: 'Toyota Fortuner 2022 Alloy Wheels with Tyres',
    price: '₹52,000',
    originalPrice: '₹64,000',
    availability: 'In Stock',
    condition: 'New',
    delivery: '3-4 days',
    warranty: '3 Years',
    image: 'https://via.placeholder.com/300x200?text=Alloy+Wheels',
    vendorId: 4,
    vendorName: 'Budget Auto Store',
    vendorRating: 4.5,
    vendorLocation: 'Hyderabad',
    category: 'wheels',
    stock: 5,
    reviews: 22
  },
  {
    id: 5,
    title: 'Luxury Type of Brake Booster - Complete System',
    price: '₹18,500',
    originalPrice: '₹22,000',
    availability: 'In Stock',
    condition: 'New',
    delivery: '2-3 days',
    warranty: '18 Months',
    image: 'https://via.placeholder.com/300x200?text=Brake+Booster',
    vendorId: 5,
    vendorName: 'Premium Auto Hub',
    vendorRating: 4.9,
    vendorLocation: 'Chennai',
    category: 'brakes',
    stock: 12,
    reviews: 58
  },
  {
    id: 6,
    title: 'Luxury Type of Propeller Shaft - Heavy Duty',
    price: '₹24,000',
    originalPrice: '₹30,000',
    availability: 'In Stock',
    condition: 'New',
    delivery: '4-5 days',
    warranty: '2 Years',
    image: 'https://via.placeholder.com/300x200?text=Propeller+Shaft',
    vendorId: 1,
    vendorName: 'Premium Auto Parts',
    vendorRating: 4.8,
    vendorLocation: 'Delhi',
    category: 'transmission',
    stock: 6,
    reviews: 33
  }
];

export const featuredCars = [
  {
    id: 1,
    title: 'Audi Q5 2014 Diesel 2000 Car Breaking for Parts',
    availability: 'In Stock',
    condition: 'Used',
    delivery: 'Ask Supplier',
    warranty: 'Ask Supplier',
    image: 'https://via.placeholder.com/300x200?text=Audi+Q5',
    vendorId: 1,
    vendorName: 'Premium Auto Parts',
    phone: '+919072779989'
  },
  {
    id: 2,
    title: 'Audi A4 2019 Diesel Car Breaking for Parts',
    availability: 'In Stock',
    condition: 'Used',
    delivery: 'Ask Supplier',
    warranty: 'Ask Supplier',
    image: 'https://via.placeholder.com/300x200?text=Audi+A4',
    vendorId: 2,
    vendorName: 'Quick Spare Parts',
    phone: '+919072779989'
  },
  {
    id: 3,
    title: 'Mercedes E Class E250 2016 Diesel Car Breaking for Parts',
    availability: 'In Stock',
    condition: 'Used',
    delivery: 'Ask Supplier',
    warranty: 'Ask Supplier',
    image: 'https://via.placeholder.com/300x200?text=Mercedes+E+Class',
    vendorId: 3,
    vendorName: 'Original Parts Hub',
    phone: '+919072779989'
  },
  {
    id: 4,
    title: 'Skoda Superb 2011 Petrol Car Breaking for Parts',
    availability: 'In Stock',
    condition: 'Used',
    delivery: 'Ask Supplier',
    warranty: 'Ask Supplier',
    image: 'https://via.placeholder.com/300x200?text=Skoda+Superb',
    vendorId: 4,
    vendorName: 'Budget Auto Store',
    phone: '+918866901111'
  },
  {
    id: 5,
    title: 'Tata Tiago 2024 Car Breaking for Parts',
    availability: 'In Stock',
    condition: 'Used',
    delivery: 'Ask Supplier',
    warranty: 'Ask Supplier',
    image: 'https://via.placeholder.com/300x200?text=Tata+Tiago',
    vendorId: 5,
    vendorName: 'Premium Auto Hub',
    phone: '+918866901111'
  },
  {
    id: 6,
    title: 'Honda Jazz 2018 Petrol Car Breaking for Parts',
    availability: 'In Stock',
    condition: 'Used',
    delivery: 'Ask Supplier',
    warranty: 'Ask Supplier',
    image: 'https://via.placeholder.com/300x200?text=Honda+Jazz',
    vendorId: 1,
    vendorName: 'Premium Auto Parts',
    phone: '+918866901111'
  }
];

export const regions = [
  'Jalandhar', 'Haryana', 'Rajasthan', 'Patiala', 'Ghaziabad', 'Gujarat',
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore'
];
