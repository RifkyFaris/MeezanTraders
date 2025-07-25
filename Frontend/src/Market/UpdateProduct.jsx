import  {  useEffect, useState } from 'react'

import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import {getProduct,updateProduct} from './actions/productActions'
import { clearProductUpdated } from './slice/productSlice';
import { clearError } from './slice/productsSlice';
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const[discount,setDiscount]=useState("");
  const [expiry, setExpiry] = useState("");
  const { id:productId } = useParams();

  
  const { loading, isProductUpdated, error, product } = useSelector( state => state.productState)
  const categories=[
    'Dairy',
                'Beverages',
                'Rice',
                'Food Cupboard',
                'Household',
                'Cooking Essentials',
                'Bakery',
                'Frozen',
                'Dry Fish',
                'Snacks',
                'Seeds',
                'Spices',
                'Health & Beauty',
                'Private',
                'Offer'
    
];

const navigate = useNavigate();
const dispatch = useDispatch();

const onImagesChange = (e) => {
  const files = Array.from(e.target.files);

  files.forEach(file => {
      
      const reader = new FileReader();

      reader.onload = () => {
          if(reader.readyState == 2 ) {
              setImagesPreview(oldArray => [...oldArray, reader.result])
              setImages(oldArray => [...oldArray, file])
          }
      }

      reader.readAsDataURL(file)


  })

}

const submitHandler = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name' , name);
  formData.append('price' , price);
  formData.append('cost' , cost);
  formData.append('stock' , stock);
  formData.append('discount',discount);
  formData.append('expiry',expiry);
  formData.append('category' , category);
  images.forEach (image => {
      formData.append('images', image)
  })
  formData.append('imagesCleared' , imagesCleared);
  dispatch(updateProduct(productId, formData))
}
const clearImagesHandler = () => {
  setImages([]);
  setImagesPreview([]);
  setImagesCleared(true);
}
useEffect(() => {
  if(isProductUpdated) {
      toast.success('Product Updated Succesfully!',{
         
          onOpen: () => dispatch(clearProductUpdated())
      })
      setImages([])
      navigate('/admin/products')
      return;
  }

  if(error)  {
      toast.error(error, {
          
          onOpen: ()=> { dispatch(clearError()) }
      })
      return
  }

  dispatch(getProduct(productId))
}, [isProductUpdated, error, dispatch])
useEffect(() => {
  if(product && product._id) {
      setName(product.name);
      setPrice(product.price);
      setCost(product.cost);
      setDiscount(product.discount);
      setExpiry(product.expiry);
      setStock(product.stock);
      setCategory(product.category);
      
      let images = [];
      product.images.forEach( image => {
          images.push(image.image)
      });
      setImagesPreview(images)
  }
},[product])

  return (
    <div className="container">
      <div className="register">
    <p className="login-title">Update Product</p>
    
    <div className="form-div">

      <form onSubmit={submitHandler}>
          <label className="label" for="name">Name</label><br/>
        <input type="text" onChange={e => setName(e.target.value)} value={name} id='name' required placeholder="Name"/><br/><br/>
        
        <label className="label" for="price">Price</label><br/>
        <input type="number" onChange={e => setPrice(e.target.value)} value={price} id='price' required placeholder="Price"/><br/><br/>
        <label className="label" htmlFor="discount">Discount</label><br/>
        <input type="number" id='discount' onChange={e => setDiscount(e.target.value)} value={discount} required placeholder="Discount"/><br/><br/>
        <label className="label" for="cost">Cost</label><br/>
        <input type="number" onChange={e => setCost(e.target.value)} value={cost} id='cost' required placeholder="Cost"/><br/><br/>
        <label className="label" htmlFor="expiry">Expiry Date</label><br/>
        <input type="date" id='expiry' onChange={e => setExpiry(e.target.value)} value={expiry} required placeholder="Expiry Date"/><br/><br/>
        
        <label className="label"  for="stock">Stock</label><br/>
        <input type="number" onChange={e => setStock(e.target.value)} value={stock} id="stock" required placeholder="Stock"/><br/><br/>
        <label className="label"  for="category">Select category</label><br/>
        
        <select value={category} onChange={e => setCategory(e.target.value)} className="category-select" name="select" id="category">
        <option value="">Select</option>
          {categories.map( category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        
        <br/><br/>

        <label className="label"  for="image">Image</label><br/>
        <input type="file" id="image"multiple onChange={onImagesChange}  placeholder="Upload Image"/>
        { imagesPreview.length > 0 &&  <span className="mr-2" onClick={clearImagesHandler} style={{cursor: "pointer"}}><i className="fa fa-trash"></i></span>}
          {imagesPreview.map(image => (
            <img
              className="mt-3 mr-2"
              key={image}
              src={image}
              alt={`Image Preview`}
              width="55"
              height="52"
              />
         ))}
        <br/><br/>
        <input type="submit" className="submit" value="Update Product"/>
        
    
      </form>
      
    </div>
  </div>

      
    </div>
  )
}

export default UpdateProduct
