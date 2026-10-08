import '../styles/Footer.css'


import { Link } from "react-router-dom";

import brandMark from "../assets/Applogo.jpeg";

const Columns =[
  {
      title: ' Company' ,
      links: [

                {name: 'About Us'  , link: '/about'},
                {name: 'Feature'  , link: '/feature'},
                {name: 'Services'  , link: '/Services'},
                {name: 'Contact'  , link: '/contact'},
      ]
  },

   {
      title: 'Services',

      links:  [ 
              {name: 'Rent '  , link: '/rent'},
                {name: 'Hotels'  , link: '/hotels'},
                {name: 'Rides'  , link: '/rides'},  
                {name: 'Restaurants'  , link: '/restaurants'},
                { name: 'Local Servicecs'  , link: 'local-services'},
                { name: 'More' , link: '/more'} 
              
              ]

   },

   {  
          title: 'Business' ,
          links:  [ 
              {name: 'Grow Your Business'  , link: '/grow-your-business'},
              {name: 'Business Registration'  , link: '/business-registration'},
              {name: 'List Your Property'  , link: '/list-your-property'},
              {name: 'Advertise With Us'  , link: '/advertise-with-us'},
              {name: 'Partner With Us'  , link: '/partner-with-us'},
          ]
   },
    

   {

         title: 'Support' ,
         links:  [ 
              {name: 'Help Center'  , link: '/help-center'},
              {name: 'FAQs'  , link: '/faqs'},
              {name: 'Contact'  , link: '/contact'},


 ] 

} , 


 {
          title: 'Legal' ,
          links:  [
              {name: 'Privacy Policy'  , link: '/privacy-policy'},
              {name: 'Terms of Service'  , link: '/terms-of-service'},
              {name: 'Cookie Policy'  , link: '/cookie-policy'},
          ]

   }


]




function Footer() {
  const Socials = ['Facebook', 'Twitter', 'Instagram', 'YouTube', 'LinkedIn', 'WhatsApp'];

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo">
              <Link to="/" className="logo-text">
                <img src={brandMark} alt="Bisajo home" className="logo-mark" />
              </Link>
            </div>
            <p>Ghana Housing &amp; Property Platform</p>
          </div>
          <p className="footer-copy-text">© 2026 BUMBER. All rights reserved.</p>
        </div>

        {/* Columns using .map() */}
        {Columns.map(column => (
          <div className="footer-col" key={column.title}>
            <h4>{column.title}</h4>
            {column.links.map(link => (
              <Link key={link.link} to={link.link}>
                {link.name}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="footer-bottom">
        {Socials.map(social => (
          <Link to="#" key={social}>
            {social}
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default Footer;


 