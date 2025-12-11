// Admin Catalog page
import React from 'react';

export const AdminCatalogPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Catalog</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold mb-2">Categories</h3>
          <p className="text-gray-600 text-sm mb-4">Manage product categories</p>
          <button className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600\">
            Manage
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold mb-2">Brands</h3>
          <p className="text-gray-600 text-sm mb-4">Manage vehicle brands</p>
          <button className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600\">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};
