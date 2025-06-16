import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Login from './Profile/Login.jsx'
import UserRegister from './Profile/UserRegister.jsx'
import './App.css'
import { ToastContainer } from 'react-toastify'



import Shop from './Market/Shop.jsx'
import { loadUser } from './Profile/actions/userActions.jsx'
import React,{useEffect,useState} from 'react'
import store from './store.jsx'
import AddProduct from './Market/NewProduct.jsx'
import ProtectedRoute from './route/protectedRoute.jsx'
import ProductDetail from './Market/ProductDetail.jsx'
import Cart from './Market/cart.jsx'
import Shipping from './Market/Shipping.jsx'
import ConfirmOrder from './Market/ConfirmOrder.jsx'
import OrderSuccess from './Market/OrderSuccess.jsx'
import AdminDAshboard from './Market/AdminDashboard.jsx'
import AdminProductList from './Market/AdminProductList.jsx'
import UpdateProduct from './Market/UpdateProduct.jsx'
import ProducSearch from './Market/ProducSearch.jsx'
import SparePartsOrders from './Market/SparePartsOrders.jsx'
import OrderDetail from './Market/OrderDetail.jsx'
import UserOrders from './Market/UserOrders.jsx'
import AdminUpdateOrder from './Market/AdminUpdateOrder.jsx'
import Profile from './Profile/Profile.jsx'
import UpdateProfile from './Profile/UpdateProfile.jsx'
import UpdatePassword from './Profile/UpdatePassword.jsx'
import ForgotPassword from './Profile/ForgotPassword.jsx'
import ResetPassword from './Profile/ResetPassword.jsx'
import UserList from './Profile/UserList.jsx'
import OutOfStockList from './Market/OutOfStockList.jsx'
import ExpiredList from './Market/ExpiredList.jsx'
import ProcessingList from './Market/ProcessingList.jsx'



function App() {
  useEffect(()=>{
    
    store.dispatch(loadUser)
    
  },[])

  return (
    <Router>
      
        <Header/>
        <ToastContainer />
        
        <Routes>
          {/* Market routes */}
          <Route path="/" element={<Shop/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
          <Route path="/new/product" element={<ProtectedRoute isAdmin={true}><AddProduct/></ProtectedRoute>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/shipping" element={<ProtectedRoute ><Shipping/></ProtectedRoute>}/>
          
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDAshboard/></ProtectedRoute>}/>
          <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><AdminProductList/></ProtectedRoute> } />
          <Route path='/supplier/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />
          <Route path="/search/:keyword" element={<ProducSearch/>}/>
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><SparePartsOrders/></ProtectedRoute> } />
           
          <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
          <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />
          <Route path='/admin/update/order/:id' element={<ProtectedRoute isAdmin={true}><AdminUpdateOrder/></ProtectedRoute> } />
          <Route path='/admin/outofstock' element={<ProtectedRoute isAdmin={true}><OutOfStockList/></ProtectedRoute> } />
          <Route path='/admin/expired' element={<ProtectedRoute isAdmin={true}><ExpiredList/></ProtectedRoute> } />
          <Route path='/admin/processing' element={<ProtectedRoute isAdmin={true}><ProcessingList/></ProtectedRoute> } />

        </Routes>

        <Routes>
          {/* Profile routes */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/update/profile" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
          <Route path="/myprofile" element={<Profile/>}/>
          <Route path="/user/register" element={<UserRegister/>}/>
          
          <Route path="/update/password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
          <Route path="/forgot/password" element={<ForgotPassword/>}/>
          <Route path="/password/reset/:token" element={<ResetPassword/>}/>
          <Route path='/admin/user/list' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
        </Routes>

        <Footer />
    </Router>
  )
}

export default App
