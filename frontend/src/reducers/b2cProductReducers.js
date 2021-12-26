import { PHARMACY_PRODUCT_LIST_REQUEST, PHARMACY_PRODUCT_LIST_SUCCESS, PHARMACY_PRODUCT_LIST_FAIL,
    PHARMACY_PRODUCT_DETAILS_REQUEST, PHARMACY_PRODUCT_DETAILS_SUCCESS, PHARMACY_PRODUCT_DETAILS_FAIL, 
    PHARMACY_PRODUCT_DELETE_REQUEST, PHARMACY_PRODUCT_DELETE_SUCCESS, PHARMACY_PRODUCT_DELETE_FAIL,
    PHARMACY_PRODUCT_CREATE_REQUEST, PHARMACY_PRODUCT_CREATE_SUCCESS, PHARMACY_PRODUCT_CREATE_FAIL, PHARMACY_PRODUCT_CREATE_RESET,
    PHARMACY_PRODUCT_UPDATE_REQUEST, PHARMACY_PRODUCT_UPDATE_SUCCESS, PHARMACY_PRODUCT_UPDATE_FAIL, PHARMACY_PRODUCT_UPDATE_RESET,
   }
from '../constants/b2cProductConstants';

export const pharmacyProductListReducer =  (state = {pharmacyProducts: []}, action) => {
switch (action.type) {
   case PHARMACY_PRODUCT_LIST_REQUEST:
       return {loading: true, pharmacyProducts: [] }

   case PHARMACY_PRODUCT_LIST_SUCCESS:
       return {loading: false, pharmacyProducts: action.payload.pharmacyProducts, pages: action.payload.pages, 
               page: action.payload.page }    

   case PHARMACY_PRODUCT_LIST_FAIL:
       return { loading: false, error: action.payload }

   default: 
       return state;    
}
}

export const pharmacyProductDetailsReducer =  (state = {pharmacyProducts: {reviews: []}}, action) => {
switch (action.type) {
   case PHARMACY_PRODUCT_DETAILS_REQUEST:
       return {loading: true, ...state }

   case PHARMACY_PRODUCT_DETAILS_SUCCESS:
       return {loading: false, pharmacyProducts: action.payload }    

   case PHARMACY_PRODUCT_DETAILS_FAIL:
       return { loading: false, error: action.payload }

   default: 
       return state;    
}
}

export const pharmacyProductDeleteReducer =  (state = {}, action) => {
switch (action.type) {
   case PHARMACY_PRODUCT_DELETE_REQUEST:
       return {loading: true }

   case PHARMACY_PRODUCT_DELETE_SUCCESS:
       return {loading: false, success: true }    

   case PHARMACY_PRODUCT_DELETE_FAIL:
       return { loading: false, error: action.payload }

   default: 
       return state;    
}
}

export const pharmacyProductCreateReducer =  (state = {}, action) => {
switch (action.type) {
   case PHARMACY_PRODUCT_CREATE_REQUEST:
       return {loading: true }

   case PHARMACY_PRODUCT_CREATE_SUCCESS:
       return {loading: false, success: true, product: action.payload }    

   case PHARMACY_PRODUCT_CREATE_FAIL:
       return { loading: false, error: action.payload }

   case PHARMACY_PRODUCT_CREATE_RESET:
       return {}

   default: 
       return state;    
}
}

export const pharmacyProductUpdateReducer =  (state = { pharmacyProducts: {}}, action) => {
switch (action.type) {
   case PHARMACY_PRODUCT_UPDATE_REQUEST:
       return {loading: true }

   case PHARMACY_PRODUCT_UPDATE_SUCCESS:
       return {loading: false, success: true, pharmacyProducts: action.payload }    

   case PHARMACY_PRODUCT_UPDATE_FAIL:
       return { loading: false, error: action.payload }

   case PHARMACY_PRODUCT_UPDATE_RESET:
       return { pharmacyProducts: {}}

   default: 
       return state;    
}
}


