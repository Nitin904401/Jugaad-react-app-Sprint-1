// Admin Products page
import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api/products';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Products</h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Product Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Vendor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{product.title.substring(0, 30)}</td>
                <td className="px-6 py-4 text-sm">{product.vendorName}</td>
                <td className="px-6 py-4 text-sm">₹{product.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm capitalize">{product.category}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-primary-500 hover:underline">View</button>
                  <button className="text-red-500 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
