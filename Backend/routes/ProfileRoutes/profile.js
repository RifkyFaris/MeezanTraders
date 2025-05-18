const express=require('express');
const {registerUser,
    loginUser,
    logoutUser,
    registerSupplier,
    getUserProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    deleteUser,
    updateUser,
    getUser,
    getAllUsers,
    registerMechanic,
    registercarwash,
    registertowing
    
}=require('../../controllers/ProfileController/profileController.js')
const router=express.Router();
const {isAuthenticatedUser,authorizeRoles}=require('../../middlewares/ProfileMiddlewares/authenticate.js')

router.route('/register').post(registerUser);
router.route('/register/supplier').post(registerSupplier);
router.route('/register/mechanic').post(registerMechanic);
router.route('/register/carwash').post(registercarwash);
router.route('/register/towing').post(registertowing);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/update').put(isAuthenticatedUser,updateProfile);
router.route('/password/change').put(isAuthenticatedUser,changePassword);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUser);
router.route('/admin/user/update/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUser);
router.route('/admin/user/delete/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);

module.exports=router;