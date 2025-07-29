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

export const createBookingService = async (data: {
  userId?: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  status?: string;
}) => {
  const token = await getChannelManagerToken();
  const response = await axios.post(
    `${CHANNEL_MANAGER_URL}/api/bookings`,
    {
      userId: data.userId,
      roomId: data.roomId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      status: data.status || 'pending',
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getAllBookingsService = async (userId?: number) => {
  return prisma.booking.findMany({
    where: userId ? { userId } : undefined,
    include: { user: true, room: true },
  });
};

export const getBookingByIdService = async (id: number) => {
  return prisma.booking.findUnique({
    where: { id },
    include: { user: true, room: true },
  });
}; 