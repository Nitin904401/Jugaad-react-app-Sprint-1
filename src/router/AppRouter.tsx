// AppRouter - Main routing configuration
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { MainLayout } from '../components/layout/MainLayout';
import { VendorLayout } from '../components/layout/VendorLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Customer Pages
import { HomePage } from '../pages/customer/Home';
import { LoginPage } from '../pages/customer/Login';
import { RegisterPage } from '../pages/customer/Register';
import { VehiclesPage } from '../pages/customer/Vehicles';
import { SearchPage } from '../pages/customer/Search';
import { ProductPage } from '../pages/customer/Product';
import { CartPage } from '../pages/customer/Cart';
import { CheckoutPage } from '../pages/customer/Checkout';
import { AccountPage } from '../pages/customer/Account';

// Vendor Pages
import { VendorLoginPage } from '../pages/vendor/Login';
import { VendorRegisterPage } from '../pages/vendor/Register';
import { VendorDashboardPage } from '../pages/vendor/Dashboard';
import { VendorProductsPage } from '../pages/vendor/Products';
import { VendorProductEditPage } from '../pages/vendor/ProductEdit';
import { VendorOrdersPage } from '../pages/vendor/Orders';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/Login';
import { AdminDashboardPage } from '../pages/admin/Dashboard';
import { AdminVendorsPage } from '../pages/admin/Vendors';
import { AdminProductsPage } from '../pages/admin/Products';
import { AdminOrdersPage } from '../pages/admin/Orders';
import { AdminCatalogPage } from '../pages/admin/Catalog';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Customer Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Vendor Routes */}
            <Route path="/vendor/login" element={<VendorLoginPage />} />
            <Route path="/vendor/register" element={<VendorRegisterPage />} />
            <Route element={<VendorLayout />}>
              <Route
                path="/vendor/dashboard"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/products"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/products/new"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorProductEditPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/products/:id/edit"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorProductEditPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/orders"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorOrdersPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route element={<VendorLayout />}>
              <Route
                path="/vendor/dashboard"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/products"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/products/new"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorProductEditPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/products/:id/edit"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorProductEditPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor/orders"
                element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorOrdersPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<AdminLayout />}>
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/vendors"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminVendorsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminOrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/catalog"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminCatalogPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
