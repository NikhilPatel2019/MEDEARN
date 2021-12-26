import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Doctor from '../models/doctorModel.js';

//@desc Auth the Doctor
//@route GET /api/doctors/login
//@access Public
const authDoctor = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const doctor = await Doctor.findOne({ email });
    if(doctor && (await doctor.matchPassword(password))){
        res.json({
            _id: doctor._id,
            name: doctor.doctorName,
            email: doctor.email,
            isdoctor: doctor.isdoctor,
            token: generateToken(doctor._id)
        })
    } else {
        res.status(404);
        throw new Error('Invalid Email or Password')
    }
});

//@desc Register a new Doctor
//@route POST /api/doctors
//@access Public
const registerDoctor = asyncHandler(async(req, res) => {
    const { doctorName, email, password, registrationNumber, registrationDate, registeredCouncil, dateOfBirth, 
            address, mobileNumber, doctorImage } = req.body

    const doctorExists = await Doctor.findOne({ email });
    if(doctorExists){
        res.status(400)
        throw new Error('Doctor already registered with this EmailID');
    }

    const doctor = await Doctor.create({
        doctorName, 
        email, 
        password, 
        registrationNumber, 
        registrationDate,
        registeredCouncil, 
        dateOfBirth, 
        address,
        mobileNumber, 
        doctorImage
    })

    if(doctor){
        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            token: generateToken(doctor._id)
        })
    } else {
        res.status(400);
        throw new Error ('Invalid doctor data');
    }
});

//@desc Get all Doctors
//@route GET /api/doctors
//@access Public
const getDoctors = asyncHandler(async(req, res) => {
    const doctor = await Doctor.find({});
    res.json(doctor);
        
});

//@desc Get doctor by ID
//@route GET /api/doctors/:id
//@access Private/admin
const getDoctorById = asyncHandler(async(req, res) => {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    if(doctor){
        res.json(doctor);
    } else {
        res.status(404);
        throw new Error('Doctor not found');
    }        
});

//@desc Update doctor
//@route PUT /api/doctors/:id
//@access Private/admin
const updateDoctor = asyncHandler(async(req, res) => {
    const doctor = await Doctor.findById(req.params.id);

    if(doctor){
       doctor.email = req.body.email ||doctor.email;
       doctor.address = req.body.address ||doctor.address;
       doctor.mobileNumber = req.body.mobileNumber ||doctor.mobileNumber;
       doctor.isDoctor = req.body.isDoctor;

       const updatedDoctor = await doctor.save();

       res.json({
        _id: updatedDoctor._id,
        email: updatedDoctor.email,
        address: updatedDoctor.address,
        mobileNumber: updatedDoctor.mobileNumber,
        isDoctor: updatedDoctor.isDoctor,
    })
    } else {
        res.status(404)
        throw new Error('Doctor not found')
    }    
});

//@desc Delete doctor
//@route DELETE /api/doctors/:id
//@access Private/admin
const deleteDoctor = asyncHandler(async(req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if(doctor){
        await doctor.remove();
        res.json({message: 'Doctor removed'})
    } else {
        res.status(404);
        throw new Error('Doctor not found');
    }
        
});

export { authDoctor, registerDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor };
