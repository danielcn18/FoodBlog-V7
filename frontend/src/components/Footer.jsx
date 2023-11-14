import icon1 from '../public/instagram_icon.png'
import icon2 from '../public/facebook_logo.png'
import icon3 from '../public/twitter_icon.png'

export default function Footer() {
  return(
    <footer className="footer">
      <div className='link-box'>
        <div className="footer-links" id='contact'>
          <a href="#" className="footer-link">Contact:</a>
            <div className="social-icons">
              <a href="#"><img src={icon1} alt="Instagram Logo" /></a>
              <a href="#"><img src={icon2} alt="Facebook Logo" /></a>
              <a href="#"><img src={icon3} alt="Twitter Logo" /></a>
            </div>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Support</a>
          <a href="#" className="footer-link">Contact</a>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Creators Handbook</a>
          <a href="#" className="footer-link">Terms of Use</a>
          <a href="#" className="footer-link">Privacy Policy</a>
        </div>
      </div>
      <br/>
      <br/>
      <div className="footer-copyright">
        © World Kitchen Wonders 2023
      </div>
    </footer>
  );
}