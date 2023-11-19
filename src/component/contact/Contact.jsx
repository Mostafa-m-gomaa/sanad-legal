import React from 'react'
import './contact.css'
import { BsWhatsapp } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { AiTwotoneHome} from 'react-icons/ai';
import { SiGmail} from 'react-icons/si';


const Contact = () => {

  return (
  <div className="contact">
    <div className="container">
        <h1>تواصل معنا</h1>
        <div className="cards">
            <div className="card whats">
            
            <a href="https://wa.me/00201556670378"><BsWhatsapp /></a>

            </div>
            <div className="card phone">
        <BsFillTelephoneFill />
        <div>00201556670378</div>
            </div>
            <div className="card address">
       <AiTwotoneHome />
       {/* <div>الإسكندرية، حي الشاطبي ، عمارة رقم (11) شارع عبد الحميد أبو هيف تقاطع شارع محمد حجاب</div> */}
            </div>
            <div className="card mail">
      <a href="mailto:saeed@sanad-legal.com"> <SiGmail /></a> 
       
            </div>
        </div>
    </div>
  </div>
  )
}

export default Contact
