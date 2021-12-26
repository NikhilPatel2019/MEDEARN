import express from 'express';
import { addOrderItems, getOrderById, getOrders, getMyOrders, updateOrderToPaid, updateOrderToDelivered,
         deleteOrder, verifiedOrder, notVerifiedOrder } 
from '../controllers/orderController.js';
const router = express.Router();
import { protect, admin, onlyDoctors } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get( getOrderById).delete(protect, admin, deleteOrder);
router.route('/:id/verifiedorder').put(onlyDoctors, verifiedOrder); 
router.route('/:id/notverifiedorder').put(onlyDoctors, notVerifiedOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);

export default router;