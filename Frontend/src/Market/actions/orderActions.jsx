import axios from 'axios';
import {
  createOrderRequest,
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
  processingOrdersFail,
} from '../slice/orderSlice';

// 🔐 Helper to add Authorization header
const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// 🧾 Create new order (no auth needed?)
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post(
      `https://meezantraders.onrender.com/api/order/new`,
      order
    );
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response?.data?.message || 'Create order failed'));
  }
};

// 📦 Get admin orders (requires admin token)
export const adminOrders = () => async (dispatch) => {
  try {
    dispatch(adminOrdersRequest());
    const { data } = await axios.get(
      `https://meezantraders.onrender.com/api/admin/orders`,
      getAuthConfig()
    );
    dispatch(adminOrdersSuccess(data));
  } catch (error) {
    dispatch(adminOrdersFail(error.response?.data?.message || 'Failed to fetch admin orders'));
  }
};

// 🗑️ Delete order (admin)
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrdersRequest());
    const { data } = await axios.delete(
      `https://meezantraders.onrender.com/api/admin/delete/order/${id}`,
      getAuthConfig()
    );
    dispatch(deleteOrdersSuccess(data));
  } catch (error) {
    dispatch(deleteOrdersFail(error.response?.data?.message || 'Failed to delete order'));
  }
};

// 🔍 Get single order details (authenticated user)
export const orderDetail = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get(
      `https://meezantraders.onrender.com/api/order/${id}`,
      getAuthConfig()
    );
    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response?.data?.message || 'Failed to get order details'));
  }
};

// 👤 Get current user's orders
export const userOrders = () => async (dispatch) => {
  try {
    dispatch(userOrdersRequest());
    const { data } = await axios.get(
      `https://meezantraders.onrender.com/api/myorder`,
      getAuthConfig()
    );
    dispatch(userOrdersSuccess(data));
  } catch (error) {
    dispatch(userOrdersFail(error.response?.data?.message || 'Failed to fetch user orders'));
  }
};

// 🔄 Update order (admin)
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrdersRequest());
    const { data } = await axios.put(
      `https://meezantraders.onrender.com/api/admin/order/${id}`,
      orderData,
      getAuthConfig()
    );
    dispatch(updateOrdersSuccess(data));
  } catch (error) {
    dispatch(updateOrdersFail(error.response?.data?.message || 'Failed to update order'));
  }
};

// 🔁 Get processing orders (authenticated route)
export const processingOrders = () => async (dispatch) => {
  try {
    dispatch(processingOrdersRequest());
    const { data } = await axios.get(
      `https://meezantraders.onrender.com/api/processing`,
      getAuthConfig()
    );
    dispatch(processingOrdersSuccess(data));
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to get processing orders';
    dispatch(processingOrdersFail(message));
  }
};
