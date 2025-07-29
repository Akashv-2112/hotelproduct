import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const SERVICE_EMAIL = 'samplehotel1@gmail.com';
const SERVICE_PASSWORD = 'samplehotel';
const CHANNEL_MANAGER_URL = 'http://localhost:4000';

let cachedToken: string | null = null;

async function getChannelManagerToken() {
  if (cachedToken) return cachedToken;
  const response = await axios.post(`${CHANNEL_MANAGER_URL}/api/auth/login`, {
    email: SERVICE_EMAIL,
    password: SERVICE_PASSWORD,
  });
  cachedToken = response.data.token;
  return cachedToken;
}

export const getAllRoomsService = async (hotelId: number, checkIn: string, checkOut: string) => {
  const token = await getChannelManagerToken();
  const response = await axios.get(`${CHANNEL_MANAGER_URL}/api/rooms/available`, {
    params: { hotelId, checkIn, checkOut },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createRoomService = async (data: {
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
}) => {
  return prisma.room.create({ data });
};

export const getRoomByIdService = async (id: number) => {
  return prisma.room.findUnique({ where: { id } });
}; 