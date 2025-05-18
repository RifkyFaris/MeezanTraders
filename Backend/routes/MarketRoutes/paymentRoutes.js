const express = require('express');
const {processPayment,sendStripeApi,otp,
    verifyyotp}=require('../../controllers/MarketController/paymentController.js')
const {isAuthenticatedUser}=require('../../middlewares/ProfileMiddlewares/authenticate.js')
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser,processPayment);
router.route('/stripeapi').get(isAuthenticatedUser,sendStripeApi);
router.route('/send/otp').get(isAuthenticatedUser,otp);
router.route('/verify/otp').post(isAuthenticatedUser,verifyyotp);

module.exports = router;