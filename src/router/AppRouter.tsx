// AppRouter - Main routing configuration
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { ProtectedRoute } from '../Components/common/ProtectedRoute';
import { MainLayout } from '../Components/layout/MainLayout';
import { AdminLayout } from '../Components/layout/AdminLayout';

// Customer Pages
import { HomePage } from '../pages/customer/Home';
import { LoginPage } from '../pages/customer/Login';
import { RegisterPage } from '../pages/customer/Register';
import { VehiclesPage } from '../pages/customer/Vehicles';
import { SearchPage } from '../pages/customer/Search';
import ProductDetail from '../pages/customer/ProductDetail';
import { CartPage } from '../pages/customer/Cart';
import { CheckoutPage } from '../pages/customer/Checkout';
import { AccountPage } from '../pages/customer/Account';
import { UserProfile } from '../pages/customer/UserProfile';

// Vendor Pages
import { VendorLoginPage } from '../pages/vendor/Login';
import { VendorRegisterPage } from '../pages/vendor/Register';
import FinancialSetup from '../pages/vendor/FinancialSetup';
import { VendorDashboardPage } from '../pages/vendor/VendorDashboard';
import AddNewPart from '../pages/vendor/AddNewPart';
import EditProduct from '../pages/vendor/EditProduct';
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
import { AdminUsersPage } from '../pages/admin/Users';
import { AdminSettingsPage } from '../pages/admin/Settings';

import { AdminVendorDetailsPage } from '../pages/admin/VendorDetails';
import { AdminPublishedProductsPage } from '../pages/admin/PublishedProducts';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
          <Routes>
            {/* Customer Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
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
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Vendor Routes */}
            <Route path="/vendor/login" element={<VendorLoginPage />} />
            <Route path="/vendor/register" element={<VendorRegisterPage />} />
            <Route path="/vendor/financial-setup" element={<FinancialSetup />} />
            <Route path="/vendor/add-new-part" element={<AddNewPart />} />
            <Route path="/vendor/edit-product/:id" element={<EditProduct />} />
            <Route path="/vendor/create-manual-order" element={<CreateManualOrder />} />
            <Route path="/vendor/orders" element={<VendorOrdersPage />} />
            <Route path="/vendor/inventory" element={<InventoryDashboard />} />
            <Route path="/vendor/analytics" element={<VendorAnalyticsPage />} />
            <Route path="/vendor/settings" element={<VendorSettings />} />
            <Route path="/vendor/payments" element={<VendorPayments />} />
            <Route
              path="/vendor/dashboard"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <VendorDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - Separate isolated URL path */}
            <Route path="/admin-panel/login" element={<AdminLoginPage />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin-panel/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin-panel/vendors" element={<AdminVendorsPage />} />
              <Route path="/admin-panel/vendors/:vendorId" element={<AdminVendorDetailsPage />} />
              <Route path="/admin-panel/products" element={<AdminProductsPage />} />
              <Route path="/admin-panel/published-products" element={<AdminPublishedProductsPage />} />
              <Route path="/admin-panel/users" element={<AdminUsersPage />} />
              <Route path="/admin-panel/settings" element={<AdminSettingsPage />} />
              <Route
                path="/admin-panel/catalog"
               
              />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
    </BrowserRouter>
  );
};
