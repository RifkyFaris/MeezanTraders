import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { orderDetail as orderDetailAction, updateOrder } from './actions/orderActions';
import { toast } from 'react-toastify';
import { clearOrderUpdated, clearError } from './slice/orderSlice';

const AdminUpdateOrder = () => {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState);
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;

  const isPaid = paymentInfo.status === 'succeeded';
  const [orderStatus, setOrderStatus] = useState('Processing');
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = { orderStatus };
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast.success('Order Updated Successfully!', {
        onOpen: () => dispatch(clearOrderUpdated()),
      });
      return;
    }

    if (error) {
      toast.error(error, {
        onOpen: () => dispatch(clearError()),
      });
      return;
    }

    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, dispatch, orderId]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  // 🖨️ Print receipt handler
  const printReceipt = () => {
    const receiptWindow = window.open('', '_blank', 'width=300,height=600');
    const receiptContent = `
      <html>
        <head>
          <style>
           body { font-family: monospace; width: 60mm; padding: 10px; }
          .receipt-title { text-align: center; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
          .line { border-top: 1px dashed #000; margin: 5px 0; }
          .item { font-size: 12px; margin-bottom: 4px; }
          .footer { margin-top: 10px; text-align: center; font-size: 12px; }
        </style>
        </head>
        <body>
          <div class="receipt-title">Meezan Traders</div>
          <div class="receipt-title">No.22 Kotmale Road Nawalapitiya</div>
          <div class="receipt-title">0542224102</div>
          <div>Date: ${new Date().toLocaleString()}</div>
          <div class="line"></div>
          ${orderItems.map(item => `
  <div class="item">
            <div>${item.name}</div>
            <div style="display: flex; justify-content: space-between;">
              <span>${item.quantity} x Rs.${item.price}</span>
              <span>Rs.${item.quantity * item.price}</span>
            </div>
          </div>
`).join('')}

          <div class="line"></div>
          <div class="item">
            <strong>Total</strong>
            <strong>Rs.${totalPrice}</strong>
          </div>
          <div class="line"></div>
          <div class="footer">Thank you for shopping!</div>
        </body>
      </html>
    `;
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.focus();
    receiptWindow.print();
    receiptWindow.close();
  };

  return (
    <div>
      {loading ? (
        <></>
      ) : (
        <Fragment>
          <div className="container">
            <div className="cartItem">
              <div className="cartitems">
                <p className="yourcart" style={{ fontSize: '30px' }}>Order # {orderDetail._id}</p>

                <p className="yourcart">Shipping Info</p>
                <p className="shippingdetails" style={{ fontSize: '20px' }}>Name: <b>{user.name}</b></p>
                <p className="shippingdetails" style={{ fontSize: '20px' }}>Address: <b>{shippingInfo.address}, {shippingInfo.city}</b></p>
                <p className="shippingdetails" style={{ fontSize: '20px' }}>Phone Number: <b>{shippingInfo.phoneNo}</b></p><br />
                <p className="shippingdetails" style={{ fontSize: '20px' }}>Amount: <b>Rs. {totalPrice}</b></p><br />
                <p className="shippingdetails" style={{ fontSize: '20px' }}>Payment: <b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p><br />
                <p className="shippingdetails" style={{ fontSize: '20px' }}>Order Status: <b>{orderStatus}</b></p><br />

                <p className="yourcart">Order Items:</p>
                {orderItems.map((item) => (
                  <div className="carthr" key={item.product}>
                    <hr />
                    <div className="cartdisplayitem">
                      <img src={item.image} className="cartitemimage" alt={item.name} />
                      <p className="cartdisplayname">{item.name}</p>
                      <p className="cartdisplayprice">
                        {item.quantity} Pieces x Rs. {item.price} = <b>Rs. {item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                ))}

                {/* 🖨️ Print Receipt Button */}
                <p className="profilebutton" onClick={printReceipt}>🖨️ Print Receipt</p>
              </div>

              <div className="ordersummary">
                <p className="orderSummarytitle">Update Order</p>
                <hr /><br />
                <select
                  className="category-select"
                  style={{ width: '200px' }}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  value={orderStatus}
                  name="status"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <p className="profilebutton" onClick={submitHandler}>Update Status</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default AdminUpdateOrder;
