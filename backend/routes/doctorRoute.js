import express from 'express';
import { authDoctor, registerDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor }
from '../controllers/doctorController.js';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerDoctor).get(protect, getDoctors);

router.post('/login', authDoctor);
// router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteDoctor).get(protect, getDoctorById)
                    .put(protect, admin, updateDoctor);

export default router;