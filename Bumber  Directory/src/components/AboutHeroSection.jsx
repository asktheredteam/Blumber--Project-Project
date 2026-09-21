import '../styles/AboutHeroSection.css'
import heroImg from '../assets/aboutherosection.jpg'

function AboutHeroSection() {
  return (
    <div className="about-hero-section">
      {/* Left side */}
      <div className="hero-content">
      
        <p> About Us</p>
      
        <h1> Find a Place. Connect. Move In.</h1>
      
        <p>Discover homes, hostels, hotels, apartments, and more ,all in one place. We connect you with properties across Ghana,
             making it easier to find a place that fits your needs </p>

            <div>

                {/*about hero section buttons*/}

                <button className="hero-btn primary">Explore Properties →</button>
                <button className="hero-btn secondary">List Your Property</button>  
            </div>
      </div>

      {/* Right side */}

      <div className="hero-image">

        <img src={heroImg} alt="About Us" />

      </div>

    </div>
  );
}

export default AboutHeroSection;