import '../styles/PropertyCategories.css'

function PropertyCategories() {

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
  { icon: '➕', name: 'Many More...' },
  ]

  return (
    <div className="property-categories">

      {/* Section header */}
      <div className="categories-header">
        <p>WHAT CAN YOU FIND ?</p>
        <h2>Properties For Every Need</h2>
      </div>

      {/* Cards grid */}
      <div className="categories-grid">
        {categories.map(category => (
          <div 
          className={`category-card ${category.name === 'Many More...' ? 'more' : ''}`} 
            key={category.name}
       >
            <span> {category.icon} </span>
            <p> {category.name} </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PropertyCategories