const express=require('express');
const router=express.Router();
const {newOrder,
    getSingleOrder,
    getSupplierOrders,
    myOrders,
    orders,
    updateOrder,
    deleteOrder
}=require("../../controllers/MarketController/orderController.js")
const {isAuthenticatedUser,authorizeRoles}=require('../../middlewares/ProfileMiddlewares/authenticate.js')

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myorder').get(isAuthenticatedUser,myOrders);

router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'),orders);
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder);

router.route('/admin/delete/order/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder);

router.route('/supplier/order').get(isAuthenticatedUser,authorizeRoles('supplier'),getSupplierOrders);








module.exports=router