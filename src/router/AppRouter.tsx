// AppRouter - Main routing configuration
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { MainLayout } from '../Components/layout/MainLayout';
import { VendorLayout } from '../Components/layout/VendorLayout';
import { AdminLayout } from '../Components/layout/AdminLayout';

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
import FinancialSetup from '../pages/vendor/FinancialSetup';
import { VendorDashboardPage } from '../pages/vendor/VendorDashboard';
import AddNewPart from '../pages/vendor/AddNewPart';
import { VendorOrdersPage } from '../pages/vendor/VendorOrders';
import InventoryDashboard from '../pages/vendor/InventoryDashboard';
import VendorPayments from '../pages/vendor/VendorPayments';
import { VendorAnalyticsPage } from '../pages/vendor/VendorAnalytics';
import CreateManualOrder from '../pages/vendor/CreateManualOrder';
import VendorSettings from '../pages/vendor/VendorSettings';

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
            <Route path="/vendor/financial-setup" element={<FinancialSetup />} />
            <Route path="/vendor/add-new-part" element={<AddNewPart />} />
            <Route path="/vendor/create-manual-order" element={<CreateManualOrder />} />
            <Route path="/vendor/orders" element={<VendorOrdersPage />} />
            <Route path="/vendor/inventory" element={<InventoryDashboard />} />
            <Route path="/vendor/analytics" element={<VendorAnalyticsPage />} />
            <Route path="/vendor/settings" element={<VendorSettings />} />
            <Route
              path="/vendor/payments"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <VendorPayments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/dashboard"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <VendorDashboardPage />
                </ProtectedRoute>
              }
            />

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
