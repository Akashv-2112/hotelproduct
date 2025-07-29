import React, { useState } from 'react';
import { BookingDetails, Room, Guest } from '../types/booking';
import BookingHeader from './BookingHeader';
import RoomSelection from './RoomSelection';
import GuestInfo from './GuestInfo';
import ReservationSummary from './ReservationSummary';
import PaymentSection from './PaymentSection';
import BookingConfirmation from './BookingConfirmation';
import RoomFilters from './RoomFilters';
import TermsAndConditions from './TermsAndConditions';
import { Calendar, Users, CreditCard, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

const BookingEngine: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
    guests: [],
    totalAmount: 0,
    totalNights: 0
  });

  // Room filters state
  const [roomFilters, setRoomFilters] = useState({
    roomType: '',
    amenities: [] as string[],
    sortBy: 'recommended',
    searchQuery: ''
  });



  const steps = [
    { id: 1, title: 'Select Dates', icon: Calendar },
    { id: 2, title: 'Choose Room', icon: Users },
    { id: 3, title: 'Guest Details', icon: FileText },
    { id: 4, title: 'Payment', icon: CreditCard },
    { id: 5, title: 'Confirmation', icon: CheckCircle }
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingDetails = (updates: Partial<BookingDetails>) => {
    setBookingDetails(prev => ({ ...prev, ...updates }));
  };

  const handleRoomSelect = (room: Room) => {
    const checkInDate = new Date(bookingDetails.checkIn);
    const checkOutDate = new Date(bookingDetails.checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const totalAmount = room.price * nights * bookingDetails.rooms;
    
    updateBookingDetails({
      selectedRoom: room,
      totalAmount: totalAmount,
      totalNights: nights
    });
    handleNextStep();
  };

  const handleGuestSubmit = (guests: Guest[]) => {
    updateBookingDetails({ guests });
    handleNextStep();
  };

  const handlePaymentSuccess = () => {
    handleNextStep();
  };

  const handleNewBooking = () => {
    setCurrentStep(1);
    setBookingDetails({
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      rooms: 1,
      guests: [],
      totalAmount: 0,
      totalNights: 0
    });
    setRoomFilters({
      roomType: '',
      amenities: [],
      sortBy: 'recommended',
      searchQuery: ''
    });
  };

  // Available room types and amenities for filters
  const availableRoomTypes = ['Standard', 'Deluxe', 'Suite'];
  const availableAmenities = ['WiFi', 'AC', 'Ocean View', 'City View', 'Mini Bar', 'Balcony', 'Living Area', 'Kitchenette', 'TV', 'Desk'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <BookingHeader />
      
      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center py-5 w-full space-x-1 sm:space-x-2 md:space-x-4">
          {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
              <div
                className={`
                  flex items-center justify-center shadow-xl
                  w-8 h-8 text-base p-3
                  sm:w-15 sm:h-10 sm:text-sm
                  md:w-12 md:h-12 md:text-xl
                  rounded-full
                  font-bold
                  ${currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                `}
              >
                <step.icon className="w-6 h-6 sm:w-2 sm:h-2 md:w-8 md:h-8" />
                </div>
              {idx < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-1
                    ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}
                    transition-colors
                  `}
                />
                )}
              </React.Fragment>
            ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && (
            <RoomSelection 
              bookingDetails={bookingDetails}
              onUpdate={updateBookingDetails}
              onNext={handleNextStep}
            />
          )}
          
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Room</h2>
              
              <RoomFilters
                filters={roomFilters}
                onFilterChange={setRoomFilters}
                onClearFilters={() => setRoomFilters({
                  roomType: '',
                  amenities: [],
                  sortBy: 'recommended',
                  searchQuery: ''
                })}
                availableRoomTypes={availableRoomTypes}
                availableAmenities={availableAmenities}
              />
              
              <RoomList 
                onRoomSelect={handleRoomSelect}
                filters={roomFilters}
              />
              
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <GuestInfo 
              onSubmit={handleGuestSubmit}
              onBack={handlePrevStep}
            />
          )}
          
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Booking</h2>
              
              <ReservationSummary bookingDetails={bookingDetails} />
              
              <PaymentSection 
                bookingDetails={bookingDetails}
                onPaymentSuccess={handlePaymentSuccess}
                onBack={handlePrevStep}
              />
            </div>
          )}
          
          {currentStep === 5 && (
            <BookingConfirmation
              bookingDetails={bookingDetails}
              onBack={handlePrevStep}
              onNewBooking={handleNewBooking}
            />
          )}
        </div>
      </div>
      
      <TermsAndConditions />
    </div>
  );
};

// Room List Component with filtering and sorting
const RoomList: React.FC<{ 
  onRoomSelect: (room: Room) => void;
  filters: {
    roomType: string;
    amenities: string[];
    sortBy: string;
    searchQuery: string;
  };
}> = ({ onRoomSelect, filters }) => {
  const rooms: Room[] = [
    {
      id: '1',
      name: 'Deluxe Ocean View',
      type: 'Deluxe',
      price: 299,
      originalPrice: 399,
      capacity: 2,
      amenities: ['Ocean View', 'WiFi', 'AC', 'Mini Bar', 'Balcony'],
      images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'],
      description: 'Spacious room with stunning ocean views and modern amenities.',
      size: '35 sqm',
      bedType: 'King Bed',
      available: 5
    },
    {
      id: '2',
      name: 'Executive Suite',
      type: 'Suite',
      price: 499,
      originalPrice: 599,
      capacity: 4,
      amenities: ['City View', 'WiFi', 'AC', 'Mini Bar', 'Living Area', 'Kitchenette'],
      images: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'],
      description: 'Luxurious suite with separate living area and premium amenities.',
      size: '55 sqm',
      bedType: 'King Bed + Sofa Bed',
      available: 3
    },
    {
      id: '3',
      name: 'Standard Room',
      type: 'Standard',
      price: 199,
      capacity: 2,
      amenities: ['WiFi', 'AC', 'TV', 'Desk'],
      images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'],
      description: 'Comfortable room with essential amenities for a pleasant stay.',
      size: '25 sqm',
      bedType: 'Queen Bed',
      available: 8
    }
  ];

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    // Room type filter
    if (filters.roomType && room.type !== filters.roomType) {
      return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        room.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch = room.name.toLowerCase().includes(query) ||
        room.description.toLowerCase().includes(query) ||
        room.amenities.some(amenity => amenity.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    return true;
  });

  // Sort rooms
  filteredRooms.sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popularity':
        return b.available - a.available; // More available = more popular
      default:
        return 0; // recommended order
    }
  });

  if (filteredRooms.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No rooms match your filters</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRooms.map(room => (
        <div key={room.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img 
            src={room.images[0]} 
            alt={room.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
              <span className="text-sm text-gray-500">Up to {room.capacity} guests</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{room.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {room.amenities.slice(0, 3).map(amenity => (
                <span key={amenity} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="text-blue-600 text-xs">+{room.amenities.length - 3} more</span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">₹{room.price}</span>
                  {room.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">₹{room.originalPrice}</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">per night</span>
              </div>
              <button 
                onClick={() => onRoomSelect(room)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Select Room
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingEngine;