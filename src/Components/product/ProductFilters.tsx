// ProductFilters component
import React from 'react';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    category?: string;
    vendor?: string;
    priceRange?: [number, number];
  }) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange }) => {
  const categories = ['engine', 'transmission', 'brakes', 'wheels', 'exhaust'];
  const vendors = [
    'Premium Auto Parts',
    'Quick Spare Parts',
    'Original Parts Hub',
    'Budget Auto Store',
  ];
  // Single slider state for max price
  const [maxPrice, setMaxPrice] = React.useState(10000);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setMaxPrice(val);
    onFilterChange({ priceRange: [0, val] });
  };

  return (
    <aside className="bg-white shadow-lg rounded-2xl border border-gray-100 pt-0 px-6 pb-6 flex flex-col gap-8">
      <h3 className="font-bold text-xl mb-0 mt-3 text-center text-[#295BAC]">Filter Products</h3>
      <hr className="m-0 border-gray-200 -mt-5" />

      {/* Category Section */}
      <section>
        <h4 className="font-semibold text-base text-gray-700 mb-3 -mt-4">Category</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-50 cursor-pointer transition">
              <input
                type="checkbox"
                className="accent-primary-500 h-4 w-4"
                onChange={(e) => {
                  if (e.target.checked) {
                    onFilterChange({ category: cat });
                  }
                }}
              />
              <span className="text-sm capitalize text-gray-800">{cat}</span>
            </label>
          ))}
        </div>
      </section>

      <hr className="my-2 border-gray-200 -mt-3" />

      {/* Vendor Section */}
      <section>
        <h4 className="font-semibold text-base text-gray-700 mb-3 -mt-5">Vendor</h4>
        <div className="flex flex-col gap-2">
          {vendors.map((vendor) => (
            <label key={vendor} className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-50 cursor-pointer transition">
              <input
                type="checkbox"
                className="accent-primary-500 h-4 w-4"
                onChange={(e) => {
                  if (e.target.checked) {
                    onFilterChange({ vendor });
                  }
                }}
              />
              <span className="text-sm text-gray-800">{vendor}</span>
            </label>
          ))}
        </div>
      </section>

      <hr className="my-2 border-gray-200 -mt-3" />

      {/* Price Range Section with Single Slider */}
      <section>
        <h4 className="font-semibold text-base text-gray-700 mb-3 -mt-5">Price Range</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">0</span>
            <span className="text-sm text-gray-800 font-medium">₹{maxPrice}</span>
            <span className="text-sm text-gray-600">10000</span>
          </div>
          <input
            type="range"
            min={0}
            max={10000}
            value={maxPrice}
            onChange={handleSliderChange}
            className="w-full accent-primary-500"
          />
        </div>
      </section>
    </aside>
  );
};
