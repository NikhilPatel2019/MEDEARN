import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const doctorSchema = mongoose.Schema({
    doctorName: {
        type: String,
        required:true
    },
    email: { 
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    registrationNumber: {
        type: String,
        required:true,
        default: undefined
    },
    registrationDate: {
        type: String,
        required:true,
        default: undefined
    },
    registeredCouncil: {
        type: String,
        default: undefined
    },
    dateOfBirth: {
        type: String,
        required:true,
        default: undefined
    },
    address: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required:true,
        default: undefined
    },    
    doctorImage: {
        type: String,
        required: true,
    },
    isDoctor: {
        type: Boolean,
        required:true,
        default: false
    },
    
})

doctorSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

doctorSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;