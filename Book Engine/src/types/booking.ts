export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  capacity: number;
  amenities: string[];
  images: string[];
  description: string;
  size: string;
  bedType: string;
  available: number;
}

export interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  specialRequests?: string;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  selectedRoom?: Room;
  guests: Guest[];
  totalAmount: number;
  totalNights: number;
  couponCode?: string;
  discountAmount?: number;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}