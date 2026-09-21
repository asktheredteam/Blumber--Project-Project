import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">

      {/* Top section */}
      <div className="footer-top">

        {/* Left - Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>🏠</span>
            <div>
              <h3>BUMBER</h3>
              <p>Ghana Housing & Property Platform  </p>
            </div>
          </div>
        </div>

        {/* Right - Social */}
        <div className="footer-social">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">LinkedIn</a>
           <a href="#">WhatsApp</a> 
        </div>

      </div>

      {/* Bottom - Copyright */}
      <div className="footer-bottom">
        <p>© 2026  BUMBER. All rights reserved.</p>
      </div>

    </footer>
  )
}

export default Footer