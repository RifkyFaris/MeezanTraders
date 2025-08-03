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
    dairyFail,
    dairyRequest,
    dairySuccess,
    beveragesFail,
    beveragesRequest,
    beveragesSuccess,
    riceFail,
    riceRequest,
    riceSuccess,
    foodcFail,
    foodcRequest,
    foodcSuccess,
    householdFail,
    householdRequest,
    householdSuccess,
    cookingFail,
    cookingRequest,
    cookingSuccess,
    bakeryFail,
    bakeryRequest,
    bakerySuccess,
    frozenFail,
    frozenRequest,
    frozenSuccess,
    dryFail,
    dryRequest,
    drySuccess,
    snacksFail,
    snacksRequest,
    snacksSuccess,
    seedsFail,
    seedsRequest,
    seedsSuccess,
    spicesFail,
    spicesRequest,
    spicesSuccess,
    healthFail,
    healthRequest,
    healthSuccess,
    offerFail,
    offerRequest,
    offerSuccess,
    categoryFail,
    categoryRequest,
    categorySuccess
   
} from '../slice/productsSlice.jsx'

export const lowstock = () => async (dispatch) => {
    try {
        dispatch(lowStockRequest());
        
        const { data } = await axios.get(`/api/admin/low`);
        dispatch(lowStockSuccess(data.lowStockProducts));
        console.log("rrr")
    } catch (error) {
        dispatch(lowStockFail(error.response?.data?.message || error.message));
    }
};

export const expiry = () => async (dispatch) => {
    try {
        dispatch(expirykRequest());
        
        const { data } = await axios.get(`/api/admin/expiry`);
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
        const { data }  =  await axios.post(`/api/supplier/product/new`,productData,config);
        dispatch(newProductSuccess(data))
    } catch (error) {
        dispatch(newProductFail(error.response.data.message))
    }
}
//get all products and search
export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 
        let link = `/api/products?page=${currentPage}`;
        
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
        const {data} =await axios.get(`/api/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response?.data?.message || error.message))
    }
}



//admin get all products
export const getAdminProducts  =  async (dispatch) => {

    try {  
        dispatch(adminProductRequest()) 
        const { data }  =  await axios.get(`/api/admin/products`);
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
        await axios.delete(`/api/supplier/product/${id}`);
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
        const { data }  =  await axios.put(`/api/supplier/update/${id}`,productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}

export const getDairy=()=>async(dispatch)=>{
    try {
        dispatch(dairyRequest())
        const {data} =await axios.get(`/api/dairy/random`)
        dispatch(dairySuccess(data))
    } catch (error) {
        dispatch(dairyFail(error.response?.data?.message || error.message))
    }
}
export const getBeverages=()=>async(dispatch)=>{
    try {
        dispatch(beveragesRequest())
        const {data} =await axios.get(`/api/beverages/random`)
        dispatch(beveragesSuccess(data))
    } catch (error) {
        dispatch(beveragesFail(error.response?.data?.message || error.message))
    }
}
export const getRice=()=>async(dispatch)=>{
    try {
        dispatch(riceRequest())
        const {data} =await axios.get(`/api/rice/random`)
        dispatch(riceSuccess(data))
    } catch (error) {
        dispatch(riceFail(error.response?.data?.message || error.message))
    }
}
export const getHealth=()=>async(dispatch)=>{
    try {
        dispatch(healthRequest())
        const {data} =await axios.get(`/api/health/random`)
        dispatch(healthSuccess(data))
    } catch (error) {
        dispatch(healthFail(error.response?.data?.message || error.message))
    }
}
export const getHouse=()=>async(dispatch)=>{
    try {
        dispatch(householdRequest())
        const {data} =await axios.get(`/api/house/random`)
        dispatch(householdSuccess(data))
    } catch (error) {
        dispatch(householdFail(error.response?.data?.message || error.message))
    }
}
export const getSeed=()=>async(dispatch)=>{
    try {
        dispatch(seedsRequest())
        const {data} =await axios.get(`/api/seed/random`)
        dispatch(seedsSuccess(data))
    } catch (error) {
        dispatch(seedsFail(error.response?.data?.message || error.message))
    }
}
export const getFood=()=>async(dispatch)=>{
    try {
        dispatch(foodcRequest())
        const {data} =await axios.get(`/api/foodcupboard/random`)
        dispatch(foodcSuccess(data))
    } catch (error) {
        dispatch(foodcFail(error.response?.data?.message || error.message))
    }
}
export const getCooking=()=>async(dispatch)=>{
    try {
        dispatch(cookingRequest())
        const {data} =await axios.get(`/api/cooking/random`)
        dispatch(cookingSuccess(data))
    } catch (error) {
        dispatch(cookingFail(error.response?.data?.message || error.message))
    }
}
export const getBakery=()=>async(dispatch)=>{
    try {
        dispatch(bakeryRequest())
        const {data} =await axios.get(`/api/bakery/random`)
        dispatch(bakerySuccess(data))
    } catch (error) {
        dispatch(bakeryFail(error.response?.data?.message || error.message))
    }
}
export const getfrozen=()=>async(dispatch)=>{
    try {
        dispatch(frozenRequest())
        const {data} =await axios.get(`/api/frozen/random`)
        dispatch(frozenSuccess(data))
    } catch (error) {
        dispatch(frozenFail(error.response?.data?.message || error.message))
    }
}
export const getDry=()=>async(dispatch)=>{
    try {
        dispatch(dryRequest())
        const {data} =await axios.get(`/api/dry/random`)
        dispatch(drySuccess(data))
    } catch (error) {
        dispatch(dryFail(error.response?.data?.message || error.message))
    }
}
export const getSnacks=()=>async(dispatch)=>{
    try {
        dispatch(snacksRequest())
        const {data} =await axios.get(`/api/snacks/random`)
        dispatch(snacksSuccess(data))
    } catch (error) {
        dispatch(snacksFail(error.response?.data?.message || error.message))
    }
}
export const getSpices=()=>async(dispatch)=>{
    try {
        dispatch(spicesRequest())
        const {data} =await axios.get(`/api/spices/random`)
        dispatch(spicesSuccess(data))
    } catch (error) {
        dispatch(spicesFail(error.response?.data?.message || error.message))
    }
}
export const getCategoryProducts=(cat)=>async(dispatch)=>{
    try {
        dispatch(categoryRequest())
        const {data} =await axios.get(`/api/category/${cat}`)
        dispatch(categorySuccess(data))
        
    } catch (error) {
        dispatch(categoryFail(error.response?.data?.message || error.message))
    }
}