import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createHotel = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = (req as any).user;
  if (!name) return res.status(400).json({ error: 'Hotel name is required.' });
  if (!user || user.role !== 'manager') return res.status(403).json({ error: 'Only managers can create hotels.' });

  const hotel = await prisma.hotel.create({
    data: { name }
  });
  res.status(201).json(hotel);
};

export const getHotels = async (req: Request, res: Response) => {
  const hotels = await prisma.hotel.findMany();
  res.json(hotels);
};

export const getHotelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hotel = await prisma.hotel.findUnique({ where: { id: Number(id) } });
  if (!hotel) return res.status(404).json({ error: 'Hotel not found.' });
  res.json(hotel);
};

export const updateHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = (req as any).user;
  if (!user || user.role !== 'manager') return res.status(403).json({ error: 'Only managers can update hotels.' });

  const hotel = await prisma.hotel.update({
    where: { id: Number(id) },
    data: { name }
  });
  res.json(hotel);
};