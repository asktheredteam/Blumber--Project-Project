import React from 'react'
import Navbar from '../components/Navbar'
import AboutHeroSection from '../components/AboutHeroSection'
import PlatformInfo from '../components/PlatformInfo'
import PropertyCategories from '../components/PropertyCategories'
import HowItWorks from '../components/Howitworks'
import MissionVision from '../components/MissionVision'
import WhyChooseUs from '../components/WhyChooseUs'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'



function AboutPage() {
  return (
    <div className="about-page">
      <Navbar />
      <AboutHeroSection />
      <PlatformInfo />
      <PropertyCategories />
      <HowItWorks />
      <MissionVision/>
      <WhyChooseUs/>
      <CTABanner />
      <Footer />
    </div>
  )
}

export default AboutPage