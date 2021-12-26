import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Pharmacy from '../models/pharmacyModel.js';

//@desc Auth the Pharmacy
//@route GET /api/pharmacies/login
//@access Public
const authPharmacy = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const pharmacy = await Pharmacy.findOne({ email });
    if(pharmacy && (await pharmacy.matchPassword(password))){
        res.json({
            _id: pharmacy._id,
            name: pharmacy.pharmacyName,
            email: pharmacy.email,
            isPharmacy: pharmacy.isPharmacy,
            token: generateToken(pharmacy._id)
        })
    } else {
        res.status(404);
        throw new Error('Invalid Email or Password')
    }
});

//@desc Register a new Pharmacy
//@route POST /api/pharmacies
//@access Public
const registerPharmacy = asyncHandler(async(req, res) => {
    const { pharmacyName, email, password, ownerName, mobileNumber, license, ownerImage, address } = req.body

    const pharmacyExists = await Pharmacy.findOne({ email });
    if(pharmacyExists){
        res.status(400)
        throw new Error('Pharmacy already registered with this EmailID');
    }

    const pharmacy = await Pharmacy.create({
        pharmacyName,
        email,
        password,
        ownerName, 
        mobileNumber, 
        license, 
        ownerImage, 
        address
    })

    if(pharmacy){
        res.status(201).json({
            _id: pharmacy._id,
            name: pharmacy.name,
            email: pharmacy.email,
            token: generateToken(pharmacy._id)
        })
    } else {
        res.status(400);
        throw new Error ('Invalid pharmacy data');
    }
});


//Given Below getPharmacyProfile and updatePharmacyProfile are not working commented for future use
// //@desc Get pharmacy profile
// //@route GET /api/pharmacies/profile
// //@access Private
// const getPharmacyProfile = asyncHandler(async(req, res) => {
//     const pharmacy = await Pharmacy.findById(req.pharmacy._id);

//     if(pharmacy){
//         res.json({
//             _id: pharmacy._id,
//             name: pharmacy.name,
//             email: pharmacy.email,
//             isPharmacy: pharmacy.isPharmacy,
//         })
//     } else {
//         res.status(404)
//         throw new Error('Pharmacy not found')
//     }    
// });

// //@desc Update user profile
// //@route PUT /api/users/profile
// //@access Private
// const updatePharmacyProfile = asyncHandler(async(req, res) => {
//     const pharmacy = await Pharmacy.findById(req.pharmacy._id);

//     if(pharmacy){
//        pharmacy.name = req.body.name ||pharmacy.name;
//        pharmacy.email = req.body.email ||pharmacy.email;
//        if(req.body.password) {
//            pharmacy.password = req.body.password;
//        }

//        const updatedPharmacy = await pharmacy.save();

//        res.json({
//         _id: updatedPharmacy._id,
//         name: updatedPharmacy.name,
//         email: updatedPharmacy.email,
//         isPharmacy: updatedPharmacy.isPharmacy,
//         token: generateToken(updatedPharmacy._id)
//     })
//     } else {
//         res.status(404)
//         throw new Error('Pharmacy not found')
//     }    
// });

//@desc Get all pharmacies
//@route GET /api/pharmacies
//@access Private/admin
const getPharmacies = asyncHandler(async(req, res) => {
    const pharmacy = await Pharmacy.find({});
    res.json(pharmacy);
        
});

//@desc Get pharmacy by ID
//@route GET /api/pharmacies/:id
//@access Private/admin
const getPharmacyById = asyncHandler(async(req, res) => {
    const pharmacy = await Pharmacy.findById(req.params.id).select('-password');
    if(pharmacy){
        res.json(pharmacy);
    } else {
        res.status(404);
        throw new Error('Pharmacy not found');
    }        
});

//@desc Update pharmacy
//@route PUT /api/pharmacies/:id
//@access Private/admin
const updatePharmacy = asyncHandler(async(req, res) => {
    const pharmacy = await Pharmacy.findById(req.params.id);

    if(pharmacy){
       pharmacy.email = req.body.email ||pharmacy.email;
       pharmacy.address = req.body.address ||pharmacy.address;
       pharmacy.mobileNumber = req.body.mobileNumber ||pharmacy.mobileNumber;
       pharmacy.isPharmacy = req.body.isPharmacy;

       const updatedPharmacy = await pharmacy.save();

       res.json({
        _id: updatedPharmacy._id,
        email: updatedPharmacy.email,
        address: updatedPharmacy.address,
        mobileNumber: updatedPharmacy.mobileNumber,
        isPharmacy: updatedPharmacy.isPharmacy,
    })
    } else {
        res.status(404)
        throw new Error('Pharmacy not found')
    }    
});

//@desc Delete pharmacy
//@route DELETE /api/pharmacies/:id
//@access Private/admin
const deletePharmacy = asyncHandler(async(req, res) => {
    const pharmacy = await Pharmacy.findById(req.params.id);
    if(pharmacy){
        await pharmacy.remove();
        res.json({message: 'Pharmacy removed'})
    } else {
        res.status(404);
        throw new Error('Pharmacy not found');
    }
        
});

export { authPharmacy, registerPharmacy, getPharmacies, getPharmacyById, updatePharmacy, deletePharmacy };
