import '../styles/CTABanner.css'
import ctaImg from '../assets/cta-background.jpg'

function CTABanner() {
  return (
    <div 
      className="cta-banner"
      style={{ backgroundImage: `url(${ctaImg})` }}
    >
      {/* Dark overlay */}
      <div className="cta-overlay">

        <div className="cta-content">

          <h2>Your Next Place Could Be Just a Search Away.</h2>

          <p>
            Whether you're looking for somewhere to live, stay, invest, 
          or list your property, we're building a simpler way to connect 
          people with properties across Ghana.
          </p>

          <div className="cta-buttons">
            <button className="cta-btn primary">Explore Properties →</button>
            <button className="cta-btn secondary">List Your Property →</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CTABanner