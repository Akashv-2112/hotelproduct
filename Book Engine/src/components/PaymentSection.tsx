import React, { useState } from 'react';
import { BookingDetails } from '../types/booking';
import { CreditCard, Shield, Lock } from 'lucide-react';

interface PaymentSectionProps {
  bookingDetails: BookingDetails;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ bookingDetails, onPaymentSuccess, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  

  const handleCardInputChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handlePayment = async () => {
    // Prepare booking data
    const bookingData = {
      roomId: bookingDetails.selectedRoom?.id,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.adults + bookingDetails.children,
      // Add user info if needed
    };

    await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    onPaymentSuccess(); // Move to confirmation step
  };

  const subtotal = bookingDetails.totalAmount;
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Secure Payment</h2>
        <p className="text-gray-600 flex items-center justify-center">
          <Shield className="w-4 h-4 mr-2" />
          Your payment information is encrypted and secure
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h3>
          
          {/* Payment Method Selection */}
          <div className="space-y-4 mb-6">
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
              <span className="font-medium">Credit/Debit Card</span>
            </label>
            
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="w-5 h-5 mr-3 bg-blue-600 rounded"></div>
              <span className="font-medium">Razorpay</span>
            </label>
          </div>

          {/* Card Details Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={formatCardNumber(cardDetails.cardNumber)}
                  onChange={(e) => handleCardInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={cardDetails.nameOnCard}
                  onChange={(e) => handleCardInputChange('nameOnCard', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Razorpay Payment */}
          {paymentMethod === 'razorpay' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-blue-600 mb-2">
                <Lock className="w-8 h-8 mx-auto" />
              </div>
              <p className="text-blue-800 font-medium">Secure Payment with Razorpay</p>
              <p className="text-blue-600 text-sm mt-2">
                You will be redirected to Razorpay's secure payment gateway
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-700">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-medium">256-bit SSL encryption</span>
            </div>
            <p className="text-green-600 text-sm mt-1">
              Your payment information is protected with bank-level security
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Room Cost</span>
              <span className="text-gray-800">₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Fees</span>
              <span className="text-gray-800">₹{taxes.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-xl">
                <span className="text-gray-800">Total</span>
                <span className="text-blue-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Booking Details</h4>
            <p className="text-sm text-gray-600">
              {bookingDetails.selectedRoom?.name} • {bookingDetails.totalNights} nights
            </p>
            <p className="text-sm text-gray-600">
              {new Date(bookingDetails.checkIn).toLocaleDateString()} - {new Date(bookingDetails.checkOut).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              {bookingDetails.adults} adults{bookingDetails.children > 0 && `, ${bookingDetails.children} children`}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handlePayment}
              className="w-full py-4 rounded-lg font-semibold transition-colors bg-blue-600 hover:bg-blue-700 text-white"
            >
              {`Pay ₹${total.toFixed(2)}`}
            </button>
            
            <button
              onClick={onBack}
              className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Guest Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;