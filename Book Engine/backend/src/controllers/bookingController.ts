import { Request, Response } from 'express';
import { createBookingService, getAllBookingsService, getBookingByIdService } from '../services/bookingService';
import { AuthRequest } from '../middleware/auth';
import nodemailer from 'nodemailer';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const booking = await createBookingService({ ...req.body, userId });
    const userEmail = req.user?.email || req.body.email; // Adjust as needed

    if (userEmail) {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or your SMTP provider
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Booking Confirmation',
        html: `
          <h2>Booking Confirmed!</h2>
          <p>Thank you for your booking.</p>
          <ul>
            <li>Room: ${booking.roomId}</li>
            <li>Check-in: ${booking.checkIn}</li>
            <li>Check-out: ${booking.checkOut}</li>
            <li>Guests: ${booking.guests}</li>
            <li>Status: ${booking.status}</li>
          </ul>
        `,
      };

      await transporter.sendMail(mailOptions);
    }
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const bookings = await getAllBookingsService(userId);
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingById = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await getBookingByIdService(Number(req.params.id));
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; 