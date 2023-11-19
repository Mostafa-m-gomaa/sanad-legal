import React from 'react'
import './footer.css'
import logo from '../../assets/logo.jpg'
import { BsWhatsapp } from 'react-icons/bs';
import { SiGmail} from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
        <div className="container">
            <div className="top">
                <div className="links">
            <a href="https://wa.me/00201556670378"><BsWhatsapp/></a>
            <a href=""><SiGmail/></a>
                </div>
                <div className="med">
                    <Link to="/who-us" >من نحن</Link>
                    <Link to="/contact" >تواصل معنا</Link>
                </div>
                <img src={logo} alt="" />
            </div>
        </div>
        <hr />
        <div className="container">
            <div>جميع الحقوق محفوظة لشركة سند القانونية</div>
        </div>
    </div>
  )
}

export default Footer
