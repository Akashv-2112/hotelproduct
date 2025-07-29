import { Router } from 'express';
import { setInventory, getInventory } from '../controllers/inventoryController';
import { authenticateJWT } from '../middleware/authMiddlewaret';

const router = Router();

router.post('/', authenticateJWT, setInventory);
router.get('/:roomId', authenticateJWT, getInventory);

export default router;