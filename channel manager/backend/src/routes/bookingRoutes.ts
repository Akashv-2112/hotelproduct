import { Router } from 'express';
import { createBooking, getBookings } from '../controllers/bookingController';
import { authenticateJWT } from '../middleware/authMiddlewaret';

const router = Router();

router.post('/', authenticateJWT, createBooking);
router.get('/', authenticateJWT, getBookings);

export default router;