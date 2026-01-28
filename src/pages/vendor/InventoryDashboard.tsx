import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchVendorProducts, deleteProduct } from '../../api/products';
import VendorSidebar from './VendorSidebar';

interface Product {
  id: number;
  name: string;
  sku?: string;
  category: string;
  brand?: string;
  price: number;
  quantity_in_stock?: number;
  status: string;
  images?: string[];
}

function InventoryDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('🔄 Fetching vendor products...');
      const data = await fetchVendorProducts();
      console.log('✅ Received products:', data);
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.error('❌ Expected array, got:', typeof data);
        setError('Invalid data format received');
        setProducts([]);
        return;
      }
      
      setProducts(data);
    } catch (err: any) {
      console.error('❌ Error loading products:', err);
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
      approved: { bg: 'bg-[#0bda5b]/10', text: 'text-[#0bda5b]', label: 'Active' },
      pending_review: { bg: 'bg-yellow-400/10', text: 'text-yellow-400', label: 'Pending Review' },
      rejected: { bg: 'bg-red-500/10', text: 'text-red-500', label: 'Rejected' },
      draft: { bg: 'bg-gray-400/10', text: 'text-gray-400', label: 'Draft' },
    };

    const style = statusStyles[status] || statusStyles.draft;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} border border-current/20`}>
        <span className={`size-1.5 rounded-full ${style.text.replace('text-', 'bg-')}`} />
        {style.label}
      </span>
    );
  };

  const getStockBadge = (quantity?: number) => {
    const qty = quantity || 0;
    let color = 'text-[#0bda5b]';
    let percent = '75%';

    if (qty === 0) {
      color = 'text-red-500';
      percent = '0%';
    } else if (qty < 10) {
      color = 'text-orange-400';
      percent = '10%';
    } else if (qty < 50) {
      color = 'text-yellow-400';
      percent = '50%';
    }

    return { qty, color, percent };
  };

  const stats = {
    total: products.length,
    lowStock: products.filter(p => (p.quantity_in_stock || 0) < 10).length,
    active: products.filter(p => p.status === 'approved').length,
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <VendorSidebar />
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-dark">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            {/* Page Heading & Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-white tracking-tight">Products Overview</h1>
                <p className="text-[#9babbb]">Manage your product listings, stock levels, and pricing effectively.</p>
              </div>
              <button
                className="flex items-center gap-2 h-10 px-5 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,127,249,0.3)]"
                onClick={() => navigate('/vendor/add-new-part')}
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Add New Part</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel p-5 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
                <div className="flex flex-col gap-1">
                  <p className="text-[#9babbb] text-sm font-medium">Total Products</p>
                  <p className="text-white text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="size-12 rounded-full bg-[#27303a] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl flex items-center justify-between group hover:border-orange-500/30 transition-all">
                <div className="flex flex-col gap-1">
                  <p className="text-[#9babbb] text-sm font-medium">Low Stock Alerts</p>
                  <p className="text-white text-3xl font-bold">{stats.lowStock}</p>
                  {stats.lowStock > 0 && (
                    <div className="flex items-center gap-1 text-orange-400 text-xs font-bold bg-orange-400/10 px-2 py-0.5 rounded w-fit mt-1">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      <span>Needs Attention</span>
                    </div>
                  )}
                </div>
                <div className="size-12 rounded-full bg-[#27303a] flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">priority_high</span>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl flex items-center justify-between group hover:border-green-500/30 transition-all">
                <div className="flex flex-col gap-1">
                  <p className="text-[#9babbb] text-sm font-medium">Active Listings</p>
                  <p className="text-white text-3xl font-bold">{stats.active}</p>
                  <div className="flex items-center gap-1 text-[#0bda5b] text-xs font-bold bg-[#0bda5b]/10 px-2 py-0.5 rounded w-fit mt-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>Approved</span>
                  </div>
                </div>
                <div className="size-12 rounded-full bg-[#27303a] flex items-center justify-center text-[#0bda5b] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="glass-panel p-4 rounded-xl bg-red-500/10 border-red-500/20">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Inventory Table */}
            <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#27303a]/50 border-b border-[#27303a]">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Product Details</th>
                      <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27303a]">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[#9babbb]">Loading products...</p>
                          </div>
                        </td>
                      </tr>
                    ) : products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <span className="material-symbols-outlined text-[48px] text-[#9babbb]">inventory_2</span>
                            <p className="text-[#9babbb]">No products found. Add your first product to get started.</p>
                            <button
                              onClick={() => navigate('/vendor/add-new-part')}
                              className="mt-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-all"
                            >
                              Add New Part
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => {
                        const stock = getStockBadge(product.quantity_in_stock);
                        
                        // Get first image or use placeholder
                        let imageUrl = '';
                        let isValidImage = false;
                        
                        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                          const firstImage = product.images[0];
                          if (firstImage && typeof firstImage === 'string' && firstImage.trim() !== '') {
                            // Check if it's a valid image URL (not blob URL)
                            if (firstImage.startsWith('data:image') || (firstImage.startsWith('http') && !firstImage.includes('blob:'))) {
                              imageUrl = firstImage;
                              isValidImage = true;
                            } else if (firstImage.includes('blob:')) {
                              console.warn(`⚠️ Product "${product.name}" has invalid blob URL. Please re-upload the product.`);
                            }
                          }
                        }

                        return (
                          <tr key={product.id} className="table-row-hover group transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                {isValidImage ? (
                                  <img 
                                    src={imageUrl}
                                    alt={product.name}
                                    className="h-12 w-12 rounded-lg object-cover border border-[#3f4a56]"
                                    onError={(e) => {
                                      console.error('Image failed to load:', imageUrl);
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <div className="h-12 w-12 rounded-lg bg-[#27303a] border border-[#3f4a56] flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#9babbb] text-[20px]">inventory_2</span>
                                  </div>
                                )}
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                                    {product.name}
                                  </span>
                                  {product.sku && (
                                    <span className="text-xs text-[#9babbb]">SKU: {product.sku}</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#27303a] text-gray-300">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-medium text-white">
                                ₹{product.price ? Number(product.price).toFixed(2) : '0.00'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm font-medium ${stock.color}`}>{stock.qty}</span>
                                  <span className="text-xs text-[#9babbb]">units</span>
                                </div>
                                <div className="w-24 h-1.5 bg-[#27303a] rounded-full overflow-hidden">
                                  <div className={`h-full ${stock.color.replace('text-', 'bg-')} rounded-full`} style={{ width: stock.percent }} />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getStatusBadge(product.status)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => navigate(`/vendor/edit-product/${product.id}`)}
                                  className="p-1.5 rounded-md text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors" 
                                  title="Edit"
                                >
                                  <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button 
                                  onClick={() => handleDelete(product.id)}
                                  className="p-1.5 rounded-md text-[#9babbb] hover:text-red-400 hover:bg-red-400/10 transition-colors" 
                                  title="Delete"
                                >
                                  <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {products.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 bg-[#27303a]/50 border-t border-[#27303a]">
                  <p className="text-sm text-[#9babbb]">
                    Showing <span className="font-medium text-white">{products.length}</span> product{products.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InventoryDashboard;
