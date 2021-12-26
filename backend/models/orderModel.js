import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        offeredPrice: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        sellerName: { type: String, required: true },
        sellerEmail: { type: String, required: true },
        isPrescriptionRequired: {
          type: Boolean,
          required: true,
        },
        isVerified: {
          type: Boolean,
          required: true,
        },
        verifierName: {
          type: String,
          required: true,
        },
        verifierEmail: {
          type: String,
          required: true,
        }
      },
    ],
    exchangeAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    exchangePrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isOrderVerified: {
      type: Boolean,
    },
    orderVerifiedAt: {
      type: Date,
    },
    orderVerifierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    orderVerifiedBy: {
      type: String
    },
    orderVerifierEmail: {
      type: String
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order