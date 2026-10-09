import '../../styles/about/AboutHeroSection.css'
import heroImg from '../../assets/aboutherosection.jpg'
import { LuMapPin } from 'react-icons/lu'

function AboutHeroSection() {
  return (
        <div 
          className="about-hero-section"
          style={{ '--about-hero-image': `url(${heroImg})` }}>

          <div className="hero-overlay">


            {/* Main content on top of image */}

            <div className="hero-content">

              <span className="hero-label">ABOUT US</span>

              <h1 className="hero-title">
                Find a Place. Connect. <span className="green-text">Move In.</span>
              </h1>
              <p className="hero-description">
                Discover homes, hostels, hotels, apartments, and more, all in 
                one place. We connect you with properties across Ghana, making 
                it easier to find a place that fits your needs.
              </p>

              <div className="hero-buttons">
                <button className="hero-btn primary">Explore Properties →</button>
                <button className="hero-btn secondary">List Your Property</button>
              
              </div>
          
            </div>

            {/* Bottom bar with tags and location */}

            <div className="hero-bottom-bar">

              <div className="hero-tags">
                    
                    <span>RIDE</span>
                    <span>|</span>
                    <span>RENT</span>
                    <span>|</span>
                    <span>SHOP</span>
                    <span>|</span>
                    <span>FOOD</span>

              </div>

              <div className="hero-location">
                <LuMapPin aria-hidden="true" />
                <span>Accra, Ghana</span>
              </div>

            </div>

          </div>
          
        </div>
  )
}

export default AboutHeroSection