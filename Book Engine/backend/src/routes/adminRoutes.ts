import express from 'express';
import { isAdmin } from '../middleware/auth';
import { getAllBookings, deleteBooking } from '../controllers/adminController';

const router = express.Router();

router.get('/bookings', isAdmin, getAllBookings);
router.delete('/bookings/:id', isAdmin, deleteBooking);

export default router;