const express=require("express");
const {
    newProduct,
    getSingleProduct,
    updateProducts,
    deleteProduct,
    getAdminProducts,
    getProducts,
    getSupplierProducts
    

} =require('../../controllers/MarketController/productController.js');
const router=express.Router();
const {isAuthenticatedUser,authorizeRoles} =require("../../middlewares/ProfileMiddlewares/authenticate.js");
const multer = require('multer');
const path = require('path');

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' ,'..', 'uploads/MarketUploads/Product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/supplier/product/new').post(isAuthenticatedUser,authorizeRoles('supplier'),upload.array('images'),newProduct)
router.route('/supplier/update/:id').put(isAuthenticatedUser,authorizeRoles('supplier'),upload.array('images'),updateProducts)
router.route('/supplier/product/:id').delete(isAuthenticatedUser,authorizeRoles('supplier','admin'),deleteProduct)
router.route('/supplier/products').get(isAuthenticatedUser,authorizeRoles('supplier'),getSupplierProducts)


router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts)

module.exports=router;