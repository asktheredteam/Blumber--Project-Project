import '../styles/Howitworks.css'

function HowItWorks() {

  const seekerSteps = [
    { number: '01', icon: '🔍', title: 'Search', desc: 'Enter a location and choose the type of property' },
    { number: '02', icon: '📋', title: 'Explore', desc: 'Compare available properties, prices and facilities' },
    { number: '03', icon: '💬', title: 'Connect', desc: 'Contact the property owner or manager' },
    { number: '04', icon: '📅', title: 'Book', desc: 'Submit a booking request' },
  ]

  const ownerSteps = [
    { number: '01', icon: '👤', title: 'Create an Account', desc: 'Register as a property owner' },
    { number: '02', icon: '📝', title: 'List Your Property', desc: 'Add property information and images' },
    { number: '03', icon: '✏️', title: 'Manage Listings', desc: 'Update your property information' },
    { number: '04', icon: '💬', title: 'Connect With Customers', desc: 'Receive inquiries and manage bookings' },
  ]

  return (
    <div className="how-it-works">

      {/* Section header */}
      <div className="how-it-works-header">
        <p>HOW IT WORKS</p>
        <h2>Easy Steps for a Better Experience</h2>
      </div>

      {/* Two columns */}
      <div className="Owners-seekers-columns">

        {/* Seekers column */}
        <div className="seekers-header">

          <div className="column-header seeker">
            <span>👤</span>
            <div>

              <h3>For Property Seekers</h3>
              <p>Find your next home or stay in just a few steps</p>
            </div>

          </div>

          <div className="steps-grid">
            {seekerSteps.map(step => (

              <div className="step-card" key={step.number}>

                <div className="step-number">{step.number}</div>

                <div className="step-icon">{step.icon}</div>

                <h4>{step.title}</h4>

                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Owners column */}
        <div className="owners-header">
          <div className="column-header owner">
            <span>🏠</span>
            <div>
              <h3>For Property Owners</h3>
              <p>List your property and reach more potential tenants</p>
            </div>
          </div>

          <div className="steps-grid">
            {ownerSteps.map(step => (

              <div className="step-card" key={step.number}>

                <div className="step-number">{step.number}</div>

                <div className="step-icon">{step.icon}</div>

                <h4>{step.title}</h4>

                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default HowItWorks