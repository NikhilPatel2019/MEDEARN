import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js';

//@desc Create new Order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async(req, res) => {
    const { orderItems, exchangeAddress, paymentMethod, itemsPrice, taxPrice, exchangePrice, totalPrice } 
    = req.body;

    if(orderItems && orderItems.lenght === 0){
        res.status(400);
        throw new Error('No Order Items')
        return
    } else{
         const order = new Order ( {
            orderItems, buyer: req.user._id, exchangeAddress, paymentMethod, itemsPrice, taxPrice, 
            exchangePrice, totalPrice
         })

         const createdOrder = await order.save();

         res.status(201).json(createdOrder);
    }
});

//@desc Get order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('buyer', 'name email')

    if(order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//@desc Get All Order
//@route GET /api/orders
//@access Private/Admin
const getOrders = asyncHandler(async (req, res,) => {
    const orders = await Order.find({}).populate('buyer', 'id name');
    res.json(orders)
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })

//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res,) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//@desc Get Logged in User Order
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res,) => {
    console.log(req.user._id)
    const orders = await Order.find({buyer: req.user._id})
    res.json(orders)
})

//@desc Delete a Product
//@route DELETE /api/orders/:id
//@access Private/Admin
const deleteOrder = asyncHandler(async(req, res) => {
    const product = await Order.findById(req.params.id)

    if (product) {
        await product.remove();
        res.json({message: 'Order Removed'});  
    } else {
        res.status(404)
        throw new Error('Order not found.')
    }
});

// //@desc Update order to verified
// //@route PUT /api/orders/:id/verifiedorder
// //@access Public
const verifiedOrder = asyncHandler(async (req, res,) => {
    const order = await Order.findById(req.params.id);
    console.log(req.doctor)
    
    if(order) {
        order.isOrderVerified = true
        order.orderVerifiedAt = Date.now()
        order.orderVerifierId = req.doctor._id
        order.orderVerifiedBy = req.doctor.doctorName
        order.orderVerifierEmail = req.doctor.email
  
        const updatedOrder = await order.save()
  
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found');
    }
  })


  
    //@desc Update order to verified
//@route PUT /api/orders/:id/notverifiedorder
//@access Public
const notVerifiedOrder = asyncHandler(async (req, res,) => {
    const order = await Order.findById(req.params.id)
    console.log(req.doctor)
  
    if(order) {
        order.isOrderVerified = false
        order. orderVerifiedAt = Date.now()
        order.orderVerifierId = req.doctor._id
        order.orderVerifiedBy = req.doctor.doctorName
        order.orderVerifierEmail = req.doctor.email
  
        const updatedOrder = await order.save()
  
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found');
    }
  })

export { addOrderItems, getOrderById, getOrders, getMyOrders, updateOrderToPaid, updateOrderToDelivered,
         deleteOrder, verifiedOrder, notVerifiedOrder };