// Product Detail page
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProducts } from '../../api/products';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { ProductGrid } from '../../components/product/ProductGrid';
import { useCart } from '../../context/CartContext';

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((data) => {
        setProduct(data);
        // Get related products
        getProducts().then((allProducts) => {
          const related = allProducts.filter((p: any) => p.category === data?.category && p.id !== data?.id);
          setRelatedProducts(related.slice(0, 4));
        });
      });
    }
  }, [productId]);

  if (!product) return <Loader fullPage />;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  // Mock data for reviews and rating breakdown
  const reviews = [
    {
      name: 'Auto Parts Overview',
      date: 'Available Now',
      rating: 5,
      text: 'AutoPartsKit is your one-stop destination for a wide variety of auto parts. Our platform connects you with multiple vendors, ensuring that the selection, pricing, and quality are unparalleled. With detailed descriptions and expert insights, it makes informed purchasing decisions. Enjoy a seamless shopping experience with easy navigation and a user-friendly cart system!',
      likes: 0,
      avatar: null,
      isOverview: true,
    },
    {
      name: 'Liam',
      date: '18 March 2023',
      rating: 5,
      text: 'I’ve purchased several parts from AutoPartsKit, and my experience has been fantastic! The website is easy to use, and I found everything I needed quickly. The detailed descriptions helped me choose the right parts for my car. I highly recommend it for anyone looking for auto spares.',
      likes: 4,
      avatar: null,
      isOverview: false,
    },
    {
      name: 'Sophia',
      date: '28 March 2023',
      rating: 5,
      text: 'AutoPartsKit has transformed my car maintenance routine! The variety of parts available is impressive, and the checkout process is smooth. I even got advice for the best fitting, which was helpful. I’m so impressed with discovery and purchase. This site is a game-changer! 10/10 for service.',
      likes: 3,
      avatar: null,
      isOverview: false,
    },
  ];
  const ratingStats = [
    { stars: 5, count: 200 },
    { stars: 4, count: 25 },
    { stars: 3, count: 8 },
    { stars: 2, count: 2 },
    { stars: 1, count: 4 },
  ];
  const avgRating = 4.7;
  const totalReviews = 239;

  return (
    <div className="space-y-12 w-full">
      {/* Product Top Section */}
      <div className="w-full bg-white rounded-none shadow-none px-2 md:px-8 py-2 flex flex-col md:flex-row gap-8 mt-2 md:mt-4">
        {/* Image */}
        <div className="flex-shrink-0 flex items-start">
          <img
            src={product.image}
            alt={product.title}
            className="w-64 h-64 object-cover rounded-xl border border-gray-200 shadow"
          />
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.title}</h1>
          <div className="text-gray-600 text-base mb-2">{product.vendorName}</div>
          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-bold text-gray-900">{avgRating}</span>
              <span>({totalReviews} reviews)</span>
            </span>
            <span>Published by: <span className="font-semibold text-gray-700">{product.vendorName}</span></span>
            
          </div>
          {/* Warranty, Delivery, Category Row */}
          <div className="flex flex-wrap gap-4 mb-2">
            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 text-sm">
              <span className="text-gray-600">Warranty: </span>
              <span className="font-bold text-gray-900">{product.warranty}</span>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200 text-sm">
              <span className="text-gray-600">Delivery: </span>
              <span className="font-bold text-gray-900">{product.delivery}</span>
            </div>
            <div className="bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200 text-sm">
              <span className="text-gray-600">Category: </span>
              <span className="font-bold text-gray-900 capitalize">{product.category}</span>
            </div>
          </div>
          {/* Description */}
          <div className="text-gray-700 text-base mb-4">
            {product.description || 'This Ultimate Brake Kit by AutoTech Solutions is your go-to guide for understanding the importance of high-quality braking systems. It includes everything you need for professional results: heat-resistant materials, high-strength pads, guide installation videos, and warranty for total peace of mind. Enhance your vehicle’s braking efficiency with this comprehensive resource.'}
          </div>
          {/* Actions Row */}
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <Button size="md" onClick={handleAddToCart} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded">
              {showAdded ? '✅ Added to Cart!' : 'Add to cart'}
            </Button>
            <div className="font-bold text-lg text-gray-900">₹{product.price.toLocaleString()}</div>
            <Button size="md" variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-2 rounded">
              Buy Now
            </Button>
          </div>
          {/* Quantity Row */}
          <div className="flex items-center gap-2 mb-2">
            <label className="font-semibold text-gray-900">Qty:</label>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 text-lg text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center font-bold border-0 focus:outline-none"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-2 py-1 text-lg text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-500">({product.stock} available)</span>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="w-full bg-white rounded-none shadow-none px-2 md:px-8 py-2 mt-2 md:mt-4">
        <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Average Rating */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="text-4xl font-bold text-gray-900">{avgRating} <span className="text-yellow-500">★</span></div>
            <div className="text-lg text-gray-700 font-semibold mb-2">/ 5</div>
            <div className="text-gray-500 mb-2">{totalReviews} reviews</div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(avgRating) ? 'text-yellow-500' : 'text-gray-300'}>★</span>
              ))}
            </div>
          </div>
          {/* Middle: Rating Breakdown */}
          <div className="flex-1 flex flex-col justify-center">
            {ratingStats.map((stat) => (
              <div key={stat.stars} className="flex items-center gap-2 mb-1">
                <span className="w-8 text-sm text-gray-700">{stat.stars} ★</span>
                <div className="flex-1 bg-gray-200 rounded h-3">
                  <div
                    className={`bg-green-500 h-3 rounded`}
                    style={{ width: `${(stat.count / ratingStats[0].count) * 100}%` }}
                  ></div>
                </div>
                <span className="w-8 text-xs text-gray-500 text-right">{stat.count}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Review Cards */}
        <div className="mt-8 space-y-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="flex gap-4 items-start border-b pb-6 last:border-b-0">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  review.name[0]
                )}
              </div>
              {/* Review Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{review.name}</span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                  <span className="flex gap-1 ml-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                    ))}
                  </span>
                </div>
                <div className="text-gray-700 text-sm mb-2">{review.text}</div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1 cursor-pointer hover:text-primary-600"><span>👍</span> {review.likes}</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-primary-600"><span>💬</span> Reply</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16 w-full">
          <div className="w-full px-2 md:px-8">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}
    </div>
  );
};
