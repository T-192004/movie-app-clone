import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-icons-box">
      <FaGoogle className="footer-icons" />
      <FaTwitter className="footer-icons" />
      <FaInstagram className="footer-icons" />
      <FaYoutube className="footer-icons" />
    </div>
    <p className="footer-caption">Contact us</p>
  </div>
)

export default Footer
