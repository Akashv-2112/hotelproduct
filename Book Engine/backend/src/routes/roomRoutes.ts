import { Router } from 'express';
import { getAllRooms, createRoom, getRoomById } from '../controllers/roomController';

const router = Router();

router.get('/', getAllRooms);
router.post('/', createRoom); // In production, protect this with admin auth
router.get('/:id', getRoomById);

export default router; 