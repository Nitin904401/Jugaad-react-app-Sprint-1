import { useState, useMemo } from 'react';
import PartCard from '../components/PartCard';
import { featuredParts, partCategories } from '../data/mockData';
import './PartsList.css';

export default function PartsList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [condition, setCondition] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Generate more parts for realistic listing
  const allParts = useMemo(() => {
    return [...featuredParts, ...featuredParts, ...featuredParts].map((part, idx) => ({
      ...part,
      id: part.id + idx * 100
    }));
  }, []);

  // Filter and sort logic
  const filteredParts = useMemo(() => {
    let parts = allParts;

    // Filter by category
    if (selectedCategory !== 'all') {
      parts = parts.filter(part => part.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      parts = parts.filter(part => 
        part.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by condition
    if (condition !== 'all') {
      parts = parts.filter(part => part.condition === condition);
    }

    // Filter by price (basic implementation)
    parts = parts.filter(part => {
      const price = parseInt(part.price.replace(/[^0-9]/g, '')) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    if (sortBy === 'price-low') {
      parts.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      parts.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceB - priceA;
      });
    }

    return parts;
  }, [allParts, selectedCategory, searchTerm, condition, priceRange, sortBy]);

  return (
    <div className="parts-list-container">
      <div className="parts-header">
        <h1>Car Spare Parts</h1>
        <p className="results-count">Found {filteredParts.length} parts</p>
      </div>

      <div className="parts-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              <label>
                <input 
                  type="radio" 
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory('all')}
                />
                All Parts
              </label>
              {partCategories.map(cat => (
                <label key={cat.id}>
                  <input 
                    type="radio"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(cat.id)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Condition</h3>
            <div className="filter-options">
              <label>
                <input 
                  type="radio"
                  checked={condition === 'all'}
                  onChange={() => setCondition('all')}
                />
                All Conditions
              </label>
              <label>
                <input 
                  type="radio"
                  checked={condition === 'New'}
                  onChange={() => setCondition('New')}
                />
                New
              </label>
              <label>
                <input 
                  type="radio"
                  checked={condition === 'Used'}
                  onChange={() => setCondition('Used')}
                />
                Used
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input 
                type="number" 
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              />
              <span>-</span>
              <input 
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200000])}
              />
            </div>
            <div className="price-range">
              <input 
                type="range"
                min="0"
                max="200000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="parts-main">
          {/* Search and Sort Bar */}
          <div className="search-sort-bar">
            <div className="search-box">
              <input 
                type="text"
                placeholder="Search parts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="sort-box">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Parts Grid */}
          {filteredParts.length > 0 ? (
            <div className="parts-grid">
              {filteredParts.map(part => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No parts found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}

          {/* Pagination */}
          {filteredParts.length > 0 && (
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="pagination-info">
                Showing {Math.min(12, filteredParts.length)} of {filteredParts.length} results
              </span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
