import { Router } from 'express';
import { addRoom, getRoomsByHotel, updateRoom, getAvailableRooms } from '../controllers/roomController';
import { authenticateJWT } from '../middleware/authMiddlewaret';

const router = Router();

router.post('/', authenticateJWT, addRoom);
router.get('/hotel/:hotelId', authenticateJWT, getRoomsByHotel);
router.put('/:id', authenticateJWT, updateRoom);
router.get('/availability', getAvailableRooms);

export default router;