# Multi-Vendor Ecommerce Frontend - Complete Structure

Complete React + Vite + React Router + Tailwind CSS frontend for a multi-vendor auto parts ecommerce platform (similar to Boodmo).

## 🏗️ Project Structure

```
src/
├── api/                          # Fake API modules
│   ├── products.ts              # Product API (search, filter, by vendor)
│   ├── vendors.ts               # Vendor API (list, search, details)
│   ├── auth.ts                  # Authentication API (login, register, logout)
│   └── vehicles.ts              # Vehicle/Car API (makes, models, years)
│
├── components/
│   ├── layout/                  # Layout wrappers
│   │   ├── MainLayout.tsx       # Customer main layout with Header/Footer/Outlet
│   │   ├── VendorLayout.tsx     # Vendor dashboard layout with sidebar
│   │   ├── AdminLayout.tsx      # Admin dashboard layout with sidebar
│   │   ├── Header.tsx           # Shared navigation header
│   │   └── Footer.tsx           # Shared footer
│   │
│   ├── common/                  # Reusable components
│   │   ├── Button.tsx           # Button component (primary, secondary, danger sizes)
│   │   ├── Loader.tsx           # Loading spinner (fullPage or inline)
│   │   ├── ProtectedRoute.tsx   # Route protection with role-based access
│   │   ├── SearchBar.tsx        # Search input with submit
│   │   └── Pagination.tsx       # Pagination controls
│   │
│   └── product/                 # Product-related components
│       ├── ProductCard.tsx      # Single product card display
│       ├── ProductGrid.tsx      # Grid layout for products
│       ├── ProductFilters.tsx   # Category, vendor, price filters
│       └── VehicleSelector.tsx  # Vehicle make/model/year selector
│
├── context/                     # State management
│   ├── AuthContext.tsx          # Authentication state (user, login, logout)
│   └── CartContext.tsx          # Shopping cart state (items, total)
│
├── pages/
│   ├── customer/                # Customer pages
│   │   ├── Home.tsx            # Homepage with hero, categories, how-it-works
│   │   ├── Login.tsx           # Customer login page
│   │   ├── Register.tsx        # Customer registration
│   │   ├── Vehicles.tsx        # Vehicle selector page
│   │   ├── Search.tsx          # Product search/catalog page
│   │   ├── Product.tsx         # Product detail page
│   │   ├── Cart.tsx            # Shopping cart page
│   │   ├── Checkout.tsx        # Checkout with shipping/payment
│   │   └── Account.tsx         # User account profile
│   │
│   ├── vendor/                  # Vendor pages
│   │   ├── Login.tsx           # Vendor login
│   │   ├── Register.tsx        # Vendor registration
│   │   ├── Dashboard.tsx       # Vendor dashboard with stats
│   │   ├── Products.tsx        # Vendor product list table
│   │   ├── ProductEdit.tsx     # Add/edit product form
│   │   └── Orders.tsx          # Vendor orders list
│   │
│   └── admin/                   # Admin pages
│       ├── Login.tsx           # Admin login
│       ├── Dashboard.tsx       # Admin analytics dashboard
│       ├── Vendors.tsx         # Manage vendors table
│       ├── Products.tsx        # Manage all products table
│       ├── Orders.tsx          # Platform orders list
│       └── Catalog.tsx         # Manage categories, brands, attributes
│
└── router/
    └── AppRouter.tsx           # Main routing configuration with BrowserRouter
```

## 🔐 Authentication Routes

### Customer Routes
- `GET /` - Homepage
- `GET /login` - Customer login
- `GET /register` - Customer registration
- `GET /vehicles` - Vehicle selector
- `GET /search` - Product search
- `GET /product/:productId` - Product details
- `GET /cart` - Shopping cart (protected)
- `GET /checkout` - Checkout (protected)
- `GET /account` - User account (protected)

### Vendor Routes
- `GET /vendor/login` - Vendor login
- `GET /vendor/register` - Vendor registration
- `GET /vendor/dashboard` - Dashboard (vendor-only)
- `GET /vendor/products` - Product list (vendor-only)
- `GET /vendor/products/new` - Add product form (vendor-only)
- `GET /vendor/products/:id/edit` - Edit product (vendor-only)
- `GET /vendor/orders` - Orders list (vendor-only)

### Admin Routes
- `GET /admin/login` - Admin login
- `GET /admin/dashboard` - Dashboard (admin-only)
- `GET /admin/vendors` - Manage vendors (admin-only)
- `GET /admin/products` - Manage products (admin-only)
- `GET /admin/orders` - Orders list (admin-only)
- `GET /admin/catalog` - Catalog management (admin-only)

## 🔌 API Modules (Fake/Mock Data)

### `src/api/products.ts`
- `getProducts()` - Get all products
- `getProductById(id)` - Get single product
- `searchProducts(query)` - Search by title
- `getProductsByCategory(category)` - Filter by category
- `getProductsByVendor(vendorId)` - Filter by vendor

**Mock Data:**
- 6 featured products with vendor info, ratings, pricing
- Linked to 5 mock vendors
- Categories: engine, transmission, brakes, wheels, exhaust

### `src/api/vendors.ts`
- `getVendors()` - Get all vendors
- `getVendorById(id)` - Get vendor details
- `searchVendors(query)` - Search by name

