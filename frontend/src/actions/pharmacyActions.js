import axios from 'axios';
import { PHARMACY_LOGIN_FAIL, PHARMACY_LOGIN_REQUEST, PHARMACY_LOGIN_SUCCESS, PHARMACY_LOGOUT,
         PHARMACY_REGISTER_REQUEST, PHARMACY_REGISTER_SUCCESS, PHARMACY_REGISTER_FAIL,
         PHARMACY_LIST_REQUEST, PHARMACY_LIST_SUCCESS, PHARMACY_LIST_FAIL, PHARMACY_LIST_RESET, 
         PHARMACY_DELETE_REQUEST, PHARMACY_DELETE_SUCCESS, PHARMACY_DELETE_FAIL,
         PHARMACY_DETAILS_REQUEST, PHARMACY_DETAILS_SUCCESS, PHARMACY_DETAILS_FAIL,
         PHARMACY_UPDATE_REQUEST, PHARMACY_UPDATE_SUCCESS, PHARMACY_UPDATE_FAIL} 
from '../constants/pharmacyConstants.js'

export const loginPharmacy = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: PHARMACY_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/pharmacies/login', { email, password}, config);

        dispatch({
            type: PHARMACY_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('pharmacyInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: PHARMACY_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const logoutPharmacy = () => (dispatch) => {
    localStorage.removeItem('pharmacyInfo');
    dispatch({type: PHARMACY_LOGOUT})
    dispatch({type: PHARMACY_LIST_RESET})
}

export const RegisterPharmacy = (pharmacyName, email, password, ownerName, mobileNumber, license, ownerImage, address) => 
                                async (dispatch) => {
    try {
        dispatch({
            type: PHARMACY_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/pharmacies/', { pharmacyName, email, password, ownerName, 
                                                                mobileNumber, license, ownerImage, address}, config);

        dispatch({
            type: PHARMACY_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: PHARMACY_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('pharmacyInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: PHARMACY_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const listPharmacies = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PHARMACY_LIST_REQUEST
        })

        const {userLogin: { userInfo}  } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/pharmacies/`, config);

        dispatch({
            type: PHARMACY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PHARMACY_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const deletePharmacy = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PHARMACY_DELETE_REQUEST
        })

        //userInfo will be needed because only admin can delete pharmacies
        const {userLogin: {userInfo}  } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/pharmacies/${id}`, config);

        dispatch({type: PHARMACY_DELETE_SUCCESS})
    } catch (error) {
        dispatch({
            type: PHARMACY_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const getPharmacyDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PHARMACY_DETAILS_REQUEST
        })

        // User login will come because only admin can make changes 
        const {userLogin: {userInfo}  } = getState();

        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/pharmacies/${id}`, config);

        dispatch({
            type: PHARMACY_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PHARMACY_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const updatePharmacy = (pharmacy) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PHARMACY_UPDATE_REQUEST
        })
        
        // User login will come because only admin can make changes 
        const {userLogin: {userInfo}  } = getState();

        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/pharmacies/${pharmacy._id}`, pharmacy, config);

        dispatch({type: PHARMACY_UPDATE_SUCCESS});

        dispatch({type: PHARMACY_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: PHARMACY_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}