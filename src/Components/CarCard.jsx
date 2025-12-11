import './CarCard.css';

export default function CarCard({ car }) {
  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={car.title} />
      </div>
      <div className="car-content">
        <h3 className="car-title">{car.title}</h3>
        
        <div className="car-specs">
          <div className="spec-item">
            <span className="spec-label">Availability:</span>
            <span className="spec-value">{car.availability}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Condition:</span>
            <span className="spec-value">{car.condition}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Delivery:</span>
            <span className="spec-value">{car.delivery}</span>
          </div>
        </div>

        <div className="car-seller">
          <small>Seller: {car.seller}</small>
        </div>

        <div className="car-actions">
          <button className="btn-whatsapp">WhatsApp</button>
          <a href={`tel:${car.phone}`} className="btn-call">Click to Call</a>
        </div>
      </div>
    </div>
  );
}
