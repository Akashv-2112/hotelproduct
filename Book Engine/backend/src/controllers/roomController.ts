import { Request, Response } from 'express';
import { getAllRoomsService, createRoomService, getRoomByIdService } from '../services/roomService';

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const { hotelId, checkIn, checkOut } = req.query;
    if (!hotelId || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'hotelId, checkIn, and checkOut are required' });
    }
    const rooms = await getAllRoomsService(Number(hotelId), String(checkIn), String(checkOut));
    res.json(rooms);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const room = await createRoomService(req.body);
    res.status(201).json(room);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await getRoomByIdService(Number(req.params.id));
    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }
    res.json(room);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; 