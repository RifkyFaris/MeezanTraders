import {Fragment,useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from './actions/productActions'
import Product from './Product'
import {toast} from 'react-toastify'
import { useParams } from "react-router-dom"
import Search from './Search'

import { FaShoppingCart } from "react-icons/fa";

const ProducSearch = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
      
    },)
    const dispatch=useDispatch();
    const {items:cartItems}=useSelector(state=>state.cartState)
      
    const [currentPage,setCurrentPage]= useState(1)
    const [price,setPrice]=useState([1,200000])
    
  const [category,setCategory]=useState(null)
  const [priceChanged,setPriceChanged]=useState(price)
  const {products,loading,error,productsCount,resPerPage}=useSelector((state)=>state.productsState)
  const {keyword}=useParams()
  
  useEffect(()=>{
    if(error){
      return  toast.error(error)
    }
   
    dispatch(getProducts(keyword,priceChanged,category,null,currentPage))
  },[error,currentPage,dispatch,keyword,priceChanged,category])
  return (
    <Fragment>
    <div className='container'>
      
      
     <Search />
      
      <div className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Search Product</h2>
          <div className="products">
          {products && products.map(product=>(
                   <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
            
          </div>
          {productsCount>0 && productsCount > resPerPage ?  
              <div className="d-flex justify-content-center mt-5">
                <Pagination 
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={'Next'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass={"page-item"}
                linkClass={"page-link"}

                />
              </div>:null}
          
          
        </div>
        <Link to="/cart"><div className="cart-button" >
        <FaShoppingCart />
        <span className="cart-count">{cartItems.length}</span>
      </div></Link>
        
      </div>
      
      
      
    </div>
    </Fragment>
  )
}

export default ProducSearch
