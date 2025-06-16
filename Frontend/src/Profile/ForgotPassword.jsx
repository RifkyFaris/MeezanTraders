import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {forgotPassword as fp,clearAuthError} from './actions/userActions'

import { Link } from 'react-router-dom'


const ForgotPassword = () => {
    const [phoneNo,setPhoneNo]=useState("")
    const dispatch=useDispatch()
    const{loading,error,user,message}=useSelector(state=>state.authState)
    const submitHandler=(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append('phoneNo',phoneNo)
        dispatch(fp(formData))
    }
    useEffect(()=>{
        if(message){
            toast.success(message)
            setPhoneNo("")
        return;
        }
        
        if(error){
            toast(error,{
                type:'error',
                onOpen:()=>{dispatch(clearAuthError)}
            })
                                            
        return
        }
    },[message,error,dispatch])
  return (
    <div className="container">
      
      <div className="login">
          <p className="login-title">Forgot Password</p>
          
          <div className="form-div">

            <form onSubmit={submitHandler} >
              <label className="label" for="phone">Enter Registered phone number</label><br/>
              <input type="tel" id='phone' required value={phoneNo} onChange={e=>setPhoneNo(e.target.value)} placeholder="077 111 2255"/>
              <br/><br/>
              <input type="submit" className="submit" value="Request password reset"/>
              
            <Link  to="/user/register"><p className="dont">Don't have an account ?</p></Link>
          
            </form>
            
          </div>
        </div>
      
    </div>
  )
}

export default ForgotPassword
