import {
    registerFail,
    registerRequest,
    registerSuccess,
    loginFail,
    loginRequest,
    loginSuccess,
    clearError,
    logoutFail,
    logoutSuccess,
    supplierRegisterFail,
    supplierRegisterRequest,
    supplierRegisterSuccess,
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    usersFail,
    usersRequest,
    usersSuccess,
    updateUserFail,
    updateUserRequest,
    updateUserSuccess,
    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,
    mechanicRegisterFail,
    mechanicRegisterRequest,
    mechanicRegisterSuccess,
    towingRegisterFail,
    towingRegisterRequest,
    towingRegisterSuccess,
    washRegisterFail,
    washRegisterRequest,
    washRegisterSuccess,

    
    
} from '../slice/userSlice';

import axios from 'axios';

//user register
export const register=(userData)=>async(dispatch)=>{
    try{
        dispatch(registerRequest())
        const {data}=await axios.post('https://meezantraders.onrender.com/api/register',userData, { withCredentials: true })
        dispatch(registerSuccess(data))
    }catch(error){
        dispatch(registerFail(error.response.data.message))
    }
}

//clear error
export const clearAuthError=dispatch=>{
    dispatch(clearError())
}

//Supplier register
export const supplierRegister=(userData)=>async(dispatch)=>{
    try{
        dispatch(supplierRegisterRequest())
        const {data}=await axios.post('https://meezantraders.onrender.com/api/register/supplier',userData, { withCredentials: true })
        dispatch(supplierRegisterSuccess(data))
    }catch(error){
        dispatch(supplierRegisterFail(error.response.data.message))
    }
}

//mechanic register
export const mechanicRegister=(userData)=>async(dispatch)=>{
    try{
        dispatch(mechanicRegisterRequest())
        const {data}=await axios.post('https://meezantraders.onrender.com/api/register/mechanic',userData)
        dispatch(mechanicRegisterSuccess(data))
    }catch(error){
        dispatch(mechanicRegisterFail(error.response.data.message))
    }
}

//wash register
export const washRegister=(userData)=>async(dispatch)=>{
    try{
        dispatch(washRegisterRequest())
        const {data}=await axios.post('https://meezantraders.onrender.com/api/register/carwash',userData)
        dispatch(washRegisterSuccess(data))
    }catch(error){
        dispatch(washRegisterFail(error.response.data.message))
    }
}

//towing register
export const towingRegister=(userData)=>async(dispatch)=>{
    try{
        dispatch(towingRegisterRequest())
        const {data}=await axios.post('https://meezantraders.onrender.com/api/register/towing',userData)
        dispatch(towingRegisterSuccess(data))
    }catch(error){
        dispatch(towingRegisterFail(error.response.data.message))
    }
}


//login
export const login=(phoneNo,password)=>async(dispatch)=>{
    try {
        dispatch(loginRequest())
        const {data}=await axios.post('https://meezantraders.onrender.com/api/login',{phoneNo,password}, { withCredentials: true })
        dispatch(loginSuccess(data))

    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}

//logout
export const logout=async(dispatch)=>{
    try {
        await axios.get('https://meezantraders.onrender.com/api/logout', { withCredentials: true })
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail(error))
    }
}
//load user details
export const loadUser=async(dispatch)=>{
    try {
        dispatch(loadUserRequest())
        const {data} =await axios.get('https://meezantraders.onrender.com/api/myprofile', { withCredentials: true })
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}
export const updateProfile=(userData)=>async (dispatch)=>{
    try {
        dispatch(updateProfileRequest())
        
        
        const {data}=await axios.put(`https://meezantraders.onrender.com/api/update`,userData, { withCredentials: true })
        console.log(data.name)
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
}

export const updatePassword=(formData)=>async (dispatch)=>{
    try {
        dispatch(updatePasswordRequest())
        
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`https://meezantraders.onrender.com/api/password/change`,formData,config, { withCredentials: true })
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }
}

export const forgotPassword=(formData)=>async (dispatch)=>{
    try {
        dispatch(forgotPasswordRequest())
        
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}=await axios.post(`https://meezantraders.onrender.com/api/password/forgot`,formData,config)
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }
}

export const resetPassword=(formData,token)=>async (dispatch)=>{
    try {
        dispatch(resetPasswordRequest())
        
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data}=await axios.post(`https://meezantraders.onrender.com/api/password/reset/${token}`,formData,config)
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
}

export const getUsers=async (dispatch)=>{
    try {
        dispatch(usersRequest())

        
        const {data}=await axios.get(`https://meezantraders.onrender.com/api/admin/users`, { withCredentials: true })
        dispatch(usersSuccess(data))
    } catch (error) {
        dispatch(usersFail(error.response.data.message))
    }
}


export const deleteUser=id=>async (dispatch)=>{
    try {
        dispatch(deleteUserRequest())

        
        const {data}=await axios.delete(`https://meezantraders.onrender.com/api/admin/user/delete/${id}`, { withCredentials: true })
        dispatch(deleteUserSuccess(data))
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message))
    }
}
export const updateUser=(id,formData)=>async (dispatch)=>{
    try {
        dispatch(updateUserRequest())
        
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`https://meezantraders.onrender.com/api/admin/user/update/${id}`,formData,config, { withCredentials: true })
        dispatch(updateUserSuccess())
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }
}

