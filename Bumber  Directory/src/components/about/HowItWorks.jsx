import '../../styles/about/HowItWorks.css'
import {
  LuCalendar,
  LuClipboardList,
  LuFileText,
  LuHouse,
  LuMessageCircle,
  LuPencil,
  LuSearch,
  LuUser,
} from 'react-icons/lu'

function HowItWorks() {

  const seekerSteps = [
    { number: '01', icon: LuSearch, title: 'Search', desc: 'Enter a location and choose the type of property' },
    { number: '02', icon: LuClipboardList, title: 'Explore', desc: 'Compare available properties, prices and facilities' },
    { number: '03', icon: LuMessageCircle, title: 'Connect', desc: 'Contact the property owner or manager' },
    { number: '04', icon: LuCalendar, title: 'Book', desc: 'Submit a booking request' },
  ]

  const ownerSteps = [
    { number: '01', icon: LuUser, title: 'Create an Account', desc: 'Register as a property owner' },
    { number: '02', icon: LuFileText, title: 'List Your Property', desc: 'Add property information and images' },
    { number: '03', icon: LuPencil, title: 'Manage Listings', desc: 'Update your property information' },
    { number: '04', icon: LuMessageCircle, title: 'Connect With Customers', desc: 'Receive inquiries and manage bookings' },
  ]

  return (
    <div className="how-it-works">

      {/* Section header */}
      
      <div className="how-it-works-header">
        <p>HOW IT WORKS</p>
        <h2>Easy Steps for a Better Experience</h2>
      </div>


      <div className="how-it-works-columns">

        {/* Seekers - light card */}
        <div className="steps-column seekers">
              <div className="column-header">
                
                    <div className="header-pill">
                      <span className="header-icon"><LuUser aria-hidden="true" /></span>

                          <div>
                                  <h3 className="column-title">For Property Seekers</h3>
                                  <p>Find your next home or stay in just a few steps</p>
                            </div>
                    </div>
              </div>
          <div className="steps-list">
                  {seekerSteps.map(({ number, icon: StepIcon, title, desc }) => (

                    <div className="step-item" key={number}>
                              <div className="step-number">
                                {number}
                                </div>

                              <div className="step-icon">
                                <StepIcon aria-hidden="true" />
                                </div>

                            <div className="step-text">

                                    <h4>
                                      {title}
                                    </h4>
                                    <p>
                                      {desc}
                                      </p>

                            </div>
                            
                    </div>
                  ))}
          </div>
        </div>

        {/* Owners - dark green card */}

        <div className="steps-column owners">

                    <div className="column-header">
                            <div className="header-pill">
                              <span className="header-icon"><LuHouse aria-hidden="true" /></span>

                            <div>
                                  <h3 className="column-title">
                                    For Property Owners
                                  </h3>
                                    <p>
                                      List your property and reach more potential tenants
                                      
                                      </p>
                            </div>
                            </div>
                    </div>
          <div className="steps-list">

            {ownerSteps.map(({ number, icon: StepIcon, title, desc }) => (
              <div className="step-item" key={number}>
                      <div className="step-number">
                        {number}
                      </div>

                      <div className="step-icon">
                        <StepIcon aria-hidden="true" />
                        </div>

                      <div className="step-text">

                        <h4>
                          {title}
                        </h4>

                        <p>
                          
                          {desc}
                          
                          </p>

                            </div>
                    </div>
                  ))}
                </div>

        </div>

      </div>
    </div>
  )
}

export default HowItWorks