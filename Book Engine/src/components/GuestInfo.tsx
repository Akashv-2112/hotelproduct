import React, { useState } from 'react';
import { Guest } from '../types/booking';
import { User, Mail, Phone, MapPin, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';

interface GuestInfoProps {
  onSubmit: (guests: Guest[]) => void;
  onBack: () => void;
}

const GuestInfo: React.FC<GuestInfoProps> = ({ onSubmit, onBack }) => {
  const [guests, setGuests] = useState<Guest[]>([
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      specialRequests: ''
    }
  ]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (index: number, field: keyof Guest, value: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuests(updatedGuests);
  };

  const validateAndSubmit = () => {
    const newErrors: string[] = [];
    const primaryGuest = guests[0];

    if (!primaryGuest.firstName.trim()) {
      newErrors.push('First name is required');
    }
    if (!primaryGuest.lastName.trim()) {
      newErrors.push('Last name is required');
    }
    if (!primaryGuest.email.trim()) {
      newErrors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(primaryGuest.email)) {
      newErrors.push('Please enter a valid email address');
    }
    if (!primaryGuest.phone.trim()) {
      newErrors.push('Phone number is required');
    }
    if (!primaryGuest.address.trim()) {
      newErrors.push('Address is required');
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      onSubmit(guests);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Guest Information</h2>
        <p className="text-gray-600">Please provide your details for the reservation</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Primary Guest Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={guests[0].firstName}
              onChange={(e) => handleInputChange(0, 'firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={guests[0].lastName}
              onChange={(e) => handleInputChange(0, 'lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              value={guests[0].email}
              onChange={(e) => handleInputChange(0, 'email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={guests[0].phone}
              onChange={(e) => handleInputChange(0, 'phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Address *
            </label>
            <textarea
              value={guests[0].address}
              onChange={(e) => handleInputChange(0, 'address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Enter your complete address"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="inline w-4 h-4 mr-1" />
              Special Requests (Optional)
            </label>
            <textarea
              value={guests[0].specialRequests}
              onChange={(e) => handleInputChange(0, 'specialRequests', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Any special requests or preferences?"
            />
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

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={validateAndSubmit}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Continue to Payment
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default GuestInfo;