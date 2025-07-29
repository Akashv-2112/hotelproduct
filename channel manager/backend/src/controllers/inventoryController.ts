import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const setInventory = async (req: Request, res: Response) => {
  const { roomId, date, price, available } = req.body;
  const user = (req as any).user;
  if (!user || user.role !== 'manager') return res.status(403).json({ error: 'Only managers can set inventory.' });
  if (!roomId || !date || price == null || available == null) return res.status(400).json({ error: 'All fields are required.' });

  // Upsert inventory for the given room and date
  const inventory = await prisma.inventory.upsert({
    where: { roomId_date: { roomId: Number(roomId), date: new Date(date) } },
    update: { price: Number(price), available: Number(available) },
    create: { roomId: Number(roomId), date: new Date(date), price: Number(price), available: Number(available) }
  });
  res.status(200).json(inventory);
};

export const getInventory = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { start, end } = req.query;
  const where: any = { roomId: Number(roomId) };
  if (start && end) {
    where.date = { gte: new Date(start as string), lte: new Date(end as string) };
  }
  const inventory = await prisma.inventory.findMany({ where });
  res.json(inventory);
};