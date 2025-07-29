import React, { useState } from 'react';
import { FileText, X, Shield, CreditCard, Calendar, Users } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Terms Link */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Terms & Conditions and Privacy Policy
          </button>
        </div>
      </div>

      {/* Terms Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Terms & Conditions</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Booking Policy */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Booking Policy
                </h3>
                <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong>Check-in:</strong> 3:00 PM - 11:00 PM</p>
                  <p><strong>Check-out:</strong> 11:00 AM</p>
                  <p><strong>Minimum Stay:</strong> 1 night</p>
                  <p><strong>Maximum Stay:</strong> 30 nights</p>
                  <p><strong>Booking Confirmation:</strong> Instant confirmation upon payment</p>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Cancellation Policy
                </h3>
                <div className="bg-green-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong>Free Cancellation:</strong> Up to 24 hours before check-in</p>
                  <p><strong>Late Cancellation:</strong> 50% refund if cancelled within 24 hours</p>
                  <p><strong>No Show:</strong> No refund for no-shows</p>
                  <p><strong>Modification:</strong> Subject to availability and rate changes</p>
                </div>
              </div>

              {/* Payment Terms */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
                  Payment Terms
                </h3>
                <div className="bg-amber-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong>Payment:</strong> Full payment required at time of booking</p>
                  <p><strong>Currency:</strong> All prices are in USD</p>
                  <p><strong>Taxes:</strong> 12% tax included in total price</p>
                  <p><strong>Additional Fees:</strong> Resort fees may apply at property</p>
                  <p><strong>Refunds:</strong> Processed within 5-7 business days</p>
                </div>
              </div>

              {/* Guest Policy */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Guest Policy
                </h3>
                <div className="bg-purple-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong>Age Requirement:</strong> Primary guest must be 18+ years old</p>
                  <p><strong>Occupancy:</strong> Maximum occupancy as specified per room</p>
                  <p><strong>ID Required:</strong> Valid government-issued ID required at check-in</p>
                  <p><strong>Pets:</strong> Pet policy varies by property</p>
                  <p><strong>Smoking:</strong> Smoking prohibited in all rooms</p>
                </div>
              </div>

              {/* General Terms */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">General Terms</h3>
                <div className="text-sm text-gray-600 space-y-3">
                  <p>
                    <strong>Liability:</strong> The hotel booking engine acts as an intermediary between 
                    guests and hotels. We are not liable for any issues arising from your stay.
                  </p>
                  <p>
                    <strong>Force Majeure:</strong> Neither party shall be liable for any failure to 
                    perform due to circumstances beyond their reasonable control.
                  </p>
                  <p>
                    <strong>Disputes:</strong> Any disputes will be resolved through binding arbitration 
                    in accordance with local laws.
                  </p>
                  <p>
                    <strong>Modifications:</strong> We reserve the right to modify these terms at any time. 
                    Continued use of the service constitutes acceptance of modified terms.
                  </p>
                  <p>
                    <strong>Privacy:</strong> Your personal information is collected and used in accordance 
                    with our Privacy Policy. We do not share your information with third parties except 
                    as necessary to complete your booking.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Customer Service:</strong> +1 (555) 123-4567</p>
                  <p><strong>Email:</strong> support@hotelbookingengine.com</p>
                  <p><strong>Hours:</strong> 24/7 customer support</p>
                  <p><strong>Address:</strong> 123 Hotel Street, City, State 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsAndConditions;