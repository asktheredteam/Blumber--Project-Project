import '../styles/PlatformInfo.css'
import platformImg from '../assets/plaforminfoimg.jpg'

function PlatformInfo() {

return (

            <div className="platform-info">

            
            <div className="platform-content">

                <p>ABOUT THE PLATFORM</p>

                <h2>Making Property Search Simpler in Ghana</h2>     

                <p>Property information is often scattered across different platforms, social media, agents, and personal contacts. Our platform brings it all together in one convenient place, helping you discover properties,
                     explore your options, and connect directly with 
                     owners across Ghana.Whether you're searching for a home, hostel, apartment, hotel,
                      short-stay accommodation, or estate, 
                      we're here to make your search easier
                     </p>       

                <p>Our platform brings property seekers and property owners together
                     in one convenient digital space. Whether you’re looking for a home, hostel, 
                     apartment, hotel, short-stay accommodation, or estate,  etc 
                     you can easily explore available properties, check details, find locations,
                      and connect with owners. Property owners can also showcase 
                    and manage their properties while reaching more potential customers.
                    </p>       
            </div>

            
            <div className="platform-image">
                <img src={platformImg} alt="Property in Ghana" />
                <div className="location-tag">
                📍 Accra, Ghana
                </div>
            </div>

            </div>


)

}

export default PlatformInfo