**Mock Data:**
- 5 vendors: Premium Auto Parts, Quick Spare Parts, Original Parts Hub, Budget Auto Store, Premium Auto Hub
- Each with: name, location, rating, reviews, verification status, followers, response time

### `src/api/auth.ts`
- `login(email, password)` - Customer/Vendor/Admin login
- `register(email, password, name, role)` - Register with role
- `logout()` - Clear auth token
- `getCurrentUser(token)` - Validate token

**Demo Credentials:**
- Customer: `customer@test.com` / `123456`
- Vendor: `vendor@test.com` / `123456`
- Admin: `admin@test.com` / `123456`

### `src/api/vehicles.ts`
- `getCarMakes()` - Get all car manufacturers
- `getCarModels(make)` - Get models for make
- `getCarYears(make, model)` - Get years for make/model
- `getVehicles()` - Get all vehicles
- `getVehiclesByMake(make)` - Filter by make

**Mock Data:**
- 10+ car makes (Toyota, Hyundai, Maruti, Honda, Tata, etc.)
- Multiple models per make with different years

## 🎨 Styling & Design

### Tailwind CSS Setup
- ✅ Installed via npm
- ✅ tailwind.config.js created
- ✅ postcss.config.js configured
- ✅ @tailwind directives in index.css

### Color Scheme
- **Primary:** Orange (#ff6b35) - Main CTA and branding
- **Secondary:** Gray (200-900) - UI elements
- **Accent:** Red (#ef4444) - Danger/remove actions

### Responsive Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## 🔐 Authentication Context

```typescript
// useAuth() hook provides:
- user: User | null                           // Current user object
- isAuthenticated: boolean                    // Is user logged in
- isLoading: boolean                          // Auth loading state
- login(email, password): Promise<void>       // Login
- register(email, password, name, role): Promise<void> // Register
- logout(): Promise<void>                     // Logout
```

**User Roles:**
- `customer` - Browse and purchase
- `vendor` - Sell products
- `admin` - Platform management

## 🛒 Cart Context

```typescript
// useCart() hook provides:
- items: CartItem[]                           // Cart items with quantities
- addItem(product, quantity): void            // Add to cart
- removeItem(productId): void                 // Remove from cart
- updateQuantity(productId, quantity): void  // Update quantity
- clearCart(): void                           // Empty cart
- getTotalPrice(): number                     // Calculate total
- getTotalItems(): number                     // Count items
```

## 🧩 Component Library

### Common Components

**Button**
```jsx
<Button variant="primary|secondary|danger" size="sm|md|lg" isLoading={false}>
  Click Me
</Button>
```

**Loader**
```jsx
<Loader fullPage={false} message="Loading..." />
```

**SearchBar**
```jsx
<SearchBar onSearch={(query) => console.log(query)} placeholder="Search..." />
```

**Pagination**
```jsx
<Pagination 
  currentPage={1} 
  totalPages={10} 
  onPageChange={(page) => {}} 
/>
```

**ProtectedRoute**
```jsx
<ProtectedRoute requiredRole="vendor">
  <VendorPage />
</ProtectedRoute>
```

### Product Components

**ProductCard**
```jsx
<ProductCard 
  product={product} 
  onAddToCart={(product) => {}} 
/>
```

**ProductGrid**
```jsx
<ProductGrid 
  products={products} 
  isLoading={false}
  onAddToCart={(product) => {}}
/>
```

**VehicleSelector**
```jsx
<VehicleSelector 
  onVehicleSelect={(make, model, year) => {}}
/>
```

## 📋 Layout Components

### MainLayout (Customer)
- Header with nav, search, cart, account
- Outlet for page content
- Footer with links and info

### VendorLayout
- Header (same as MainLayout)
- Left sidebar with dashboard, products, orders links
- Main content area

### AdminLayout
- Header (same as MainLayout)
- Left sidebar with dashboard, vendors, products, orders, catalog links
- Main content area

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.20.0",
  "tailwindcss": "^3.4.0"
}
```

## 📝 File Naming Conventions

- **Components:** PascalCase (.tsx)
- **Pages:** PascalCase (.tsx)
- **API modules:** camelCase (.ts)
- **Styles:** CSS files alongside components
- **Contexts:** PascalCase (.tsx)

## 🔄 Data Flow

1. **User Action** → Component
2. **Component** → API Call (Mock)
3. **API Returns Data** → Context State
4. **Context Updates** → Component Re-renders
5. **Context Persists** → localStorage (auth token)

## 🎯 Features Implemented

✅ Multi-vendor product listing
✅ Product search and filtering
✅ Vehicle-based part selection
✅ User authentication (3 roles)
✅ Shopping cart management
✅ Checkout flow
✅ Vendor product management
✅ Admin dashboard and controls
✅ Role-based route protection
✅ Responsive mobile design
✅ Mock API with realistic data

## 🔮 Next Steps (Not Implemented)

- Backend API integration
- Real database
- Payment processing
- Email notifications
- User reviews and ratings
- Vendor verification system
- Order tracking
- Inventory management
- Advanced analytics
- Real-time chat
- Mobile app (React Native)

## 📄 Notes

- All API calls use setTimeout to simulate network delay (300-600ms)
- Authentication state persists in localStorage
- Cart state is in-memory only (not persisted)
- Admin and Vendor sections are fully functional with mock data
- Styling is 100% Tailwind CSS - no custom CSS files needed
