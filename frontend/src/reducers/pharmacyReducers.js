import {  PHARMACY_LOGIN_SUCCESS,          PHARMACY_LOGIN_FAIL,             PHARMACY_LOGIN_REQUEST, PHARMACY_LOGOUT,
          PHARMACY_REGISTER_REQUEST,       PHARMACY_REGISTER_SUCCESS,       PHARMACY_REGISTER_FAIL,
          PHARMACY_LIST_REQUEST, PHARMACY_LIST_SUCCESS, PHARMACY_LIST_FAIL, PHARMACY_LIST_RESET, 
          PHARMACY_DELETE_REQUEST, PHARMACY_DELETE_SUCCESS, PHARMACY_DELETE_FAIL,
          PHARMACY_DETAILS_REQUEST, PHARMACY_DETAILS_SUCCESS, PHARMACY_DETAILS_FAIL,
          PHARMACY_UPDATE_REQUEST, PHARMACY_UPDATE_SUCCESS, PHARMACY_UPDATE_FAIL, PHARMACY_UPDATE_RESET 
     } 
from '../constants/pharmacyConstants';

export const pharmacyLoginReducer =  (state = {}, action) => {
switch (action.type) {
  case PHARMACY_LOGIN_REQUEST:
      return {loading: true}

  case PHARMACY_LOGIN_SUCCESS:
      return {loading: false, pharmacyInfo: action.payload }    

  case PHARMACY_LOGIN_FAIL:
      return { loading: false, error: action.payload }

  case PHARMACY_LOGOUT:
      return {}

  default: 
      return state;    
}
}

export const pharmacyRegisterReducer =  (state = {}, action) => {
switch (action.type) {
  case PHARMACY_REGISTER_REQUEST:
      return {loading: true}

  case PHARMACY_REGISTER_SUCCESS:
      return {loading: false, pharmacyInfo: action.payload }    

  case PHARMACY_REGISTER_FAIL:
      return { loading: false, error: action.payload }

  default: 
      return state;    
}
}

export const pharmacyListReducer =  (state = { pharmacies: [] }, action) => {
    switch (action.type) {
        case PHARMACY_LIST_REQUEST:
            return {loading: true}

        case PHARMACY_LIST_SUCCESS:
            return {loading: false, pharmacies: action.payload }    
    
        case PHARMACY_LIST_FAIL:
            return { loading: false, error: action.payload }

        case PHARMACY_LIST_RESET:
            return { pharmacies: [] }    

        default: 
            return state;    
    }
}

export const pharmacyDeleteReducer =  (state = {  }, action) => {
    switch (action.type) {
        case PHARMACY_DELETE_REQUEST:
            return {loading: true}

        case PHARMACY_DELETE_SUCCESS:
            return {loading: false, success: true }    
    
        case PHARMACY_DELETE_FAIL:
            return { loading: false, error: action.payload }  

        default: 
            return state;    
    }
}

export const pharmacyDetailsReducer =  (state = { pharmacy: {} }, action) => {
    switch (action.type) {
        case PHARMACY_DETAILS_REQUEST:
            return {...state, loading: true}

        case PHARMACY_DETAILS_SUCCESS:
            return {loading: false, pharmacy: action.payload }    
    
        case PHARMACY_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state;    
    }
}

export const pharmacyUpdateReducer =  (state = { pharmacy: {} }, action) => {
    switch (action.type) {
        case PHARMACY_UPDATE_REQUEST:
            return {loading: true}

        case PHARMACY_UPDATE_SUCCESS:
            return {loading: false, success: true }    
    
        case PHARMACY_UPDATE_FAIL:
            return { loading: false, error: action.payload }  

        case PHARMACY_UPDATE_RESET:
            return { pharmacy: {} }

        default: 
            return state;    
    }
}