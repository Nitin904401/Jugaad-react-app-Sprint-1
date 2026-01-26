import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Ceramic Brake Pads',
    vendor: 'ProStop Auto',
    sku: 'PS-1102',
    category: 'Brakes',
    price: '$89.99',
    status: 'Pending Review',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIf3f4jUN2pq-E-4QsV-jrSD0DHYhCWXHWsqRghAZ3Y9XISVfnmR59Q-DV7biV-NnQ7wrCnxMOAZGACidA1Ja2UgRmo2EYIRu58gdOpLERBdGGHkFhZBOinAUBymk28lD8HiCU332FQCMFZaVVZmEK2blJfFBYQkWvZvSMpW6YW27Z4aohaarKXg8nhv996SeZeRmmQkbZQhyrD4A3hDbiqgLUq-TXUJ_HQeKpYAp0BwJgxufw8_leDOhWkYYOEWy6UI2R2O8aJl1P',
  },
  {
    id: 2,
    name: 'All-Season Tires',
    vendor: 'GripMaster Tires',
    sku: 'GM-AS-205',
    category: 'Tires',
    price: '$124.50',
    status: 'Pending Review',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-EpxH44Kh_o1nWHHORP85nVh8u2TsmkEZydv1240iR2Vc9ndIJXAI96ZHht4YK0Mko7vuWNqBLTOlAeXq4_pOmaFkDpT_IbYdBdfCjtdpy1H_AbOJoIIR5SJ411gR4uVpQ1geypDrr_-Qj_MF02GfHphUOq71ApUyoA2OQGpHWlcsSMymzxJvlooBkGFdCmH-DSmOqPD-VzshYgJ_v6ED3rJVsFn-gzNn7KW9zUk9WtctrpG07D1amhpbdHuxXthVP82oUa_-Krzs',
  },
  {
    id: 3,
    name: 'LED Headlight Kit',
    vendor: 'Lumina Auto',
    sku: 'LA-H11-PRO',
    category: 'Lighting',
    price: '$149.99',
    status: 'Pending Review',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfWVgAX7hydj0Kn0Sj4KQ-qcZJElyV9uZAkxlXV1KItlkGbCrExvdmv2vge4cZKvb_L-f7N55mdI2Xoxn2lZdvMSypGUK6uaxxZuwoAVqFigF7XOSCR5zdQryEzTv3lgvpOA5egWW3q98C5DUm3ei_sxraAlOxIFIxF5QCf1iNkJyBaks4iGyV0W36-Okzg7jBpNQAgaV7ETTmyyCnzVsx5T6bQl3foG_IXe7j2XyQIhBRuVPtQ33CzsK8BspmejzJEY81ZnXS6Fj6',
  },
];

export const AdminProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [vendorFilter, setVendorFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === 'All' || product.status.includes(statusFilter);
    const matchVendor = vendorFilter === 'All' || product.vendor === vendorFilter;
    const matchCategory = categoryFilter === 'All' || product.category === categoryFilter;

    return matchSearch && matchStatus && matchVendor && matchCategory;
  });

  const vendors = ['All', ...new Set(products.map((p) => p.vendor))];
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const statuses = ['All', 'Pending Review', 'Approved', 'Rejected'];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Product Moderation</h1>
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
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image & Details */}
              <div className="flex gap-6 flex-1">
                <div
                  className="w-24 h-24 rounded-lg bg-cover bg-center flex-shrink-0 border border-white/10"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 flex-1">
                  <Info label="Product" value={product.name} />
                  <Info label="Vendor" value={product.vendor} />
                  <Info label="SKU" value={product.sku} />
                  <Info label="Category" value={product.category} />
                  <Info label="Price" value={product.price} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <span className="px-3 py-1.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-medium">
                  Pending Review
                </span>
                <button className="h-10 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition border border-red-500/30">
                  Reject
                </button>
                <button className="h-10 px-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition border border-green-500/30">
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No products found</p>
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
