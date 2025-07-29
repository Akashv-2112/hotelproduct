import React from 'react';
import { BookingDetails } from '../types/booking';
import { Calendar, Users, Bed, MapPin, Clock } from 'lucide-react';

interface ReservationSummaryProps {
  bookingDetails: BookingDetails;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({ bookingDetails }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const subtotal = bookingDetails.totalAmount;
  const taxes = subtotal * 0.12; // 12% tax
  const total = subtotal + taxes;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Reservation Summary</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Booking Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Check-in</p>
              <p className="text-sm text-gray-600">{formatDate(bookingDetails.checkIn)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Check-out</p>
              <p className="text-sm text-gray-600">{formatDate(bookingDetails.checkOut)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Duration</p>
              <p className="text-sm text-gray-600">{bookingDetails.totalNights} nights</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Guests</p>
              <p className="text-sm text-gray-600">
                {bookingDetails.adults} adults{bookingDetails.children > 0 && `, ${bookingDetails.children} children`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Bed className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-800">Rooms</p>
              <p className="text-sm text-gray-600">{bookingDetails.rooms} room(s)</p>
            </div>
          </div>
        </div>

        {/* Room Details */}
        {bookingDetails.selectedRoom && (
          <div className="bg-white rounded-lg p-4 w-80">
            <img 
              src={bookingDetails.selectedRoom.images[0]} 
              alt={bookingDetails.selectedRoom.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h4 className="font-semibold text-gray-800 mb-2">{bookingDetails.selectedRoom.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{bookingDetails.selectedRoom.description}</p>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <div>
                <MapPin className="inline w-3 h-3 mr-1" />
                {bookingDetails.selectedRoom.size}
              </div>
              <div>
                <Bed className="inline w-3 h-3 mr-1" />
                {bookingDetails.selectedRoom.bedType}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {bookingDetails.selectedRoom.amenities.slice(0, 4).map(amenity => (
                <span key={amenity} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Guest Information */}
      {bookingDetails.guests.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Guest Information</h4>
          <div className="bg-white rounded-lg p-4">
            <p className="font-medium text-gray-800">
              {bookingDetails.guests[0].firstName} {bookingDetails.guests[0].lastName}
            </p>
            <p className="text-sm text-gray-600">{bookingDetails.guests[0].email}</p>
            <p className="text-sm text-gray-600">{bookingDetails.guests[0].phone}</p>
            <p className="text-sm text-gray-600">
              {bookingDetails.guests[0].address}
            </p>
            {bookingDetails.guests[0].specialRequests && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700">Special Requests:</p>
                <p className="text-sm text-gray-600">{bookingDetails.guests[0].specialRequests}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Pricing Details</h4>
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">
              ₹{bookingDetails.selectedRoom?.price} × {bookingDetails.totalNights} nights × {bookingDetails.rooms} room(s)
            </span>
            <span className="text-gray-800">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes & Fees</span>
            <span className="text-gray-800">₹{taxes.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span className="text-gray-800">Total</span>
              <span className="text-blue-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;