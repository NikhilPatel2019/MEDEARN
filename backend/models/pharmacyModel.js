import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const pharmacySchema = mongoose.Schema({
    pharmacyName: {
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
    ownerName: {
        type: String,
        required:true
    },
    mobileNumber: {
        type: Number,
        required:true,
        default: undefined
    },
    license: {
        type: String,
        required:true,
    },
    ownerImage: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    isPharmacy: {
        type: Boolean,
        required:true,
        default: false
    },
    
})

pharmacySchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

pharmacySchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

export default Pharmacy;