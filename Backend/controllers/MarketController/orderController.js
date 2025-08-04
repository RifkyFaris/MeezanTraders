const Order = require("../../models//MarketModel/orderModel.js");
const Product = require("../../models/MarketModel/productModel.js");

exports.newOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemPrice,
    shippingPrice,
    totalPrice,
    orderStatus
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    paidAt: Date.now(),
    user: req.user.id,
  });
  for (let i = 0; i < orderItems.length; i++) {
    const orderItem = orderItems[i];
    const product = await Product.findById(orderItem.product);
    if (product) {
      product.stock = product.stock - orderItem.quantity;
      await product.save();
    }
  }
  res.status(200).json({
    success: true,
    order,
  });
};

exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    order,
  });
};

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
};

exports.orders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Order has been already delivered!", 400));
  }
  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    successs: true,
  });
};

exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
};
exports.getProcessingOrders = async (req, res, next) => {
  
    const processingOrders = await Order.find({ orderStatus: "Processing" });

    res.status(200).json({
      success: true,
      processingOrders,
    });
  
};

exports.getTodaysSales = async (req, res, next) => {
  try {
    // Get today's date at 00:00:00 (start of the day)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Get tomorrow's date at 00:00:00 (start of next day)
    const endOfDay = new Date();
    
    endOfDay.setHours(23, 59, 59, 999);const now = new Date();

// Get Sri Lanka's local date
const srilankaOffset = 5 * 60; // in minutes
const localNow = new Date(now.getTime() + srilankaOffset * 60 * 1000);

// Create start and end of day in Sri Lanka time, then convert to UTC for MongoDB
const startOfDaySL = new Date(Date.UTC(
  localNow.getUTCFullYear(),
  localNow.getUTCMonth(),
  localNow.getUTCDate(),
  0, 0, 0
));

const endOfDaySL = new Date(Date.UTC(
  localNow.getUTCFullYear(),
  localNow.getUTCMonth(),
  localNow.getUTCDate(),
  23, 59, 59, 999
));

    // Find orders created between startOfDay and endOfDay
    const todaysOrders = await Order.find({
      createdAt: { $gte: startOfDaySL, $lte: endOfDaySL },
    });

    // Calculate total sales amount for today
    let totalSales = 0;
    todaysOrders.forEach((order) => {
      totalSales += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalSales,
      orders: todaysOrders,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteAllOrders = async (req, res, next) => {
  try {
    await Order.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All orders have been deleted.",
    });
  } catch (error) {
    next(error);
  }
};






