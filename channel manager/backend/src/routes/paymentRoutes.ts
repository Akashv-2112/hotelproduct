import { Router } from 'express';
import { createRazorpayOrder } from '../controllers/paymentController';
import { authenticateJWT } from '../middleware/authMiddlewaret';

const router = Router();

router.post('/razorpay/order', authenticateJWT, createRazorpayOrder);

export default router;