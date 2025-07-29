import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { authenticateJWT } from './middleware/authMiddlewaret'; 
import hotelRoutes from './routes/hotelRoutes';
import roomRoutes from './routes/roomRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import bookingRoutes from './routes/bookingRoutes';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'You are authenticated!', user: (req as any).user });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

export default app;