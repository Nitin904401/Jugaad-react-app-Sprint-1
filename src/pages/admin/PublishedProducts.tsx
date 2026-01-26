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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfWVgAX7hydj0Kn0Sj4KQ-qcZJElyV9uZAkxlXV1KItlkGbCrExvdmv2vge4cZKvb_L-f7N55mdI2Xoxn2lZdvMSypGUK6uaxxZuwoAVqFigF7XOSCR5zdQryEzTv3lgvpOA5egWW3q98C5DUm3ei_sxraAlOxIFIxF5QCf1iNkJyBaks4iGyV0W36-Okzg7jBpNQAgaV7ETTmyyCnzVsx5T6bQl3foG_IXe7j2XyQIhBRuVPtQ33CzsK8BspmejzJEY81ZnXS6Fj6',
  },
];

export const AdminPublishedProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

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

        {/* Search */}
        <input
          placeholder="Search by name, SKU, or manufacturer..."
          className="w-full h-12 px-4 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 border border-white/10 focus:border-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Scrollable Product List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 pr-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/50 transition"
          >
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="flex gap-6 flex-1">
                <div
                  className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0 border border-white/10"
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 flex-1">
                  <Info label="Product" value={product.name} />
                  <Info label="Vendor" value={product.vendor} />
                  <Info label="SKU" value={product.sku} />
                  <Info label="Category" value={product.category} />
                  <Info label="Live Price" value={product.price} highlight />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full font-medium">
                  Published
                </span>

                

                <button className="h-10 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-medium transition">
                  Unpublish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-between items-center text-sm text-slate-400">
        <p>
          Showing <span className="text-white">1-3</span> of <span className="text-white">128</span> products
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
