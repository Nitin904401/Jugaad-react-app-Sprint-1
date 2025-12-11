import './PartCard.css';

export default function PartCard({ part }) {
  return (
    <div className="part-card">
      <div className="part-image-wrapper">
        <div className="part-badge">New</div>
        <img src={part.image} alt={part.title} className="part-image" />
        <button className="wishlist-btn">♡</button>
      </div>

      <div className="part-body">
        <h3 className="part-title">{part.title}</h3>

        <div className="part-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-count">(42)</span>
        </div>

        <div className="part-price-section">
          <span className="part-price">{part.price}</span>
          <span className="original-price">₹2,500</span>
        </div>

        <div className="part-info">
          <div className="info-item">
            <span className="info-label">Stock:</span>
            <span className={`info-value ${part.availability === 'In Stock' ? 'in-stock' : 'out'}`}>
              {part.availability}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Condition:</span>
            <span className="info-value">{part.condition}</span>
          </div>
        </div>

        <div className="part-delivery">
          <span className="delivery-icon">🚚</span>
          <span className="delivery-text">{part.delivery}</span>
        </div>

        <div className="part-seller">
          <small>{part.seller}</small>
        </div>

        <div className="part-actions">
          <button className="btn-primary">Buy Now</button>
          <button className="btn-secondary">Compare</button>
        </div>
      </div>
    </div>
  );
}
