import {Link} from 'react-router-dom'
import { useEffect } from 'react';
const OrderSuccess = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
        
      },)
  return (
    <div className='container'>
        <div className="register">
        <h2 style={{color:"black",padding:"20px"}}>Your Order has been placed successfully.</h2>
        <Link to="/"><button style={{color:"black",padding:"10px",marginLeft:"20px",cursor:"pointer",borderRadius:"6px"}}>Return to Home</button></Link>
        </div>
      
    </div>
  )
}

export default OrderSuccess
