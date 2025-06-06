import axios from 'axios';
import { createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    adminOrdersFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    deleteOrdersFail,
    deleteOrdersRequest,
    deleteOrdersSuccess,
    supplierOrdersRequest,
    supplierOrdersSuccess,
    supplierOrdersFail,
    orderDetailFail,
    orderDetailRequest,
    orderDetailSuccess,
    userOrdersFail,
    userOrdersRequest,
    userOrdersSuccess,
    updateOrdersFail,
    updateOrdersRequest,
    updateOrdersSuccess

} from '../slice/orderSlice';

export const createOrder = order => async(dispatch) => {
    try {
       dispatch(createOrderRequest())
       const {data} = await axios.post(`https://meezantraders.vercel.app/api/product/order/new`, order,{ withCredentials: true })
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}
export const adminOrders =  async(dispatch) => {
    try {
       dispatch(adminOrdersRequest())
       const {data} = await axios.get(`https://meezantraders.vercel.app/api/product/admin/orders`,{ withCredentials: true })
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}
export const deleteOrder = id=> async(dispatch) => {
    try {
       dispatch(deleteOrdersRequest())
       const {data} = await axios.delete(`https://meezantraders.vercel.app/api/product/admin/delete/order/${id}`,{ withCredentials: true })
       dispatch(deleteOrdersSuccess(data))
    } catch (error) {
        dispatch(deleteOrdersFail(error.response.data.message))
    }
}
export const supplierOrders =  async(dispatch) => {
    try {
       dispatch(supplierOrdersRequest())
       const {data} = await axios.get(`https://meezantraders.vercel.app/api/product/supplier/order`,{ withCredentials: true })
       dispatch(supplierOrdersSuccess(data))
    } catch (error) {
        dispatch(supplierOrdersFail(error.response.data.message))
    }
}
export const orderDetail = id=> async(dispatch) => {
    try {
       dispatch(orderDetailRequest())
       const {data} = await axios.get(`https://meezantraders.vercel.app/api/product/order/${id}`,{ withCredentials: true })
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}
export const userOrders =  async(dispatch) => {
    try {
       dispatch(userOrdersRequest())
       const {data} = await axios.get(`https://meezantraders.vercel.app/api/product/myorder`,{ withCredentials: true })
       dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}

export const updateOrder = (id,orderData)=> async(dispatch) => {
    try {
       dispatch(updateOrdersRequest())
       const {data} = await axios.put(`https://meezantraders.vercel.app/api/product/admin/order/${id}`,orderData,{ withCredentials: true })
       dispatch(updateOrdersSuccess(data))
    } catch (error) {
        dispatch(updateOrdersFail(error.response.data.message))
    }
}