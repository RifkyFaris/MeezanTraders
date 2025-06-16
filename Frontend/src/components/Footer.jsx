import { FaFacebook,FaWhatsapp,FaLocationDot  } from "react-icons/fa6";
import { IoMail,IoCall  } from "react-icons/io5";
const Footer = () => {
  return (
    <div className="container">
    <div className="footerContainer">
        <div className="footer">
          <div className="col1">
            <img src="meezanlogo.png" className="footerLogo"/>
            <p className="meezan">Meezan Traders offers the finest selection of groceries, providing top-quality pantry staples,
               grains, spices, and everyday essentials.Trust Meezan Traders for freshness, excellence, and unbeatable value in every product.</p>
               <div className="socials">
                <FaFacebook  
                                        color={'#128580'}
                                        size="1.4em"
                                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                                        
                                        
                                    />
                                    <FaWhatsapp  
                                        color={'#128580'}
                                        size="1.4em"
                                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                                        
                                        
                                    />
                                    <IoMail  
                                        color={'#128580'}
                                        size="1.4em"
                                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                                        
                                        
                                    />
                                    <IoCall   
                                        color={'#128580'}
                                        size="1.4em"
                                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                                        
                                        
                                    />
                                    <FaLocationDot  
                                        color={'#128580'}
                                        size="1.4em"
                                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                                        
                                        
                                    />
               </div>
               
          </div>
          <div className="col2">
            <div className="col21">
              <a href="index.html"><p className="footerLink">Home</p></a>
              <a href="#"><p className="footerLink">Shop</p></a>
              <a href="#"><p className="footerLink">Products</p></a>
              <a href="#"><p className="footerLink">Delivery Areas</p></a>
              <a href="#"><p className="footerLink">FAQ</p></a>
            </div>
            <div className="col22">
              <a href="#"><p className="footerLink">Help</p></a>
              <a href="#"><p className="footerLink">Support</p></a>
              <a href="#"><p className="footerLink">Privacy Policy</p></a>
              <a href="#"><p className="footerLink">Refud Policy</p></a>
              <a href="#"><p className="footerLink">Terms & Conditions</p></a>
            </div>
          </div>
          <div className="col3">
            <h3 className="accepted">ACCEPTED PAYMENT METHODS</h3>
            <div className="paymentImages">
              <img src="american.png" className="paymentlogo"/>
              
              <img src="visa.png" className="paymentlogo"/>
              
              <img src="mastercard.png" className="paymentlogo"/>
              
              <img src="cod.png" className="paymentlogo"/>
              
              <img src="transfer.png" className="paymentlogo"/>
            </div>
            <p className="meezan">We ensure secure online payments through trusted gateways. 
              All transactions are encrypted, ensuring your payment details are safe and secure.</p>
          </div>
        </div>
        
        <p className="copyright">© Copyright 2024, All Rights Reserved by MeezanTraders.lk</p>
      </div>

    </div>
    
  

  )
}

export default Footer
