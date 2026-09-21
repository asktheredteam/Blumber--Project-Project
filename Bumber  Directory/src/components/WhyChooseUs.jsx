import '../styles/WhyChooseUs.css'

function WhyChooseUs() {

  const reasons = [
    { 
      icon: '💡', 
      title: 'One Platform', 
      desc: 'Discover different types of accommodation and properties in one place.' 
    },
    { 
      icon: '📍', 
      title: 'Location-Based Search', 
      desc: 'Find properties based on your preferred region, city, town or area.' 
    },
    { 
      icon: '👥', 
      title: 'Direct Connection', 
      desc: 'Connect directly with property owners or managers.' 
    },
    { 
      icon: '📅', 
      title: 'Convenient Booking', 
      desc: 'Make inquiries and booking requests without relying on physical searches.' 
    },
  ]

  return (
    <div className="why-choose-us">

      {/* Section header */}
      <div className="why-header">
        <p>WHY CHOOSE US</p>
        <h2>More than Just Another Listing  Platform</h2>
      </div>

      {/* 4 cards in a row */}
      <div className="why-cards">
        {reasons.map(reason => (
          <div className="why-card" key={reason.title}>
            <span>{reason.icon}</span>
            <h3>{reason.title}</h3>
            <p>{reason.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default WhyChooseUs