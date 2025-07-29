import React, { useEffect, useState } from 'react';
import { BookingDetails, Room } from '../types/booking';
import { Calendar, Users, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';

interface RoomSelectionProps {
  bookingDetails: BookingDetails;
  onUpdate: (updates: Partial<BookingDetails>) => void;
  onNext: () => void;
  onBack?: () => void;
}

const fetchAvailableRooms = async (checkIn: string, checkOut: string) => {
  const hotelId = 1;
  const response = await fetch(
    `http://localhost:3000/api/rooms?hotelId=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}`
  );
  return response.json();
};

const RoomSelection: React.FC<RoomSelectionProps> = ({ bookingDetails, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (bookingDetails.checkIn && bookingDetails.checkOut) {
      fetchAvailableRooms(bookingDetails.checkIn, bookingDetails.checkOut)
        .then((apiRooms) => {
          // Map API result to Room type
          setRooms(apiRooms.map((room: any) => ({
            id: String(room.id),
            name: room.type, // or room.name if available
            type: room.type,
            price: room.price,
            originalPrice: room.originalPrice || room.price,
            capacity: room.capacity || 2,
            amenities: room.amenities || [],
            images: room.images || [],
            description: room.description || '',
            size: room.size || '',
            bedType: room.bedType || '',
            available: room.minAvailable || 0,
          })));
        })
        .catch(() => setRooms([]));
    }
  }, [bookingDetails.checkIn, bookingDetails.checkOut]);


  const handleDateChange = (field: 'checkIn' | 'checkOut', value: string) => {
    onUpdate({ [field]: value });
 
  };

  const handleCountChange = (field: 'adults' | 'children' | 'rooms', delta: number) => {
    const currentValue = bookingDetails[field];
    const newValue = Math.max(field === 'adults' ? 1 : 0, currentValue + delta);
    onUpdate({ [field]: newValue });
  };

  const validateAndProceed = () => {
    const newErrors: string[] = [];
    
    if (!bookingDetails.checkIn) {
      newErrors.push('Check-in date is required');
    }
    if (!bookingDetails.checkOut) {
      newErrors.push('Check-out date is required');
    }
    if (bookingDetails.checkIn && bookingDetails.checkOut) {
      const checkIn = new Date(bookingDetails.checkIn);
      const checkOut = new Date(bookingDetails.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkIn < today) {
        newErrors.push('Check-in date cannot be in the past');
      }
      if (checkOut <= checkIn) {
        newErrors.push('Check-out date must be after check-in date');
      }
    }
    
    setErrors(newErrors);
    
    if (newErrors.length === 0) {
      onNext();
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Your Stay Details</h2>
        <p className="text-gray-600">Choose your dates and guest preferences</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-8 mb-8">
        {/* First Row: Check-in and Check-out */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Check-in Date
            </label>
            <input
              type="date"
              value={bookingDetails.checkIn}
              onChange={(e) => handleDateChange('checkIn', e.target.value)}
              min={today}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ minHeight: '48px' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Check-out Date
            </label>
            <input
              type="date"
              value={bookingDetails.checkOut}
              onChange={(e) => handleDateChange('checkOut', e.target.value)}
              min={bookingDetails.checkIn || today}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ minHeight: '48px' }}
            />
          </div>
        </div>

        {/* Second Row: Rooms, Adults, Children */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rooms
            </label>
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg" style={{ minHeight: '48px' }}>
              <button
                type="button"
                onClick={() => handleCountChange('rooms', -1)}
                className="p-3 hover:bg-gray-100 rounded-full"
                disabled={bookingDetails.rooms <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-lg font-semibold">{bookingDetails.rooms}</span>
              <button
                type="button"
                onClick={() => handleCountChange('rooms', 1)}
                className="p-3   hover:bg-gray-100 rounded-full"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-2" />
              Adults
            </label>
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg" style={{ minHeight: '48px' }}>
              <button
                type="button"
                onClick={() => handleCountChange('adults', -1)}
                className="p-3 hover:bg-gray-100 rounded-full"
                disabled={bookingDetails.adults <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-lg font-semibold">{bookingDetails.adults}</span>
              <button
                type="button"
                onClick={() => handleCountChange('adults', 1)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Children
            </label>
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg" style={{ minHeight: '48px' }}>
              <button
                type="button"
                onClick={() => handleCountChange('children', -1)}
                className="p-3 hover:bg-gray-100 rounded-full"
                disabled={bookingDetails.children <= 0}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-lg font-semibold">{bookingDetails.children}</span>
              <button
                type="button"
                onClick={() => handleCountChange('children', 1)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <ul className="text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm">• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <div className="flex-1"></div>
        <button
          onClick={validateAndProceed}
          disabled={!bookingDetails.checkIn || !bookingDetails.checkOut}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors ${
            !bookingDetails.checkIn || !bookingDetails.checkOut
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Continue to Rooms
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Available Rooms Display */}
      <div className="mt-8">
        {rooms.length === 0 ? (
          <div>No rooms available</div>
        ) : (
          rooms.map(room => (
            <div key={room.id} className="border p-4 rounded mb-4 flex justify-between items-center">
              <div>
                <div className="font-bold">{room.type}</div>
                <div>Price: {room.price}</div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  onUpdate({ selectedRoom: room });
                  onNext();
                }}
              >
                Select
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomSelection;