import { useState }  from 'react'
{/*https://react-icons.github.io/react-icons/search/#q=close */}
import { IoMenu  } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../Profile/actions/userActions'



const Header = () => {
  const {isAuthenticated,user}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        dispatch(logout);
    }
  const [menu,setMenu]=useState(false)
  const toggle=()=>{
      if(!menu){
          setMenu(true)
      }else{
          setMenu(false)
      }
  }

  return (
    <div className='container'>
      <div className="nav">
            
            <Link to="/"><img  className="logo" src="meezanlogo.png" alt="logo"/></Link>
            {menu?<IoClose  
            color={'#128580'}
            size="2.2em"
            style={{marginRight:"0px",cursor:"pointer",marginTop:"4px"}}
            onClick={toggle}
            
        />
            : <IoMenu 
            color={'#128580'}
            size="2.2em"
            
            style={{marginRight:"0px",cursor:"pointer",marginTop:"4px"}}
            onClick={toggle}
            
        />}
        </div>
        {
            menu?<div className='navmenu'><div id="nav-items" className="nav-items">
            <ul>
             <Link to="/"  onClick={toggle}><li>Home</li></Link>
             
             <Link to="/" onClick={toggle}><li>About Us</li></Link>
             <Link to="/" onClick={toggle}><li>Contact Us</li></Link>
             {isAuthenticated?(
                <>
                
                <Link to="/myprofile" onClick={toggle}><li onClick={toggle}>My Profile</li></Link>
                <Link to="/orders" onClick={toggle}><li >My Orders</li></Link>
                {user.role==='admin'?<Link to="/admin/dashboard" onClick={toggle}><li >Dashboard</li></Link>:<></>}
                {user.role==='supplier'?<Link to="/supplier/dashboard" onClick={toggle}><li >Dashboard</li></Link>:<></>}
                {user.role==='mechanic'?<Link to="/mech/dash" onClick={toggle}><li >Dashboard</li></Link>:<></>}
                <Link to="/" id="logoutButton"  onClick={toggle}><li onClick={logoutHandler} >Logout</li></Link>
                </>
                
  ):(
             <>
             <Link to="/login" onClick={toggle}><li>Login</li></Link>
             <Link to="/user/register" onClick={toggle}><li>Register</li></Link>
             </>
             
             
             )}
             
             
   
            </ul>
           </div></div>:<></>
        }
        </div>
  )
}

export default Header
