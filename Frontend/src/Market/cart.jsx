import { IoTrashBin } from "react-icons/io5";
import {useSelector,useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { createOrder } from './actions/orderActions.jsx';
import { orderCompleted } from './slice/cartSlice.jsx';
import { toast } from 'react-toastify';
import {Fragment,useEffect}  from 'react'



import { decreaseCartItemQty,increaseCartItemQty,removeItemFromCart } from "./slice/cartSlice.jsx"

export default function cart(){
  const {items}=useSelector(state=>state.cartState)
  const shippingInfo = {
    address: "POS Order",
    phoneNo: "0542224281"
  };
  useEffect(() => {
      window.scrollTo(0, 0);
      
    },)
  const orderStatus="Delivered"
  
      const {isAuthenticated,user}=useSelector(state=>state.authState)
      const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const increaseQty = (item) => {
        const count=item.quantity
        if(item.stock==0 || count>=item.stock)return
        dispatch(increaseCartItemQty(item.product))
    };
    
    const decreaseQty = (item) => {
        const count=item.quantity
        if(count==1)return
        dispatch(decreaseCartItemQty(item.product))
    };
    const checkOutHandler=()=>{
      if (items.length === 0) {
      toast.warn("Cannot place order: missing address or empty cart");
      return;
    }else{
        navigate('/login?redirect=shipping')
    }
    
        
    }
    const placeOrderHandler = async () => {
    if (items.length === 0) {
      toast.warn("Cannot place order: missing address or empty cart");
      return;
    }

    const order = {
      orderItems: items,
      itemsPrice: totalPrice,
      totalPrice,
      shippingInfo,
      orderStatus:"Delivered"
    };

    try {
      dispatch(createOrder(order)) // assuming createOrder is an async thunk
      dispatch(orderCompleted()); // clear cart
      toast.success("Order placed successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Order failed");
      console.error(error);
    }
  };
  const printReceipt = (order) => {
  const receiptWindow = window.open('', '_blank', 'width=300,height=600');
  const receiptContent = `
    <html>
      <head>
        <style>
          body { font-family: monospace; width: 60mm; padding: 10px; }
          .receipt-title { text-align: center; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
          .line { border-top: 1px dashed #000; margin: 5px 0; }
          .item { font-size: 12px; margin-bottom: 4px; }
          .footer { margin-top: 10px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="receipt-title">Meezan Traders</div>
        <div class="receipt-title">No.22 Kotmale Road Nawalapitiya</div>
        <div class="receipt-title">0542224102</div>
        <div>Date: ${new Date().toLocaleString()}</div>
        <div class="line"></div>
        ${order.orderItems.map(item => `
          <div class="item">
            <div>${item.name}</div>
            <div style="display: flex; justify-content: space-between;">
              <span>${item.quantity} x Rs.${item.price}</span>
              <span>Rs.${item.quantity * item.price}</span>
            </div>
          </div>
        `).join('')}
        <div class="line"></div>
        <div class="item">
          <strong>Total</strong>
          <strong>Rs.${order.totalPrice}</strong>
        </div>
        <div class="line"></div>
        <div class="footer">Thank you for shopping!</div>
      </body>
    </html>
  `;

  receiptWindow.document.write(receiptContent);
  receiptWindow.document.close();
  receiptWindow.focus();
  receiptWindow.print();
  receiptWindow.close();
};

const placeAndPrintOrderHandler = async () => {
  if (items.length === 0) {
    toast.warn("Cannot place order: empty cart");
    return;
  }

  const order = {
    orderItems: items,
    itemsPrice: totalPrice,
    totalPrice,
    shippingInfo,
    orderStatus: "Delivered"
  };

  try {
    dispatch(createOrder(order))
    dispatch(orderCompleted()); // Clear cart
    toast.success("Order placed successfully!");
    printReceipt(order); // 🖨️ Print receipt after placing order
    navigate('/');
  } catch (error) {
    toast.error("Order failed");
    console.error(error);
  }
};



  return (
    <div className='container'>
      
      
<div className="cartItem">
    <div className="cartitems">
        <p className="yourcart" >Your Cart: <b>{items.length==0?<>Your Cart is empty</>:<>{items.length} items</>}</b></p>
        <div className="carthr">
        {items.map(item=>(
                    <Fragment key={item.name}>
                        <hr />

        <div className="cartdisplayitem">
            
            <img src={item.image} alt="" className="cartitemimage"/>
            <p className="cartdisplayname">{item.name}</p>
            <p className="cartdisplayprice">Rs.{item.price}</p>
            <div className="icons">
              <div className="addtocartitem">
                <p className="minus" onClick={()=>dispatch(decreaseQty(item))}>-</p>
                
                <input className="qty" type="number" value={item.quantity} readOnly/>
                <p className="plus" onClick={()=>increaseQty(item)}>+</p>
              </div>
              
              <p className="delete" onClick={()=>dispatch(removeItemFromCart(item.product))}><IoTrashBin 
              size="0.6em"/></p>
            </div>
        </div>
        </Fragment>
    
  
        ))}
        </div>

   
    </div>
    <div className="ordersummary">
        <p className="orderSummarytitle">Order Summary</p>
        <hr/>
        <p className="noofitems">No of Items: <b>{items.length}</b></p>
        
        <p className="noofitems">Total: <b>Rs.{items.reduce((acc,item)=>(acc+item.quantity*item.price),0)}</b></p>
        
        
       {isAuthenticated && (user.role === 'cashier' || user.role === 'admin') && (
  <>
    <p className="profilebutton" onClick={placeOrderHandler}>Place Order</p>
    <p className="profilebutton" onClick={placeAndPrintOrderHandler}>Print</p>
  </>
)}


  <p className="profilebutton" onClick={checkOutHandler}>Cash On Delivery</p>

     
    </div>
    
  
</div>
    

    </div>
  )
}

