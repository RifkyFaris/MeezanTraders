
import { useEffect, useState } from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import { IoSearch } from "react-icons/io5";

const Search = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
      
    },)
    const navigate=useNavigate()
    const location=useLocation()
    const [keyword,setKeyword]=useState("")
    const searchHandler=(e)=>{
      e.preventDefault()
      navigate(`/search/${keyword}`)
    }
    const clearKeyword=()=>{
      setKeyword("")
    }
    useEffect(()=>{
      if(location.pathname==='/'){
        clearKeyword()
      }
    },[location])


  return (
    <div className="container">
    <form onSubmit={searchHandler}>
      
       <div className="search">
        <div className="search-container">
          <input className="search-box" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} type="text" placeholder="Search Product..." />
          <button className="button" type="submit">
          <IoSearch  
                        color={'#128580'}
                        size="2em"
                        
                        
                    />
          </button>
          
          
        </div>
        
      </div>
      </form>
      </div>
    
  )
}

export default Search
