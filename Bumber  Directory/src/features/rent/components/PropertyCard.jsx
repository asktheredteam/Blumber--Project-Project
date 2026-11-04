import '../../../styles/rent/PropertyCard.css'

function PropertyCard({ property, userLocation, distanceKm }) {
  const primaryImage = property.images?.[0] || ''
  const distanceLabel =
    Number.isFinite(distanceKm) && distanceKm >= 0
      ? `${distanceKm.toFixed(1)} km away`
      : 'Nearby'

  return (
    <article className="rent-property-card">
      <div className="rent-property-card__image-wrap">
        <img
          src={primaryImage}
          alt={property.title}
          className="rent-property-card__image"
        />
        <button
          type="button"
          className="rent-property-card__like"
          aria-label={`Save ${property.title}`}
        >
          ♡
        </button>
        {property.images?.length > 1 && (
          <span className="rent-property-card__image-count">
            {property.images.length} photos
          </span>
        )}
      </div>

      <div className="rent-property-card__details">
        <div className="rent-property-card__header-row">
          <div>
            <h3>{property.title}</h3>
            <p className="rent-property-card__location">📍 {property.location}</p>
          </div>
          <span className="rent-property-card__rating">★ {property.rating}</span>
        </div>

        <div className="rent-property-card__meta">
          <span>{property.beds} bed</span>
          <span>{property.baths} bath</span>
          {property.kitchen > 0 && <span>{property.kitchen} kitchen</span>}
          <span>{property.furnishing}</span>
        </div>

        <div className="rent-property-card__amenities">
          {property.amenities?.slice(0, 3).map((amenity) => (
            <span key={amenity}>{amenity}</span>
          ))}
        </div>

        <p className="rent-property-card__description">{property.description}</p>

        <div className="rent-property-card__footer">
          <div>
            <div className="rent-property-card__price-row">
              <span className="rent-property-card__price">
                GH₵{property.price.toLocaleString()}
              </span>
              <span className="rent-property-card__period">/{property.rentalPeriod}</span>
            </div>
            <div className="rent-property-card__status-row">
              <span className="rent-property-card__status">{property.availability}</span>
              {userLocation && (
                <span className="rent-property-card__distance">{distanceLabel}</span>
              )}
            </div>
          </div>

          <div className="rent-property-card__actions">
            <button type="button" className="rent-property-card__secondary">
              View Details
            </button>
            <button type="button" className="rent-property-card__primary">
              Contact Landlord
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
