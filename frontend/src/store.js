import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, 
         productUpdateReducer, productReviewCreateReducer, productTopRatedReducer, productVerfiedReducer,
        productNotVerfiedReducer, buyerPrescriptionUploadReducer } 
from './reducers/productReducers';
import { pharmacyProductListReducer, pharmacyProductDetailsReducer, pharmacyProductDeleteReducer, pharmacyProductCreateReducer, 
    pharmacyProductUpdateReducer } 
from './reducers/b2cProductReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer,
         userDeleteReducer, userUpdateReducer } 
from './reducers/userReducers';
import { pharmacyLoginReducer, pharmacyRegisterReducer, pharmacyListReducer, pharmacyDeleteReducer, 
         pharmacyDetailsReducer, pharmacyUpdateReducer } 
from './reducers/pharmacyReducers';
import { doctorLoginReducer, doctorRegisterReducer, doctorListReducer, doctorDeleteReducer, 
    doctorDetailsReducer, doctorUpdateReducer } 
from './reducers/doctorReducers';
import { orderCreateReducer, orderDetailsReducer,  orderPayReducer,  orderDeliverReducer, orderListMyReducer, 
         orderListReducer, orderDeleteReducer, orderVerifiedReducer, orderNotVerifiedReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    productVerified: productVerfiedReducer,
    productNotVerified: productNotVerfiedReducer,
    buyerPrescriptionUpload: buyerPrescriptionUploadReducer,
    cart: cartReducer,
    pharmacyProductList: pharmacyProductListReducer,
    pharmacyProductDetails: pharmacyProductDetailsReducer,
    pharmacyProductDelete: pharmacyProductDeleteReducer,
    pharmacyProductCreate: pharmacyProductCreateReducer,
    pharmacyProductUpdate: pharmacyProductUpdateReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    pharmacyLogin: pharmacyLoginReducer,
    pharmacyRegister: pharmacyRegisterReducer,
    pharmacyList: pharmacyListReducer,
    pharmacyDetails: pharmacyDetailsReducer,
    pharmacyUpdate: pharmacyUpdateReducer,
    pharmacyDelete: pharmacyDeleteReducer,
    doctorLogin: doctorLoginReducer,
    doctorRegister: doctorRegisterReducer,
    doctorList: doctorListReducer,
    doctorDetails: doctorDetailsReducer,
    doctorUpdate: doctorUpdateReducer,
    doctorDelete: doctorDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderVerified: orderVerifiedReducer,
    orderNotVerified: orderNotVerifiedReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems'))
                                                               : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
                                                               : null

const pharmacyInfoFromStorage = localStorage.getItem('pharmacyInfo') ? JSON.parse(localStorage.getItem('pharmacyInfo'))
                                                               : null
                                                            
const doctorInfoFromStorage = localStorage.getItem('doctorInfo') ? JSON.parse(localStorage.getItem('doctorInfo'))
                                                               : null

const exchangeAddressFromStorage = localStorage.getItem('exchangeAddress') 
                                    ? JSON.parse(localStorage.getItem('exchangeAddress'))
                                    : {}


const initialState = {
    cart: {cartItems: cartItemsFromStorage,
           exchangeAddress: exchangeAddressFromStorage
          },
    userLogin: { userInfo: userInfoFromStorage},
    pharmacyLogin: { pharmacyInfo: pharmacyInfoFromStorage},
    doctorLogin: { doctorInfo: doctorInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
