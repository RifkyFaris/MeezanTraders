import {Fragment,useEffect,useState}  from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getProducts} from './actions/productActions.jsx'
import {toast} from 'react-toastify'
import Pagination from 'react-js-pagination'
import Search from './Search'
import Product from './Product.jsx'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Shop = () => {
  const dispatch=useDispatch();
  const {products,loading,error,productsCount,resPerPage}=useSelector((state)=>state.productsState)
  const {items:cartItems}=useSelector(state=>state.cartState)
  const [currentPage,setCurrentPage]= useState(1)
 
  const setCurrentPageNo=(pageNo)=>{
    setCurrentPage(pageNo)

  }

  useEffect(()=>{
    if(error){
      return  toast.error(error)
    }
   
    dispatch(getProducts(null,null,null,null,currentPage))
  },[error,currentPage,dispatch])
  
  return (
    <Fragment>
    <div className='container'>
      
      
     <Search />
      
      <div className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Products</h2>
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

export default Shop
