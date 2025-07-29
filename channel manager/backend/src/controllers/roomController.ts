import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addRoom = async (req: Request, res: Response) => {
  const { hotelId, type, capacity } = req.body;
  const user = (req as any).user;
  if (!user || user.role !== 'manager') return res.status(403).json({ error: 'Only managers can add rooms.' });
  if (!hotelId || !type || !capacity) return res.status(400).json({ error: 'All fields are required.' });

  const room = await prisma.room.create({
    data: { hotelId: Number(hotelId), type, capacity: Number(capacity) }
  });
  res.status(201).json(room);
};

export const getRoomsByHotel = async (req: Request, res: Response) => {
  const { hotelId } = req.params;
  const rooms = await prisma.room.findMany({ where: { hotelId: Number(hotelId) } });
  res.json(rooms);
};

export const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, capacity } = req.body;
  const user = (req as any).user;
  if (!user || user.role !== 'manager') return res.status(403).json({ error: 'Only managers can update rooms.' });

  const room = await prisma.room.update({
    where: { id: Number(id) },
    data: { type, capacity: Number(capacity) }
  });
  res.json(room);
};

/**
 * Get available rooms for a hotel and date range.
 * Query: ?hotelId=1&checkIn=2024-07-22&checkOut=2024-07-25
 */
export const getAvailableRooms = async (req: Request, res: Response) => {
  const { hotelId, checkIn, checkOut } = req.query;
  if (!hotelId || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'hotelId, checkIn, and checkOut are required.' });
  }

  // Get all rooms for the hotel
  const rooms = await prisma.room.findMany({
    where: { hotelId: Number(hotelId) },
    include: { inventory: true }
  });

  const start = new Date(checkIn as string);
  const end = new Date(checkOut as string);

  // Helper to get all dates in range
  const getDatesInRange = (start: Date, end: Date) => {
    const dates = [];
    let current = new Date(start);
    while (current < end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const dates = getDatesInRange(start, end);

  // Filter rooms by availability for all dates
  const availableRooms = rooms.map(room => {
    // Find inventory for all dates in range
    const inventories = dates.map(date =>
      room.inventory.find(inv => inv.date.toISOString().slice(0, 10) === date.toISOString().slice(0, 10))
    );
    // If any date is missing or available < 1, room is not available
    if (inventories.some(inv => !inv || inv.available < 1)) return null;
    // Minimum available for the range
    const minAvailable = Math.min(...inventories.map(inv => inv!.available));
    // Use price from first date (or average, as you wish)
    const price = inventories[0]!.price;
    return {
      id: room.id,
      type: room.type,
      capacity: room.capacity,
      minAvailable,
      price
    };
  }).filter(Boolean);

  res.json(availableRooms);
};