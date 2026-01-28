import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAdminProducts, approveProduct, rejectProduct } from '../../api/admin';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: string;
  status: string;
  vendor_name?: string;
  vendor_company?: string;
  images?: string[];
  brand?: string;
}

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [vendorFilter, setVendorFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllAdminProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (productId: number) => {
    setSelectedProductId(productId);
    setShowApproveModal(true);
  };

  const confirmApprove = async () => {
    if (!selectedProductId) return;

    try {
      await approveProduct(selectedProductId);
      await loadProducts();
      setShowApproveModal(false);
      setSelectedProductId(null);
    } catch (error) {
      console.error('Failed to approve product:', error);
      alert('Failed to approve product');
    }
  };

  const handleReject = async (productId: number) => {
    setSelectedProductId(productId);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (!selectedProductId || !rejectionReason.trim()) {
      alert('Please enter a rejection reason');
      return;
    }

    try {
      await rejectProduct(selectedProductId, rejectionReason);
      await loadProducts();
      setShowRejectModal(false);
      setSelectedProductId(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Failed to reject product:', error);
      alert('Failed to reject product');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === 'All' || product.status === statusFilter.toLowerCase().replace(' ', '_');
    const matchVendor = vendorFilter === 'All' || product.vendor_name === vendorFilter || product.vendor_company === vendorFilter;
    const matchCategory = categoryFilter === 'All' || product.category === categoryFilter;

    return matchSearch && matchStatus && matchVendor && matchCategory;
  });

  const vendors = ['All', ...new Set(products.map((p) => p.vendor_company || p.vendor_name).filter(Boolean))];
  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];
  const statuses = ['All', 'Pending Review', 'Approved', 'Rejected', 'Draft'];

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending_review':
        return { label: 'Pending Review', color: 'yellow' };
      case 'approved':
        return { label: 'Approved', color: 'green' };
      case 'rejected':
        return { label: 'Rejected', color: 'red' };
      case 'draft':
        return { label: 'Draft', color: 'gray' };
      default:
        return { label: status, color: 'gray' };
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p className="text-slate-400 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Inventory ({products.length})</h1>
        <button className="px-4 h-10 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white font-medium transition border border-white/10">
          View Published Products
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            placeholder="Search by product name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 border border-white/10 focus:border-blue-500 focus:outline-none transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-12 px-4 rounded-lg bg-slate-800/50 text-white border border-white/10 focus:border-blue-500 focus:outline-none transition cursor-pointer"
        >
          {statuses.map((status) => (
            <option key={status} value={status} className="bg-slate-900">
              Status: {status}
            </option>
          ))}
        </select>
        <select
          value={vendorFilter}
          onChange={(e) => setVendorFilter(e.target.value)}
          className="h-12 px-4 rounded-lg bg-slate-800/50 text-white border border-white/10 focus:border-blue-500 focus:outline-none transition cursor-pointer"
        >
          {vendors.map((vendor) => (
            <option key={vendor} value={vendor} className="bg-slate-900">
              Vendor: {vendor}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-12 px-4 rounded-lg bg-slate-800/50 text-white border border-white/10 focus:border-blue-500 focus:outline-none transition cursor-pointer"
        >
          {categories.map((category) => (
            <option key={category} value={category} className="bg-slate-900">
              Category: {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="space-y-4">
        {filteredProducts.map((product) => {
          const statusInfo = getStatusDisplay(product.status);
          return (
            <div
              key={product.id}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image & Details */}
                <div className="flex gap-6 flex-1">
                  <div
                    className="w-24 h-24 rounded-lg bg-cover bg-center flex-shrink-0 border border-white/10 bg-slate-800"
                    style={{
                      backgroundImage: product.images?.[0]
                        ? `url(${product.images[0]})`
                        : 'none',
                    }}
                  />
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 flex-1">
                    <Info label="Product" value={product.name} />
                    <Info
                      label="Vendor"
                      value={product.vendor_company || product.vendor_name || product.brand || 'N/A'}
                    />
                    <Info label="SKU" value={product.sku || 'N/A'} />
                    <Info label="Category" value={product.category || 'N/A'} />
                    <Info label="Price" value={`$${product.price}`} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <span
                    className={`px-3 py-1.5 text-xs rounded-full font-medium ${
                      statusInfo.color === 'yellow'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : statusInfo.color === 'green'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : statusInfo.color === 'red'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}
                  >
                    {statusInfo.label}
                  </span>
                  {product.status === 'pending_review' && (
                    <>
                      <button
                        onClick={() => handleReject(product.id)}
                        className="h-10 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition border border-red-500/30"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(product.id)}
                        className="h-10 px-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition border border-green-500/30"
                      >
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No products found</p>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl border border-white/10 p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-400 text-2xl">check_circle</span>
              </div>
              <h2 className="text-xl font-bold text-white">Approve Product</h2>
            </div>
            <p className="text-slate-300 mb-6">
              Are you sure you want to approve this product? It will be published and visible to customers.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedProductId(null);
                }}
                className="flex-1 h-11 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="flex-1 h-11 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
              >
                Yes, Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl border border-white/10 p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-400 text-2xl">cancel</span>
              </div>
              <h2 className="text-xl font-bold text-white">Reject Product</h2>
            </div>
            <p className="text-slate-300 mb-4">
              Please provide a reason for rejecting this product:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full h-24 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-white/10 focus:border-red-500 focus:outline-none transition resize-none mb-6"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedProductId(null);
                  setRejectionReason('');
                }}
                className="flex-1 h-11 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 h-11 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
              >
                Yes, Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface InfoProps {
  label: string;
  value: string;
}

const Info: React.FC<InfoProps> = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-400 uppercase font-medium mb-2">{label}</p>
    <p className="text-sm text-white truncate font-medium">{value}</p>
  </div>
);
