import {  useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { createOrder } from './actions/orderActions.jsx'
import { orderCompleted } from './slice/cartSlice.jsx'
import { toast } from 'react-toastify'
import { useEffect } from "react"
const ConfirmOrder = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
      
    },)
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const {shippingInfo,items:cartItems}=useSelector(state=>state.cartState)
    const {user}=useSelector(state=>state.authState)
    const itemsPrice=cartItems.reduce((acc,item)=>(acc+item.price*item.quantity),0)
    
    const totalPrice=itemsPrice
    const placeOrderHandler = async() => {
    const order = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice,
        totalPrice
    }

    try {
        dispatch(orderCompleted()) // clear the cart
        dispatch(createOrder(order)) // save order
        toast.success("Order placed successfully")
        navigate('/order/success') // redirect
    } catch (error) {
        toast.error("Failed to place order")
        console.error(error)
    }
}
    

  return (
    <div className='container'>
      
      <div className="cartItem">
            <div className="cartitems">
                
                <p className="yourcart" >Shipping Info </p>
                
                <p className="shippingdetails" style={{ color: '#151f28' }}>Name: <b>{user.name}</b></p>
                
                <p className="shippingdetails" style={{ color: '#151f28', margin: '10px 0' }}>Address: <b>{shippingInfo.address}</b></p>
                
                <p className="shippingdetails" style={{ color: '#151f28' }}>Phone Number: <b>{shippingInfo.phoneNo}</b></p><br/>

                <p className="yourcart" >Your Cart: </p>
                {cartItems.map(item=>(
                <div className="carthr">
                    <hr/>

                <div className="cartdisplayitem">
                    
                    <img src={item.image} className="cartitemimage"/>
                    <p className="cartdisplayname">{item.name}</p>
                    <p className="cartdisplayprice">{item.quantity} x Rs. {item.price} = <b>Rs. {item.quantity*item.price}</b></p>
                    
                    
                </div>
            </div>
                ))}
           
            </div>
            <div className="ordersummary">
                <p className="orderSummarytitle">Order Summary</p>
                <hr/>
                <p className="noofitems">Subtotal: <b>Rs. {itemsPrice}</b></p>
                
                
                <br/>
                <hr/>
                <p className="noofitems">Total: <b>Rs. {itemsPrice}</b></p>
                <p className="profilebutton" onClick={placeOrderHandler}>Place Order</p>
            </div>
            
          
        </div>
      
    </div>
  )
}

export default ConfirmOrder
