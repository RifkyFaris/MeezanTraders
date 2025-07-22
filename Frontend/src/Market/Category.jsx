import {Fragment,useEffect,useState}  from 'react'
import {useDispatch,useSelector} from 'react-redux'

import {  useParams } from 'react-router-dom';
import {getCategoryProducts} from './actions/productActions.jsx'

import Search from './Search'
import Product from './Product.jsx'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Category = () => {
  const dispatch=useDispatch();
  const {category}=useSelector((state)=>state.productsState)
  
  const {items:cartItems}=useSelector(state=>state.cartState)
  const {cat} = useParams();
  const displayNames = {
    dairy: 'Dairy',
    rice: 'Rice',
    beverages: 'Beverages',
    cookingessentials: 'Cooking Essentials',
    spices: 'Spices',
    household: 'Household',
    snacks: 'Snacks',
    beauty: 'Health & Beauty',
    bakery: 'Bakery',
    dry: 'Dry Fish',
    foodcupboard: 'Food Cupboard',
    frozen: 'Frozen',
    seed: 'Seeds',
    offer: 'Special Offers'
  }

  const categoryName = displayNames[cat] || cat;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategoryProducts(categoryName))
  }, [dispatch, cat])
  
  
  return (
    <Fragment>
    <div className='container'>
      
      
     <Search />
      
      <div className="product-container">
        <div className="dairy">
          <h2 className="category-heading">{categoryName}</h2>
          <div className="products">
          {category && category.map(product=>(
                    <Link to={`/product/${product._id}`}><Product  key={product._id} product={product}/></Link>
                  ))}
            
          </div>
          
          
          
          
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

export default Category
