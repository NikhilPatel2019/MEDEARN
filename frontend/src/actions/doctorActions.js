import axios from 'axios';
import { DOCTOR_LOGIN_FAIL, DOCTOR_LOGIN_REQUEST, DOCTOR_LOGIN_SUCCESS, DOCTOR_LOGOUT,
         DOCTOR_REGISTER_REQUEST, DOCTOR_REGISTER_SUCCESS, DOCTOR_REGISTER_FAIL,
         DOCTOR_LIST_REQUEST, DOCTOR_LIST_SUCCESS, DOCTOR_LIST_FAIL, DOCTOR_LIST_RESET, 
         DOCTOR_DELETE_REQUEST, DOCTOR_DELETE_SUCCESS, DOCTOR_DELETE_FAIL,
         DOCTOR_DETAILS_REQUEST, DOCTOR_DETAILS_SUCCESS, DOCTOR_DETAILS_FAIL,
         DOCTOR_UPDATE_REQUEST, DOCTOR_UPDATE_SUCCESS, DOCTOR_UPDATE_FAIL} 
from '../constants/doctorConstants.js'

export const loginDoctor = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: DOCTOR_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/doctors/login', { email, password}, config);

        dispatch({
            type: DOCTOR_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('doctorInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: DOCTOR_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const logoutDoctor = () => (dispatch) => {
    localStorage.removeItem('doctorInfo');
    dispatch({type: DOCTOR_LOGOUT})
    dispatch({type: DOCTOR_LIST_RESET})
}

export const RegisterDoctor = ( doctorName, email, password, registrationNumber, registrationDate, 
                                registeredCouncil, dateOfBirth, address, mobileNumber, doctorImage) => 
                                async (dispatch) => {
    try {
        dispatch({
            type: DOCTOR_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/doctors/', {  doctorName, 
            email, 
            password, 
            registrationNumber, 
            registrationDate,
            registeredCouncil, 
            dateOfBirth, 
            address,
            mobileNumber, 
            doctorImage}, config);

        dispatch({
            type: DOCTOR_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: DOCTOR_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('doctorInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: DOCTOR_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const listDoctors = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: DOCTOR_LIST_REQUEST
        })

        const {userLogin: { userInfo}  } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/doctors/`, config);

        dispatch({
            type: DOCTOR_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DOCTOR_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const deleteDoctor = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DOCTOR_DELETE_REQUEST
        })

        //userInfo will be needed because only admin can delete pharmacies
        const {userLogin: {userInfo}  } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/doctors/${id}`, config);

        dispatch({type: DOCTOR_DELETE_SUCCESS})
    } catch (error) {
        dispatch({
            type: DOCTOR_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const getDoctorDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DOCTOR_DETAILS_REQUEST
        })

        // User login will come because only admin can make changes 
        const {userLogin: {userInfo}  } = getState();

        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/doctors/${id}`, config);

        dispatch({
            type: DOCTOR_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DOCTOR_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}

export const updateDoctor = (doctor) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DOCTOR_UPDATE_REQUEST
        })
        
        // User login will come because only admin can make changes 
        const {userLogin: {userInfo}  } = getState();

        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/doctors/${doctor._id}`, doctor, config);

        dispatch({type: DOCTOR_UPDATE_SUCCESS});

        dispatch({type: DOCTOR_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: DOCTOR_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message
                                                                   : error.message
        })
    }
}