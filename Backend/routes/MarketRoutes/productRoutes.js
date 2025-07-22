const express=require("express");
const {
    newProduct,
    getSingleProduct,
    updateProducts,
    deleteProduct,
    getAdminProducts,
    getProducts,
    getExpiringSoonProducts,
    getLowStockProducts,
    getCategoryProducts,
    getRandomDairyProducts,
    getRandomBeverageProducts,
    getRandomBakeryProducts,
    getRandomCookingEssentialsProducts,
    getRandomDryFishProducts,
    getRandomFoodCupboardProducts,
    getRandomFrozenProducts,
    getRandomHealthProducts,
    getRandomHouseholdProducts,
    getRandomOfferProducts,
    getRandomRiceProducts,
    getRandomSeedsProducts,
    getRandomSnacksProducts,
    getRandomSpicesProducts,
    
    

} =require('../../controllers/MarketController/productController.js');
const router=express.Router();
const {isAuthenticatedUser,authorizeRoles} =require("../../middlewares/authenticate.js");
const multer = require('multer');
const path = require('path');

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' ,'..', 'uploads' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })
router.route('/api/health/random').get(getRandomHealthProducts);
router.route('/api/house/random').get(getRandomHouseholdProducts);
router.route('/api/offer/random').get(getRandomOfferProducts);
router.route('/api/rice/random').get(getRandomRiceProducts);
router.route('/api/seed/random').get(getRandomSeedsProducts);
router.route('/api/snacks/random').get(getRandomSnacksProducts);
router.route('/api/spices/random').get(getRandomSpicesProducts);

router.route('/api/frozen/random').get(getRandomFrozenProducts);
router.route('/api/foodcupboard/random').get(getRandomFoodCupboardProducts);
router.route('/api/dry/random').get(getRandomDryFishProducts);
router.route('/api/cooking/random').get(getRandomCookingEssentialsProducts);
router.route('/api/bakery/random').get(getRandomBakeryProducts);
router.route('/api/beverages/random').get(getRandomBeverageProducts);
router.route('/api/dairy/random').get(getRandomDairyProducts);
router.route('/api/category/:cat').get(getCategoryProducts);
router.route('/api/products').get(getProducts);
router.route('/api/product/:id').get(getSingleProduct);

router.route('/api/supplier/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),newProduct)
router.route('/api/supplier/update/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),updateProducts)
router.route('/api/supplier/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct)
router.route('/api/admin/expiry').get(isAuthenticatedUser,authorizeRoles('admin'),getExpiringSoonProducts)
router.route('/api/admin/low').get(isAuthenticatedUser,authorizeRoles('admin'),getLowStockProducts)


router.route('/api/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts)

module.exports=router;