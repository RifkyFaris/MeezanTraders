import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingInfo } from "./slice/cartSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {Link} from 'react-router-dom'

export const validateShipping = (shippingInfo, navigate) => {
  useEffect(() => {
        window.scrollTo(0, 0);
        
      },)
   
  if(!shippingInfo.address) {
          toast.error('Please fill the shipping information')
          navigate('/shipping')
  }
} 

export default function Shipping(){
  const { shippingInfo = { address: "", city: "", phoneNo: ""} } = useSelector(state => state.cartState);
  const [address,setAddress] =useState(shippingInfo.address)
    const [city,setCity] =useState(shippingInfo.city)
    const [phoneNo,setPhoneNo] =useState(shippingInfo.phoneNo)
    const [postalCode,setPostalCode] =useState(shippingInfo.postalCode)
    const [country,setCountry] =useState(shippingInfo.country)
    const [district,setDistrict] =useState(shippingInfo.state)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingInfo({address,city,phoneNo,postalCode,country,district}))
        navigate('/order/confirm')
    }
  
    return (
    <div className="container">
       <div className='register'>
      
      <p className="login-title">Shipping Info</p>
            
            <div className="form-div">
  
              <form onSubmit={submitHandler}>
                <label className="label" htmlFor="address">Address</label><br/>
                <input type="text" id='address' value={address} required onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Address"/><br/><br/>
                
                
                
                

                
                <label className="label"  htmlFor="phone">Phone</label><br/>
                <input type="tel" id="district" value={phoneNo}  onChange={(e)=>setPhoneNo(e.target.value)} required placeholder="Enter Phone Number"/>
                
                <br/><br/>
                <input type="submit" id="pay_btn" className="submit" value="Confirm Order"/>
                
                
            
              </form>
              <Link to="/"><p className="continue">Continue Shopping</p></Link>
              
            </div>
    </div>
    </div>
   
  )
}

