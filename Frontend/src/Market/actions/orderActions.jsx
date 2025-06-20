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
    
    orderDetailFail,
    orderDetailRequest,
    orderDetailSuccess,
    userOrdersFail,
    userOrdersRequest,
    userOrdersSuccess,
    updateOrdersFail,
    updateOrdersRequest,
    updateOrdersSuccess,
    processingOrdersRequest,
    processingOrdersSuccess,
    processingOrdersFail

} from '../slice/orderSlice';

export const createOrder = order => async(dispatch) => {
    try {
       dispatch(createOrderRequest())
       const {data} = await axios.post(`https://meezantraders.vercel.app/api/order/new`, order,{withCredentials:true})
       dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}
export const adminOrders =  async(dispatch) => {
    try {
       dispatch(adminOrdersRequest())
       const {data} = await axios.get(`https://meezantraders.vercel.app/api/admin/orders`,{withCredentials:true})
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}
export const deleteOrder = id=> async(dispatch) => {
    try {
       dispatch(deleteOrdersRequest())
       const {data} = await axios.delete(`https://meezantraders.vercel.app/api/admin/delete/order/${id}`,{withCredentials:true})
       dispatch(deleteOrdersSuccess(data))
    } catch (error) {
        dispatch(deleteOrdersFail(error.response.data.message))
    }
}
export const orderDetail = id=> async(dispatch) => {
    try {
       dispatch(orderDetailRequest())
       const {data} = await axios.get(`https://meezantraders.vercel.app/api/order/${id}`,{withCredentials:true})
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}
export const userOrders =  async(dispatch) => {
    try {
       dispatch(userOrdersRequest())
       const {data} = await axios.get(`https://meezantraders.vercel.app/api/myorder`,{withCredentials:true})
       dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}

export const updateOrder = (id,orderData)=> async(dispatch) => {
    try {
       dispatch(updateOrdersRequest())
       const {data} = await axios.put(`https://meezantraders.vercel.app/api/admin/order/${id}`,orderData,{withCredentials:true})
       dispatch(updateOrdersSuccess(data))
    } catch (error) {
        dispatch(updateOrdersFail(error.response.data.message))
    }
}
export const processingOrders = () => async (dispatch) => {
  try {
    dispatch(processingOrdersRequest());
    const { data } = await axios.get(`https://meezantraders.vercel.app/api/processing`,{withCredentials:true});
    dispatch(processingOrdersSuccess(data));
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    dispatch(processingOrdersFail(message));
  }
};
