import mongoose from "mongoose";

const pharmacyProductsSchema = mongoose.Schema({
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Pharmacy'  
    },
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true,
    },
    originalPrice: {
        type: Number,
        required:true,
        default: undefined
    },
    offeredPrice: {
        type: Number,
        required:true,
        default: undefined
    },
    category: {
        type: String,
        required:true,
    },
    company: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        required:true,
    },
    uploadDate: {
        type: String,
        required:true,
    },
    expiryDate: {
        type: String,
        required: true,
    },
    isPrescriptionRequired: {
        type: Boolean,
        required:true,
        default: false
    },
    isSold: {
        type: Boolean,
        required:true,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
      },
}, {
    timestamps: true
})

const PharmacyProducts = mongoose.model('PharmacyProducts', pharmacyProductsSchema);

export default PharmacyProducts;