// Vendor Add/Edit Product page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const VendorProductEditPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    stock: '',
    warranty: '',
    condition: 'New'
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Product saved successfully!');
    navigate('/vendor/products');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-gray-200 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
              >
                <option value="">Select Category</option>
                <option value="engine">Engine</option>
                <option value="brakes">Brakes</option>
                <option value="transmission">Transmission</option>
                <option value="wheels">Wheels</option>
                <option value="exhaust">Exhaust</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Warranty</label>
              <input
                type="text"
                name="warranty"
                placeholder="e.g., 2 Years"
                value={formData.warranty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg">
              Save Product
            </Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/vendor/products')}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
