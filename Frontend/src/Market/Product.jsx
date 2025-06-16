import { Link } from "react-router-dom"

import {  useSelector } from 'react-redux'
export default function Product({product}){
  const {isAuthenticated,user}=useSelector(state=>state.authState)
    return(
        <div className="product">
              <img className="product-image"  src={product.images[0].image} alt="product"/>
              
              <div className="product-details">
                <p className="product-name">{product.name}{isAuthenticated?<>{user.role==='cashier'||'admin'?<>({product.stock})</>:<></>}</>:<></>}</p>
                <div className="price-div">
                  
                <p className="price">Rs.{product.discount}</p>
                <p className="discount">Rs.{product.price}</p>
                </div>
               <Link to={`/product/${product._id}`}><p className="add">View product</p></Link>
              </div>
            </div>
    )
}
