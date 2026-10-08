import '../../styles/about/PropertyCategories.css';

const categories = [
  { icon: '🏠', name: 'Rental Houses' },
  { icon: '🏢', name: 'Apartments' },
  { icon: '🎓', name: 'Student Hostels' },
  { icon: '🏨', name: 'Hotels' },
  { icon: '🛏️', name: 'Short-Stay / Airbnb' },
  { icon: '🏡', name: 'Estates' },
  { icon: '🏪', name: 'Commercial Properties' },
  { icon: '📍', name: 'Other Accommodation' },
  { icon: '🛍️', name: 'Shops' },
  { icon: '🍽️', name: 'Restaurants' },
  { icon: '💊', name: 'Pharmacies' },
  { icon: '🏋️', name: 'Gyms' },
  { icon: '⛪', name: 'Churches' },
  { icon: '🏫', name: 'Schools' },
  { icon: '🏦', name: 'Banks' },
  { icon: '⛽', name: 'Fuel Stations' },
];

function PropertyCategories() {
  return (
    <div className="property-categories">
      <div className="categories-header">
        <p>WHAT CAN YOU FIND?</p>
        <h2>Properties For Every Need</h2>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.name}>
            <span>{category.icon}</span>
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <button className="many-more-btn">+ Many More...</button>
    </div>
  );
}

export default PropertyCategories;