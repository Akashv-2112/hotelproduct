import { Request, Response } from 'express';
import prisma from '../utils/prisma'; // Your Prisma client

export const getAllBookings = async (req: Request, res: Response) => {
  const bookings = await prisma.booking.findMany();
  res.json(bookings);
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.booking.delete({ where: { id: parseInt(id) } });
  res.status(204).send();
};