import { createSlice } from "@reduxjs/toolkit";


const productSlice=createSlice({
    name:'product',
    initialState:{
        loading:false,
        product:{},
        isProductCreated:false,
        isProductDeleted:false,
        isProductUpdated:false,
        low:{},
    },
    reducers:{
        newProductRequest(state,action){
            return{
                ...state,
                loading: true
            }
        },
        newProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated:true
                
            }
        },
        newProductFail(state, action){
            return {
                loading: false,
                error:  action.payload,
                isProductCreated:false
            }
        },
        clearProductCreated(state, action){
            return{
                ...state,
                isProductCreated:false
            }
        },
        
        productRequest(state, action){
            return {
                loading: true
            }
        },
        productSuccess(state, action){
            return {
                loading: false,
                product: action.payload.product
                
            }
        },
        productFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        
        adminProductRequest(state, action){
            return {
                loading: true
            }
        },
        adminProductSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products
                
            }
        },
        adminProductFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        deleteProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                isProductDeleted:true
                
            }
        },
        deleteProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },
        clearProductDeleted(state, action){
            return{
                ...state,
                isProductDeleted:false
            }
        },
        
        updateProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        updateProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated:true
                
            }
        },
        updateProductFail(state, action){
            return {
                loading: false,
                error:  action.payload,
                isProductCreated:false
            }
        },
        clearProductUpdated(state, action){
            return{
                ...state,
                isProductUpdated:false
            }
        },
        lowStockRequest(state, action) {
                    return{
                        ...state,
                        loading :true,
                    }
                    
                },
                lowStockSuccess(state, action) {
                    return{
                        ...state,
                        loading : false,
                        low : action.payload
                    }
                    
                },
                lowStockFail(state, action) {
                    return{
                        ...state,
                        loading : false,
                    error :action.payload
                    }
                    
                },
        expirykRequest(state, action) {
                    return{
                        ...state,
                        loading :true,
                    }
                    
                },
                expirySuccess(state, action) {
                    return{
                        ...state,
                        loading : false,
                        expiry : action.payload
                    }
                    
                },
                expiryFail(state, action) {
                    return{
                        ...state,
                        loading : false,
                    error :action.payload
                    }
                    
                },
        
    }
})
const {actions,reducer}=productSlice;
export const{
    newProductFail,
    newProductRequest,
    newProductSuccess,

    clearProductCreated,

    productFail,
    productRequest,
    productSuccess,

    adminProductFail,
    adminProductRequest,
    adminProductSuccess,

    deleteProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    clearProductDeleted,

    updateProductFail,
    updateProductRequest,
    updateProductSuccess,
    clearProductUpdated,
    lowStockFail,
    lowStockSuccess,
    lowStockRequest,
    expiryFail,
    expirySuccess,
    expirykRequest,


}=actions;

export default reducer;