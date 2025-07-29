import { Router } from 'express';
import { createHotel, getHotels, getHotelById, updateHotel } from '../controllers/hotelController';
import { authenticateJWT } from '../middleware/authMiddlewaret';

const router = Router();

router.post('/', authenticateJWT, createHotel);
router.get('/', authenticateJWT, getHotels);
router.get('/:id', authenticateJWT, getHotelById);
router.put('/:id', authenticateJWT, updateHotel);

export default router;