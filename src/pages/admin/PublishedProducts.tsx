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
            <button className="px-4 h-10 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white font-medium transition border border-white/10">
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

                <button className="h-10 px-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Quick Edit
                </button>

                <button className="h-10 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-medium transition flex items-center gap-2">
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
    <p className={`text-sm truncate font-medium ${highlight ? 'text-blue-400' : 'text-white'}`}>
      {value}
    </p>
  </div>
);
