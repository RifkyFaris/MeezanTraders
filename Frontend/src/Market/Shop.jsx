import {Fragment,useEffect,useState}  from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getDairy,getBeverages,getRice,getBakery,getHouse,getFood,getCooking,getSnacks,getSpices,getHealth} from './actions/productActions.jsx'
import Loader from '../components/Loader.jsx'
import {toast} from 'react-toastify'
import Pagination from 'react-js-pagination'
import Search from './Search'
import Product from './Product.jsx'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Shop = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
      
    },)
  const dispatch=useDispatch();
  let hasVisitedShop = false;
  const {products,loading,error,productsCount,resPerPage}=useSelector((state)=>state.productsState)
  const {dairy}=useSelector((state)=>state.productsState)
  const {beverages}=useSelector((state)=>state.productsState)
  const {rice}=useSelector((state)=>state.productsState)
  const {household}=useSelector((state)=>state.productsState)
   const {foodc}=useSelector((state)=>state.productsState)
   const {cooking}=useSelector((state)=>state.productsState)
   const {snacks}=useSelector((state)=>state.productsState)
   
   const {health}=useSelector((state)=>state.productsState)
   const {spices}=useSelector((state)=>state.productsState)
  const {items:cartItems}=useSelector(state=>state.cartState)
  const [firstLoad, setFirstLoad] = useState(() => !hasVisitedShop);

 
  

  useEffect(()=>{
    
   dispatch(getBeverages())
   dispatch(getDairy())
   dispatch(getRice())
  dispatch(getBakery())
  dispatch(getHouse())
  dispatch(getFood())
  dispatch(getCooking())
  dispatch(getSnacks())
   dispatch(getSpices())
   dispatch(getHealth())
   
  },[dispatch])
 useEffect(() => {
  if (!loading && firstLoad) {
    setFirstLoad(false);
    hasVisitedShop = true; // ✅ Prevent loader on future visits
  }
}, [loading, firstLoad]);

if (firstLoad || loading) return <Loader />;
  
  return (
    <Fragment>
    <div className='container'>
      
      
     <Search />
     <div class="product-container">
      <h2 class="category-heading" style={{marginTop:'5px'}}>Top Categories</h2>
      <div class="category-container" style={{marginTop:'5px'}} id="carousel">
        
  <Link to={`/category/dairy`}><img class="category_img" src="dairy.jpg" alt=""/></Link>
  <Link to={`/category/beverages`}><img class="category_img" src="beverages.jpg" alt=""/></Link>
  <Link to={`/category/rice`}><img class="category_img" src="rice.jpg" alt=""/></Link>
  <Link to={`/category/cookingessentials`}><img class="category_img" src="cooking.jpg" alt=""/></Link>
  <Link to={`/category/foodcupboard`}><img class="category_img" src="food cupboard.jpg" alt=""/></Link>
  <Link to={`/category/frozen`}><img class="category_img" src="frozen.jpg" alt=""/></Link>
  <Link to={`/category/spices`}><img class="category_img" src="spices.jpg" alt=""/></Link>
  <Link to={`/category/snacks`}><img class="category_img" src="snacks.jpg" alt=""/></Link>
  <Link to={`/category/beauty`}><img class="category_img" src="health.jpg" alt=""/></Link>
  <Link to={`/category/household`}><img class="category_img" src="household.jpg" alt=""/></Link>
</div></div>
      
      <div className="product-container" style={{marginTop:'10px'}}>
        <div className="dairy">
          <h2 className="category-heading">Dairy</h2>
          <div className="products">
          {dairy && dairy.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
            
          </div>
          <Link to={`/category/dairy`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
          
          
          
        </div>
        <Link to="/cart"><div className="cart-button" >
        <FaShoppingCart />
        <span className="cart-count">{cartItems.length}</span>
      </div></Link>
        
      </div>
      
      <div style={{marginTop:'10px'}} className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Rice</h2>
          <div className="products">
          {rice && rice.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
          </div>
          <Link to={`/category/rice`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
        </div>
      </div>
      
      <div style={{marginTop:'10px'}} className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Food Cupboard</h2>
          <div className="products">
          {foodc && foodc.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
          </div>
          <Link to={`/category/foodcupboard`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
        </div>
      </div>
      <div style={{marginTop:'10px'}} className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Cooking Essentials</h2>
          <div className="products">
          {cooking && cooking.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
          </div>
          <Link to={`/category/cookingessentials`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
        </div>
      </div>
      <div style={{marginTop:'10px'}} className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Beverages</h2>
          <div className="products">
          {beverages && beverages.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
            
          </div>
          <Link to={`/category/beverages`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
          
          
          
        </div>
       
        
      </div>
      <div style={{marginTop:'10px'}} className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Spices</h2>
          <div className="products">
          {spices && spices.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
          </div>
          <Link to={`/category/spices`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
        </div>
      </div>
      <div style={{marginTop:'10px'}} className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Household</h2>
          <div className="products">
          {household && household.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
          </div>
          <Link to={`/category/household`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
        </div>
      </div>
      <div style={{marginTop:'10px'}} className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Snacks</h2>
          <div className="products">
          {snacks && snacks.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
          </div>
          <Link to={`/category/snacks`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
        </div>
      </div>
      <div style={{marginTop:'10px'}} className="product-container">
        <div className="dairy">
          <h2 className="category-heading">Health & Beauty</h2>
          <div className="products">
          {health && health.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
          </div>
          <Link to={`/category/beauty`}><p style={{padding:'5px'}} class="show-more">Show More</p></Link>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default Shop
