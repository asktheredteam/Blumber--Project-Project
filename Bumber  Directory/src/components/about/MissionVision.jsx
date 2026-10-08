import '../../styles/about/MissionVision.css'
import { LuCheck, LuEye, LuShieldCheck, LuTarget } from 'react-icons/lu'

function MissionVision() {
  const trustFeatures = [
    'Owner/account verification (planned)',
    'Property listing moderation',
    'User reporting',
    'Property reviews',
    'Booking records',
    'Secure communication (planned)',
    'Availability information',
  ]

  return (
    <div className="mission-vision">

      {/* Left side - Our Purpose */}
      <div className="purpose-side">
        <p className="section-label">OUR PURPOSE</p>

        <div className="mission-vision-cards">
          <div className="mv-card">
            <span className="icon-badge"><LuTarget aria-hidden="true" /></span>
            <h3>Our Mission</h3>

            <p>To make property discovery and accommodation booking
            in Ghana more accessible, organized, and convenient by
            connecting people with property owners through a trusted
            digital platform.</p>
          </div>

          <div className="mv-card">
            <span className="icon-badge"><LuEye aria-hidden="true" /></span>
            <h3>Our Vision</h3>
            <p>To be the leading digital platform for property
            discovering and connecting with property owners in Ghana,
            fostering a community of trusted connections between
            property owners and seekers.</p>
          </div>
        </div>
      </div>

      {/* Right side - Trust & Safety */}

      <div className="trust-side">
        <p className="section-label">TRUST & SAFETY</p>
        <h2>Built With Trust in Mind</h2>
        <p className="trust-desc">

            We understand that safety and trust are 
        important when it comes to property transactions. That's why we 
        include features like:
        
        </p>

        <div className="trust-content">
          <ul className="trust-list">
            {trustFeatures.map((feature) => (
              <li key={feature}>
                <span className="check"><LuCheck aria-hidden="true" /></span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="safety-badge">
            <div className="safety-icon"><LuShieldCheck aria-hidden="true" /></div>
            <p className="safety-text">Your safety<br />matters to us</p>
          </div>
        </div>

      </div>

    </div>
  )
}


export default MissionVision