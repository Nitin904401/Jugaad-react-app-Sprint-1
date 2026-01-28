import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApprovedProducts } from '../../api/admin';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: string;
  vendor_name?: string;
  vendor_company?: string;
  brand?: string;
  images?: string[];
  status: string;
  description?: string;
  specifications?: any;
  quantity_in_stock?: number;
  created_at?: string;
  updated_at?: string;
}

export const AdminPublishedProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [vendorFilter, setVendorFilter] = useState('All Vendors');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState('Any Stock');
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showUnpublishModal, setShowUnpublishModal] = useState(false);
  const [productToUnpublish, setProductToUnpublish] = useState<number | null>(null);
  const [unpublishReason, setUnpublishReason] = useState('');

  useEffect(() => {
    loadApprovedProducts();
  }, []);

  const loadApprovedProducts = async () => {
    try {
      setLoading(true);
      const data = await getApprovedProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load approved products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setSelectedProduct(null);
  };

  const handleUnpublish = (productId: number) => {
    setProductToUnpublish(productId);
    setUnpublishReason('');
    setShowUnpublishModal(true);
  };

  const confirmUnpublish = async () => {
    if (!productToUnpublish || !unpublishReason.trim()) {
      alert('Please enter a reason for unpublishing');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5050/api/admin/products/${productToUnpublish}/unpublish`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ reason: unpublishReason }),
      });

      if (!response.ok) {
        throw new Error('Failed to unpublish product');
      }

      // Remove product from list
      setProducts(products.filter(p => p.id !== productToUnpublish));
      setShowUnpublishModal(false);
      setProductToUnpublish(null);
      setUnpublishReason('');
      
      // Close quick view if it's the same product
      if (selectedProduct?.id === productToUnpublish) {
        closeQuickView();
      }
    } catch (error) {
      console.error('Failed to unpublish product:', error);
      alert('Failed to unpublish product');
    }
  };

  const handleExportCSV = () => {
    // Prepare CSV data
    const headers = ['ID', 'Name', 'SKU', 'Category', 'Brand', 'Price (₹)', 'Stock', 'Vendor', 'Company', 'Status'];
    
    const csvData = filteredProducts.map(product => [
      product.id,
      `"${product.name.replace(/"/g, '""')}"`, // Escape quotes in name
      product.sku || '',
      product.category || '',
      product.brand || '',
      product.price || '0',
      product.quantity_in_stock || '0',
      product.vendor_name || '',
      product.vendor_company || '',
      product.status || 'approved'
    ]);

    // Create CSV string
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `published-products-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get unique vendors and categories for filters
  const uniqueVendors = Array.from(new Set(products.map(p => p.vendor_company || p.vendor_name || p.brand || 'Unknown').filter(Boolean)));
  const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      (product.vendor_company?.toLowerCase().includes(query)) ||
      (product.vendor_name?.toLowerCase().includes(query)) ||
      (product.brand?.toLowerCase().includes(query));
    
    const vendorName = product.vendor_company || product.vendor_name || product.brand || 'Unknown';
    const matchesVendor = vendorFilter === 'All Vendors' || vendorName === vendorFilter;
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
    
    // For stock filter - you'd need quantity_in_stock field in the Product interface and query
    const matchesStock = stockFilter === 'Any Stock';

    return matchesSearch && matchesVendor && matchesCategory && matchesStock;
  });

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 pb-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin-panel/products')}
          className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition"
        >
          ← Back to Manage Products
        </button>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Published Products</h1>
            <p className="text-slate-400 text-sm mt-1">Manage and monitor all live parts.</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleExportCSV}
              className="px-4 h-10 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white font-medium transition border border-white/10 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export CSV
            </button>
           
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs uppercase text-slate-400 font-medium mb-2">SEARCH</label>
            <input
              placeholder="Search by name, SKU, or manufacturer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 border border-white/10 focus:border-blue-500 focus:outline-none transition"
            />
          </div>
          
          {/* Vendor Filter */}
          <div>
            <label className="block text-xs uppercase text-slate-400 font-medium mb-2">VENDOR</label>
            <select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-slate-800/50 text-white border border-white/10 focus:border-blue-500 focus:outline-none transition"
            >
              <option value="All Vendors">All Vendors</option>
              {uniqueVendors.map((vendor) => (
                <option key={vendor} value={vendor}>{vendor}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs uppercase text-slate-400 font-medium mb-2">CATEGORY</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-slate-800/50 text-white border border-white/10 focus:border-blue-500 focus:outline-none transition"
            >
              <option value="All Categories">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Stock Level Filter */}
          {/* <div>
            <label className="block text-xs uppercase text-slate-400 font-medium mb-2">STOCK LEVEL</label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-slate-800/50 text-white border border-white/10 focus:border-blue-500 focus:outline-none transition"
            >
              <option value="Any Stock">Any Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div> */}
        </div>
      </div>

      {/* Scrollable Product List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-lg">Loading approved products...</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-slate-400 text-lg">No approved products found</div>
          </div>
        ) : (
          <div className="space-y-4 pr-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/50 transition"
          >
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="flex gap-6 flex-1">
                <div
                  className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0 border border-white/10"
                  style={{
                    backgroundImage: product.images?.[0] ? `url(${product.images[0]})` : 'none',
                  }}
                />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 flex-1">
                  <Info label="Product" value={product.name} />
                  <Info label="Vendor" value={product.vendor_company || product.vendor_name || product.brand || 'N/A'} />
                  <Info label="SKU" value={product.sku} />
                  <Info label="Category" value={product.category} />
                  <Info label="Live Price" value={`₹${product.price}`} highlight />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full font-medium">
                  Published
                </span>

                <button 
                  onClick={() => handleQuickView(product)}
                  className="h-10 px-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Quick View
                </button>

                <button 
                  onClick={() => handleUnpublish(product.id)}
                  className="h-10 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-medium transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  Unpublish
                </button>
              </div>
            </div>
          </div>
        ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredProducts.length > 0 && (
          <div className="mt-8 flex justify-between items-center text-sm text-slate-400">
            <p>
              Showing <span className="text-white">{filteredProducts.length}</span> of <span className="text-white">{products.length}</span> approved products
            </p>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`h-10 w-10 rounded-lg font-medium transition ${
                    n === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Unpublish Modal */}
      {showUnpublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 rounded-2xl border border-white/10 shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Unpublish Product</h3>
            <p className="text-slate-400 mb-6">
              This product will be removed from customer search and product pages. The vendor will be notified with the reason.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Reason for Unpublishing *
              </label>
              <textarea
                value={unpublishReason}
                onChange={(e) => setUnpublishReason(e.target.value)}
                placeholder="Enter reason for unpublishing this product..."
                className="w-full h-32 px-4 py-3 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 border border-white/10 focus:border-red-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowUnpublishModal(false);
                  setProductToUnpublish(null);
                  setUnpublishReason('');
                }}
                className="flex-1 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/10 transition"
              >
                No
              </button>
              <button
                onClick={confirmUnpublish}
                className="flex-1 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeQuickView}>
          <div className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto bg-slate-900 rounded-3xl border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Product Detail Content */}
            <div className="p-8 lg:p-12">
              {/* Main Product Info Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                {/* Left: Product Images */}
                <div className="space-y-6">
                  <div className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-slate-800/50 border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-blue-900/10 pointer-events-none" />
                    <img
                      alt={selectedProduct.name}
                      className="relative z-10 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      src={selectedProduct.images?.[0] || 'https://via.placeholder.com/500'}
                    />
                    <div className="absolute top-6 left-6 flex gap-3">
                      <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg">Premium Grade</span>
                      <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg">
                        {selectedProduct.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto">
                      {selectedProduct.images.slice(0, 4).map((img, idx) => (
                        <div key={idx} className="shrink-0 w-24 h-24 rounded-xl border-2 border-blue-500/50 bg-slate-800/50 p-2">
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Details */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-blue-400 tracking-widest uppercase">
                        {selectedProduct.brand || 'N/A'}
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                      {selectedProduct.name}
                    </h2>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-300">4.8</span>
                      </div>
                      <span className="text-sm font-medium text-slate-500">
                        SKU: {selectedProduct.sku}
                      </span>
                    </div>
                  </div>

                  {/* Compatibility Badge */}
                  <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Verified Product</p>
                        <p className="text-sm font-semibold text-emerald-100">Quality Assured & Tested</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Live Price</p>
                    <div className="flex items-end gap-4">
                      <span className="text-5xl font-black text-white">
                        ₹{selectedProduct.price}
                      </span>
                      <span className="text-xl text-slate-600 line-through font-bold mb-2">₹{(parseFloat(selectedProduct.price) * 1.3).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-emerald-400 font-bold mt-2">Save ₹{(parseFloat(selectedProduct.price) * 0.3).toFixed(2)} Today</p>
                  </div>

                  {/* Product Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-800/50 border border-white/10">
                      <p className="text-xs uppercase text-slate-400 font-bold mb-2">Category</p>
                      <p className="text-base font-bold text-white">{selectedProduct.category}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-800/50 border border-white/10">
                      <p className="text-xs uppercase text-slate-400 font-bold mb-2">Vendor</p>
                      <p className="text-base font-bold text-white truncate">
                        {selectedProduct.vendor_company || selectedProduct.vendor_name || selectedProduct.brand || 'N/A'}
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-800/50 border border-white/10">
                      <p className="text-xs uppercase text-slate-400 font-bold mb-2">Stock</p>
                      <p className="text-base font-bold text-white">{selectedProduct.quantity_in_stock || 'In Stock'}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-800/50 border border-white/10">
                      <p className="text-xs uppercase text-slate-400 font-bold mb-2">Status</p>
                      <p className="text-base font-bold text-green-400 capitalize">{selectedProduct.status}</p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">2 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              {selectedProduct.description && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-4">Product Description</h3>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-slate-300 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              {selectedProduct.specifications && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-colors">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">{key.replace(/_/g, ' ')}</p>
                        <p className="text-base font-bold text-white">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={() => window.open(`/product/${selectedProduct.id}`, '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open Full Page
                </button>
              </div>
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
  highlight?: boolean;
}

const Info: React.FC<InfoProps> = ({ label, value, highlight }) => (
  <div>
    <p className="text-xs uppercase text-slate-400 font-medium mb-2">{label}</p>
    <p className="text-sm truncate font-medium text-white">
      {value}
    </p>
  </div>
);
