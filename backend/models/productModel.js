import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'  
    },
    sellerName: {
        type: String,
        required: true,
    },
    sellerEmail: {
        type: String,
        required: true,
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
    location: {
        type: String,
        required:true,
    },
    image: {
        type: String,
        required:true,
    },
    category: {
        type: String,
        required:true,
    },
    company: {
        type: String,
        require: true,
    },   
    mfgDate: {
        type: String,
        required:true,
    }, 
    expiryDate: {
        type: String,
        required:true,
    },
    uploadDate: {
        type: String,
        required:true,
    },
    countInStock: {
        type: Number,
        required: true
    },
    isPrescriptionRequired: {
        type: Boolean,
        required: true,
        default: false,
    },
    prescriptionImage: {
        type: String,
    },
    buyerPrescriptionImage: {
        typr: String,
    },
    isVerified: {
        type: Boolean,
    },
    verifiedAt: {
        type: Date,
    },
    verifierId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' 
    },
    verifierName: {
        type: String,
    },
    verifierEmail: {
        type: String,
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;