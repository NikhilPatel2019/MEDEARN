import express from 'express';
import { getPharmacyProducts, createPharmacyProduct, updatePharmacyProduct, deletePharmacyProduct, 
         getPharmacyProductById } 
from '../controllers/pharmacyProductController.js';
const router = express.Router();
import { protectPharmacy, admin } from '../middleware/authMiddleware.js'

router.route('/').get( getPharmacyProducts).post(protectPharmacy, createPharmacyProduct);
router.route('/:id').get(getPharmacyProductById).delete(protectPharmacy, deletePharmacyProduct)
                    .put( protectPharmacy, updatePharmacyProduct);
// router.route('/featured/top').get(getTopProducts)

export default router;