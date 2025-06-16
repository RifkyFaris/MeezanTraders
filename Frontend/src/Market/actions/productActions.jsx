import axios from 'axios'
import { newProductFail,
    newProductRequest,
    newProductSuccess,
    productFail,
    productRequest,
    productSuccess,
    adminProductFail,
    adminProductRequest,
    adminProductSuccess,
    deleteProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    updateProductFail,
    updateProductRequest,
    updateProductSuccess,
    lowStockFail,
    lowStockRequest,
    lowStockSuccess,
    expirykRequest,
    expirySuccess,
    expiryFail
    

} from "../slice/productSlice.jsx";
import {
    productsRequest,
    productsSuccess,
    productsFail,
   
} from '../slice/productsSlice.jsx'

export const lowstock = () => async (dispatch) => {
    try {
        dispatch(lowStockRequest());
        
        const { data } = await axios.get(`https://meezantraders.vercel.app/api/admin/low`);
        dispatch(lowStockSuccess(data.lowStockProducts));
        console.log("rrr")
    } catch (error) {
        dispatch(lowStockFail(error.response?.data?.message || error.message));
    }
};

export const expiry = () => async (dispatch) => {
    try {
        dispatch(expirykRequest());
        
        const { data } = await axios.get(`https://meezantraders.vercel.app/api/admin/expiry`);
        dispatch(expirySuccess(data.expiringProducts));
        console.log("rrr")
    } catch (error) {
        dispatch(expiryFail(error.response?.data?.message || error.message));
    }
};


//create product
export const createNewProduct=productData=>async(dispatch)=>{
    try {
        dispatch(newProductRequest())
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data }  =  await axios.post(`https://meezantraders.vercel.app/api/supplier/product/new`,productData,config);
        dispatch(newProductSuccess(data))
    } catch (error) {
        dispatch(newProductFail(error.response.data.message))
    }
}
//get all products and search
export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 
        let link = `https://meezantraders.vercel.app/api/products?page=${currentPage}`;
        
        if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category) {
            link += `&category=${category}`
        }
        if(rating) {
            link += `&ratings=${rating}`
        }
        
        const { data }  =  await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}
//get product by id
export const getProduct=id=>async(dispatch)=>{
    try {
        dispatch(productRequest())
        const {data} =await axios.get(`https://meezantraders.vercel.app/api/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response?.data?.message || error.message))
    }
}



//admin get all products
export const getAdminProducts  =  async (dispatch) => {

    try {  
        dispatch(adminProductRequest()) 
        const { data }  =  await axios.get(`https://meezantraders.vercel.app/api/admin/products`);
        dispatch(adminProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductFail(error.response.data.message))
    }
    
}


//delete product
export const deleteProduct  = id =>  async (dispatch) => {

    try {  
        dispatch(deleteProductRequest()) 
        await axios.delete(`https://meezantraders.vercel.app/api/supplier/product/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}


//update product
export const updateProduct  = (id,productData) =>  async (dispatch) => {

    try {  
        dispatch(updateProductRequest()) 
        const { data }  =  await axios.put(`https://meezantraders.vercel.app/api/supplier/update/${id}`,productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}


