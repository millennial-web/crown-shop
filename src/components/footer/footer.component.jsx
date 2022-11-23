import { Link } from 'react-router-dom'
import Modal from '../modal/modal.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { AiFillFacebook, AiFillTwitterSquare,  AiFillInstagram} from 'react-icons/ai';

const Footer = () => {
  return (
    <>
      <div className='footer-container'>
        <div className='logo-container'>
          <Link className='logo-link' to='/'>
            <CrwnLogo className='logo'/>
          </Link>
        </div>
        <div className='footer-links'>
          <Link className='footer-link' to='/faqs'>
            <span>FAQs</span>
          </Link>
          <Link className='footer-link' to='/subscribe'>
            <span>Subscribe</span>
          </Link>
          <Link className='footer-link' to='/contact'>
            <span>Contact</span>  
          </Link>
        </div>
        <div className="social-links">
          <a className='social-link' href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <AiFillFacebook />
          </a>
          <a className='social-link' href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <AiFillInstagram />
          </a>
          <a className='social-link' href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <AiFillTwitterSquare />
          </a>
        </div>
        <div className="copy">
          <p>&copy; {new Date().getFullYear()} Crown Clothing Inc.</p>
        </div>
      </div>
      <Modal title="Items Added to Cart"/>
    </>
  )
};

export default Footer;
