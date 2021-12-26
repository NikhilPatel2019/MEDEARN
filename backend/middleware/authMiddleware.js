import jwt from 'jsonwebtoken'; 
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Pharmacy from '../models/pharmacyModel.js';
import Doctor from '../models/doctorModel.js';


//This is for the protected route for users
//To the future me If you want to setup new Proected Route paste this in the test section of postman
// pm.environment.set("TOKEN", pm.response.json().token)
//check it out in user login sections (In the folder where u saved all the routes)
const protect = asyncHandler( async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error('Not AUTHORIZED, token failed');
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token');
    }
})

//This is for the protected route for Doctors
const onlyDoctors = asyncHandler( async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.doctor = await Doctor.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error('Not AUTHORIZED, token failed');
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token');
    }
})


//This is for the protected route for pharmacy
const protectPharmacy = asyncHandler( async(req, res, next) => {
    let pharmacyToken
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            pharmacyToken = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(pharmacyToken, process.env.JWT_SECRET)

            req.pharmacy = await Pharmacy.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error('Not AUTHORIZED, Token failed');
        }
    }

    if(!pharmacyToken){
        res.status(401)
        throw new Error('Not Authorized, no Token');
    }
})

//For routes that wants to allow only admin access
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export { protect, protectPharmacy, admin, onlyDoctors };