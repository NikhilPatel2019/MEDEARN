import axios from 'axios';
import { PHARMACY_PRODUCT_LIST_REQUEST, PHARMACY_PRODUCT_LIST_SUCCESS, PHARMACY_PRODUCT_LIST_FAIL,
         PHARMACY_PRODUCT_DETAILS_REQUEST, PHARMACY_PRODUCT_DETAILS_SUCCESS, PHARMACY_PRODUCT_DETAILS_FAIL, 
         PHARMACY_PRODUCT_DELETE_REQUEST, PHARMACY_PRODUCT_DELETE_SUCCESS, PHARMACY_PRODUCT_DELETE_FAIL,
         PHARMACY_PRODUCT_CREATE_REQUEST, PHARMACY_PRODUCT_CREATE_SUCCESS, PHARMACY_PRODUCT_CREATE_FAIL,
         PHARMACY_PRODUCT_UPDATE_REQUEST, PHARMACY_PRODUCT_UPDATE_SUCCESS, PHARMACY_PRODUCT_UPDATE_FAIL,
         } 
from '../constants/b2cProductConstants';

export const listPharmacyProducts = (keyword = '', pageNumber = '') => async(dispatch) =>{
        try{
            dispatch({type: PHARMACY_PRODUCT_LIST_REQUEST});

            const { data } = await axios.get(`/api/b2cproducts?keyword=${keyword}&pageNumber=${pageNumber}`);

            dispatch({
                type: PHARMACY_PRODUCT_LIST_SUCCESS,
                payload: data
            })
        }
        catch(error){
            dispatch({
                type: PHARMACY_PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message
                                                                       : error.message
            })
        }
}

export const listPharmacyProductDetails = (id) => async(dispatch) =>{
    try{
        dispatch({type: PHARMACY_PRODUCT_DETAILS_REQUEST});

        const { data } = await axios.get(`/api/b2cproducts/${id}`);

        dispatch({
            type: PHARMACY_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PHARMACY_PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const deletePharmacyProduct = (id) => async(dispatch, getState) =>{
    try{
        dispatch({type: PHARMACY_PRODUCT_DELETE_REQUEST});

        const { pharmacyLogin: {pharmacyInfo}, } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${pharmacyInfo.token}`
            }
        }

        await axios.delete(`/api/b2cproducts/${id}`, config);

        dispatch({
            type: PHARMACY_PRODUCT_DELETE_SUCCESS
        })
    }
    catch(error){
        dispatch({
            type: PHARMACY_PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const createPharmacyProduct = () => async(dispatch, getState) =>{
    try{
        dispatch({type: PHARMACY_PRODUCT_CREATE_REQUEST});

        const { pharmacyLogin: {pharmacyInfo}, } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${pharmacyInfo.token}`
            }
        }

        const { data }  = await axios.post(`/api/b2cproducts`, {}, config);

        dispatch({
            type: PHARMACY_PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PHARMACY_PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const updatePharmacyProduct = (product) => async(dispatch, getState) =>{
    try{
        dispatch({type: PHARMACY_PRODUCT_UPDATE_REQUEST});

        const { pharmacyLogin: {pharmacyInfo}, } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${pharmacyInfo.token}`
            }
        }

        const { data }  = await axios.put(`/api/b2cproducts/${product._id}`, product, config);

        dispatch({
            type: PHARMACY_PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PHARMACY_PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

