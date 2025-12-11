// ProductCard component
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../api/products';
import { Button } from '../common/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col border border-gray-100 hover:border-primary-300">
        {/* Image Container */}
        <div className="relative bg-gray-100 overflow-hidden h-48 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
            -{Math.round((((product.originalPrice - product.price) / product.originalPrice) * 100))}%
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full shadow-md hover:bg-primary-100 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            ❤️
          </button>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors text-sm">
            {product.title}
          </h3>

          {/* Vendor Info */}
          <p className="text-xs text-gray-500 mb-3">{product.vendorName}</p>

          {/* Price Section */}
          <div className="mb-4 mt-auto">
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-lg font-bold text-primary-600">₹{product.price.toLocaleString()}</p>
              <p className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm font-semibold text-gray-900">{product.vendorRating}</span>
              <span className="text-xs text-gray-500">(124)</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          {onAddToCart && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
              className="w-full bg-primary-50 hover:bg-primary-100 text-primary-600 font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-105 group-hover:bg-primary-600 group-hover:text-white"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
