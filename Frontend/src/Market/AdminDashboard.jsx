import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {getAdminProducts} from './actions/productActions'
import {lowstock,expiry as ex} from './actions/productActions'
import { adminOrders as adminOrdersAction ,processingOrders} from './actions/orderActions';
import {getUsers} from '../Profile/actions/userActions'

import {getTodaysSales} from './actions/orderActions'

const AdminDAshboard = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
      
    },)
  const { products = [] } = useSelector( state => state.productState);
  const { low = [], expiry=[] } = useSelector( state => state.productState);
  const { adminOrders = [],process=[],todaysOrders=[],totalSales  } = useSelector( state => state.orderState);
  const { users = [] } = useSelector( state => state.authState);
  let totalAmount = 0;
    if (adminOrders.length > 0) {
        adminOrders.forEach( order => {
            totalAmount += order.totalPrice
        })
    }
  const dispatch = useDispatch();
    
  useEffect( () => {
   
    dispatch(getAdminProducts);
    
    dispatch(adminOrdersAction);
    
    dispatch(getUsers);
    
     dispatch(lowstock());
     
     dispatch(processingOrders());
     dispatch(ex())
   dispatch(getTodaysSales())
  }, [])
  
  return (
    <div className='container'>
      <div className="hero1" >
        <h1 className="what" id="services">Dashboard</h1>
        <div className="row">
          <div className="col1_service"> 
            <Link className="service_list" to="/admin/products">
            <span className="no">Products</span><br/>
            
            <p className="quote">
              
              {products.length} Products
            </p></Link>
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/admin/user/list">
            <span className="no">Users </span> <br/>
           
            <p className="quote">
              
              {users.length} Users              </p></Link> 
            
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/admin/outofstock">
            <span className="no">Out of Stock</span> <br/>
             <p className="quote">
              
              {low?.length} Products              </p></Link>
            
            </div>
        </div>



        <div className="row">
          <div className="col1_service"> 
            <Link className="service_list" to="/admin/expired">
            <span className="no">Expired</span><br/>
            <p className="quote">
              
              {expiry?.length} Products              </p>
            
           </Link>
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/admin/orders">
            <span className="no">Monthly Sales </span> <br/>
            <p className="quote">
              Rs. {totalAmount} <br />
              {adminOrders?.length} orders
          
              </p>
           
            </Link>
            
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/admin/processing">
            <span className="no">Orders</span> <br/>
             <p className="quote">
              {process?.length} orders
          
              </p>
            </Link>
            </div>
        </div>
        <div className="row">
          <div className="col1_service"> 
            <Link className="service_list" to="/new/product">
            <span className="no">New Product</span><br/>
            
            </Link>
          </div>
          <div className="col1_service">
            
            <span className="no">Todays Sales </span> <br/>
            <p className="quote">
              Rs. {totalSales} <br />
              {todaysOrders?.length} orders
          
              </p>
           
           
            
          </div>
          
          
        </div>
        
          
          
        
        
      </div>
    </div>
  )
}

export default AdminDAshboard
