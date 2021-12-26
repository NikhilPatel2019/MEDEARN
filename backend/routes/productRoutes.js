import express from 'express';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, getTopProducts, 
         createProductReview, verifiedProduct, notVerifiedProduct, updateBuyerPrescription} 
from '../controllers/productController.js';
const router = express.Router();
import { protect, admin, onlyDoctors } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post( protect, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(updateProduct)
                    .patch(updateBuyerPrescription);
router.route('/:id/verified').put(onlyDoctors, verifiedProduct);
router.route('/:id/notverified').put(onlyDoctors, notVerifiedProduct);
router.route('/featured/top').get(getTopProducts)

export default router;