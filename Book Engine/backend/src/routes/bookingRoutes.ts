import { Router } from 'express';
import { createBooking, getAllBookings, getBookingById } from '../controllers/bookingController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.use(authenticateJWT);

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);

export default router; 