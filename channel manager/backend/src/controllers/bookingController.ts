import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/email';

const prisma = new PrismaClient();

export const createBooking = async (req: Request, res: Response) => {
  const { roomId, checkIn, checkOut } = req.body;
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: 'Authentication required.' });

  // Check availability for each date in the range
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  let current = new Date(start);
  while (current < end) {
    const inventory = await prisma.inventory.findUnique({
      where: { roomId_date: { roomId: Number(roomId), date: current } }
    });
    if (!inventory || inventory.available < 1) {
      return res.status(400).json({ error: `No availability on ${current.toISOString().slice(0, 10)}` });
    }
    current.setDate(current.getDate() + 1);
  }

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      userId: user.userId,
      roomId: Number(roomId),
      checkIn: start,
      checkOut: end,
      status: 'pending'
    }
  });

  // Decrement inventory for each date
  current = new Date(start);
  while (current < end) {
    await prisma.inventory.update({
      where: { roomId_date: { roomId: Number(roomId), date: current } },
      data: { available: { decrement: 1 } }
    });
    current.setDate(current.getDate() + 1);
  }

  const recipientEmail = user?.email || req.body.email;
  if (!recipientEmail) {
    return res.status(400).json({ error: 'No recipient email provided.' });
  }

  await sendEmail(
    recipientEmail,
    'Booking Confirmation',
    `<h1>Thank you for your booking!</h1>
     <p>Your booking for Room ${roomId} from ${checkIn} to ${checkOut} is confirmed.</p>`
  );

  res.status(201).json(booking);
};

export const getBookings = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: 'Authentication required.' });

  const bookings = await prisma.booking.findMany({
    where: { userId: user.userId },
    include: { room: true }
  });
  res.json(bookings);
};