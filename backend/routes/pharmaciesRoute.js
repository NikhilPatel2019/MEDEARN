import express from 'express';
import { authPharmacy, registerPharmacy, getPharmacies, getPharmacyById, updatePharmacy, deletePharmacy }
from '../controllers/pharmacyController.js';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerPharmacy).get(protect, getPharmacies);

router.post('/login', authPharmacy);
// router.route('/profile').get( getPharmacyProfile).put(protectPharmacy, updatePharmacyProfile);
router.route('/:id').delete(protect, admin, deletePharmacy).get(protect, getPharmacyById)
                    .put(protect, admin, updatePharmacy);

export default router;