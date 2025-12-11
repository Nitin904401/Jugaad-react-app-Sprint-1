# Multi-Vendor Frontend - Quick Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎮 Demo Credentials

Use these to test different roles:

### Customer
- **Email:** `customer@test.com`
- **Password:** `123456`
- **URL:** `http://localhost:5173/login`

### Vendor
- **Email:** `vendor@test.com`
- **Password:** `123456`
- **URL:** `http://localhost:5173/vendor/login`

### Admin
- **Email:** `admin@test.com`
- **Password:** `123456`
- **URL:** `http://localhost:5173/admin/login`

## 📍 Key Pages to Visit

### Customer Section
- Homepage: `/`
- Login: `/login`
- Product Search: `/search`
- Select Vehicle: `/vehicles`
- Shopping Cart: `/cart`
- Checkout: `/checkout`
- Account: `/account`

### Vendor Section
- Login: `/vendor/login`
- Dashboard: `/vendor/dashboard`
- Products: `/vendor/products`
- Add Product: `/vendor/products/new`
- Orders: `/vendor/orders`

### Admin Section
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Manage Vendors: `/admin/vendors`
- Manage Products: `/admin/products`
- Orders: `/admin/orders`
- Catalog: `/admin/catalog`

## 🛠️ Development

### Project Structure
```
src/
├── api/              → Mock API modules
├── components/       → Reusable React components
├── context/          → Global state (Auth, Cart)
├── pages/            → Page components
├── router/           → Routing configuration
└── App.jsx          → Main app component
```

### Adding a New Page

1. Create page file in `src/pages/customer/` (or vendor/admin)
```typescript
export const NewPage: React.FC = () => {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
};
```

2. Add route in `src/router/AppRouter.tsx`
```typescript
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New Component

1. Create component in appropriate folder
```typescript
// src/components/common/NewComponent.tsx
export const NewComponent: React.FC = () => {
  return <div>Component</div>;
};
```

2. Use in pages
```typescript
import { NewComponent } from '../../components/common/NewComponent';
```

### Using API Modules

```typescript
import { getProducts, searchProducts } from '../../api/products';

// In component
const [products, setProducts] = useState([]);

useEffect(() => {
  getProducts().then(setProducts);
}, []);
```

### Using Context Hooks

```typescript
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const { user, login, logout } = useAuth();
const { items, addItem, getTotalPrice } = useCart();
```

## 🎨 Styling with Tailwind

All styling is done with Tailwind CSS. No custom CSS files needed.

### Common Classes
```jsx
// Layout
<div className="max-w-7xl mx-auto px-4">

// Grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Flexbox
<div className="flex items-center justify-between gap-4">

// Colors
<button className="bg-orange-500 hover:bg-orange-600 text-white">

// Responsive
<div className="hidden md:block">  {/* Hide on mobile, show on medium+ */}
```

## 📱 Responsive Design

The app is fully responsive using Tailwind breakpoints:
- Mobile first approach
- Tested on mobile, tablet, desktop
- All components adapt to screen size

## 🔐 Authentication Flow

1. User fills login/register form
2. Form submitted to `useAuth()` hook
3. Hook calls API module
4. API returns user + token
5. Token stored in localStorage
6. User redirected to dashboard
7. Protected routes check auth status

## 🛒 Shopping Cart Flow

1. Browse products
2. Click "Add to Cart" button
3. Item added to `useCart()` context
4. Cart count updates in header
5. Navigate to `/cart`
6. View cart items
7. Update quantities or remove items
8. Click "Checkout" → `/checkout`
9. Place order (mock)

## 🔄 Multi-Vendor System

**How it works:**
- 5 vendors in mock data
- Each product linked to vendor via `vendorId`
- Can filter products by vendor
- Each vendor has own store/dashboard
- Admin can manage all vendors

**Vendor Dashboard:**
- View own products
- Add/edit/delete products
- View orders
- See performance stats

**Admin Dashboard:**
- See all vendors
- Manage vendor status
- See platform-wide stats
- Manage all products/orders

## 🚨 Common Issues & Solutions

### Issue: Module not found error
**Solution:** Check import paths, ensure file extensions (.tsx, .ts)

### Issue: Tailwind styles not applied
**Solution:** Ensure class names are in your code (not generated dynamically)

### Issue: React Router not working
**Solution:** Make sure AppRouter is at root level in App.jsx

### Issue: Context errors
**Solution:** Ensure component is wrapped with Provider (AuthProvider, CartProvider)

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/` folder. Deploy to Vercel, Netlify, etc.

## 🎯 Next Steps

1. ✅ Explore the demo with provided credentials
2. ✅ Read FRONTEND_STRUCTURE.md for detailed architecture
3. ✅ Modify mock data in `src/api/` files
4. ✅ Add new pages and routes
5. ✅ Connect to real backend API
6. ✅ Add real authentication
7. ✅ Set up database

## 📚 Resources

- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

## 🤝 Questions?

Check the code comments for detailed explanations. Each file has descriptions of its purpose and contents.

Happy coding! 🚀
