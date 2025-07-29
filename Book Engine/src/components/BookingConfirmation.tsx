import React, { useState } from 'react';
import { BookingDetails } from '../types/booking';
import { CheckCircle, Mail, Download, Share2, Home, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface BookingConfirmationProps {
  bookingDetails: BookingDetails;
  onBack: () => void;
  onNewBooking: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  bookingDetails, 
  onBack, 
  onNewBooking 
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const bookingId = `BK${Date.now().toString().slice(-8)}`;

  const sendConfirmationEmail = async () => {
    if (!bookingDetails.guests[0]?.email) {
      alert('No email address found for the guest');
      return;
    }

    setSendingEmail(true);
    
    // Simulate email sending
    setTimeout(() => {
      setEmailSent(true);
      setSendingEmail(false);
      
      // In a real app, you would call your email API here
      console.log('Sending email to:', bookingDetails.guests[0].email);
      console.log('Email content:', generateEmailContent());
    }, 2000);
  };

  const generateEmailContent = () => {
    return `
Booking Confirmation - ${bookingId}

Dear ${bookingDetails.guests[0].firstName} ${bookingDetails.guests[0].lastName},

Thank you for your reservation at Luxury Resort & Spa.

Booking Details:
- Booking ID: ${bookingId}
- Check-in: ${new Date(bookingDetails.checkIn).toLocaleDateString()}
- Check-out: ${new Date(bookingDetails.checkOut).toLocaleDateString()}
- Room: ${bookingDetails.selectedRoom?.name}
- Total Amount: ₹${bookingDetails.totalAmount.toFixed(2)}

We look forward to welcoming you!

Best regards,
Luxury Resort & Spa Team
    `;
  };

  const generatePDFContent = () => {
    const subtotal = bookingDetails.totalAmount;
    const taxes = subtotal * 0.12;
    const total = subtotal + taxes;

    return `
BOOKING RECEIPT
Booking ID: ${bookingId}
Date: ${new Date().toLocaleDateString()}

Hotel: Luxury Resort & Spa
Address: 123 Luxury Street, Paradise City

GUEST INFORMATION:
Name: ${bookingDetails.guests[0].firstName} ${bookingDetails.guests[0].lastName}
Email: ${bookingDetails.guests[0].email}
Phone: ${bookingDetails.guests[0].phone}
Address: ${bookingDetails.guests[0].address}

BOOKING DETAILS:
Check-in: ${new Date(bookingDetails.checkIn).toLocaleDateString()}
Check-out: ${new Date(bookingDetails.checkOut).toLocaleDateString()}
Duration: ${bookingDetails.totalNights} nights
Guests: ${bookingDetails.adults} adults${bookingDetails.children > 0 ? `, ${bookingDetails.children} children` : ''}
Rooms: ${bookingDetails.rooms}

ROOM DETAILS:
Room Type: ${bookingDetails.selectedRoom?.name}
Room Size: ${bookingDetails.selectedRoom?.size}
Bed Type: ${bookingDetails.selectedRoom?.bedType}

PRICING:
Room Rate: ₹${bookingDetails.selectedRoom?.price} × ${bookingDetails.totalNights} nights × ${bookingDetails.rooms} room(s)
Subtotal: ₹${subtotal.toFixed(2)}
Taxes & Fees: ₹${taxes.toFixed(2)}
Total: ₹${total.toFixed(2)}

${bookingDetails.guests[0].specialRequests ? `
SPECIAL REQUESTS:
${bookingDetails.guests[0].specialRequests}
` : ''}

IMPORTANT INFORMATION:
- Check-in time: 3:00 PM
- Check-out time: 11:00 AM
- Free cancellation up to 24 hours before check-in
- Contact: +91-555-0123

Thank you for choosing Luxury Resort & Spa!
    `;
  };

  const handleDownloadReceipt = () => {
    const content = generatePDFContent();
    
    // Create a text file (in a real app, you'd generate a proper PDF)
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-receipt-${bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Hotel Booking',
        text: `I just booked a room at Luxury Resort & Spa for ${new Date(bookingDetails.checkIn).toLocaleDateString()}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.text('Luxury Resort & Spa', 105, 18, { align: 'center' });

    doc.setFontSize(10);
    doc.text('123 Luxury Street, Paradise City   +91-555-0123   info@luxuryresort.com', 105, 26, { align: 'center' });
    doc.text('www.luxuryresort.com', 105, 31, { align: 'center' });

    // Paid By
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Paid By', 14, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(`${bookingDetails.guests[0]?.firstName ?? ''} ${bookingDetails.guests[0]?.lastName ?? ''}`, 14, 46);
    doc.text(`${bookingDetails.guests[0]?.email ?? ''}`, 14, 52);

    // Receipt
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('RECEIPT', 170, 40);

    // Booking Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Booking Details', 14, 62);
    doc.setFont('helvetica', 'normal');
    doc.text('Check in', 14, 68);
    doc.text('Check-out', 14, 74);
    doc.text('Guests', 14, 80);
    doc.text('Room', 14, 86);

    doc.text('Receipt #', 120, 68);
    doc.text('Receipt Date', 120, 74);

    // Values
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(bookingDetails.checkIn).toLocaleDateString(), 50, 68);
    doc.text(new Date(bookingDetails.checkOut).toLocaleDateString(), 50, 74);
    doc.text(
      `${bookingDetails.adults} adults${bookingDetails.children > 0 ? `, ${bookingDetails.children} children` : ''}`,
      50, 80
    );
    doc.text(`${bookingDetails.selectedRoom?.name ?? ''}`, 50, 86);

    doc.text(`${bookingId}`, 170, 68);
    doc.text(new Date().toLocaleDateString(), 170, 74);

    // Table
    const nights = bookingDetails.totalNights;
    const roomRate = bookingDetails.selectedRoom?.price ?? 0;
    const subtotal = bookingDetails.totalAmount;
    const taxes = subtotal * 0.12;
    const total = subtotal + taxes;

    autoTable(doc, {
      startY: 95,
      head: [['Quantity', 'Description', 'Unit Price', 'Amount']],
      body: [
        [
          `${nights.toFixed(2)}`,
          `Nights in ${bookingDetails.selectedRoom?.name ?? ''}`,
          `₹${roomRate.toFixed(2)}`,
          `₹${(roomRate * nights).toFixed(2)}`
        ],
        // Example extra:
        // ['2.00', 'Breakfast', '₹200.00', '₹400.00'],
        // ['1.00', 'Airport pick-up', '₹800.00', '₹800.00'],
      ],
      headStyles: { fillColor: [0, 51, 102] },
      styles: { halign: 'center' },
      columnStyles: {
        1: { halign: 'left' }
      }
    });

    // Subtotal, Tax, Total
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.text('Subtotal', 140, finalY + 10);
    doc.text(`₹${subtotal.toFixed(2)}`, 190, finalY + 10, { align: 'right' });
    doc.text('Tax', 140, finalY + 16);
    doc.text(`₹${taxes.toFixed(2)}`, 190, finalY + 16, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text('Total', 140, finalY + 24);
    doc.text(`₹${total.toFixed(2)}`, 190, finalY + 24, { align: 'right' });

    // Notes
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Notes', 14, finalY + 36);
    doc.text('Thank you for staying with us. We look forward to your next visit! :)', 14, finalY + 42);

    doc.save('booking-receipt.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your booking. Your reservation is confirmed.
        </p>
        {bookingDetails.selectedRoom && (
          <div className="mb-4">
            <div className="font-bold">{bookingDetails.selectedRoom.type}</div>
            <div>Price: {bookingDetails.selectedRoom.price}</div>
            <div>
              {new Date(bookingDetails.checkIn).toLocaleDateString()} - {new Date(bookingDetails.checkOut).toLocaleDateString()}
            </div>
          </div>
        )}
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6"
          onClick={onNewBooking}
        >
          Make Another Booking
        </button>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Booking Details</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Stay Information</h4>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Check-in:</span> {new Date(bookingDetails.checkIn).toLocaleDateString()}</p>
              <p><span className="font-medium">Check-out:</span> {new Date(bookingDetails.checkOut).toLocaleDateString()}</p>
              <p><span className="font-medium">Duration:</span> {bookingDetails.totalNights} nights</p>
              <p><span className="font-medium">Guests:</span> {bookingDetails.adults} adults{bookingDetails.children > 0 && `, ${bookingDetails.children} children`}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Room Information</h4>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Room Type:</span> {bookingDetails.selectedRoom?.name}</p>
              <p><span className="font-medium">Room Size:</span> {bookingDetails.selectedRoom?.size}</p>
              <p><span className="font-medium">Bed Type:</span> {bookingDetails.selectedRoom?.bedType}</p>
              <p><span className="font-medium">Total Amount:</span> <span className="font-semibold text-green-600">₹{bookingDetails.totalAmount.toFixed(2)}</span></p>
            </div>
          </div>
        </div>

        {bookingDetails.guests.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3">Guest Information</h4>
            <div className="text-gray-600">
              <p><span className="font-medium">Primary Guest:</span> {bookingDetails.guests[0].firstName} {bookingDetails.guests[0].lastName}</p>
              <p><span className="font-medium">Email:</span> {bookingDetails.guests[0].email}</p>
              <p><span className="font-medium">Phone:</span> {bookingDetails.guests[0].phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={sendConfirmationEmail}
          disabled={sendingEmail || emailSent || !bookingDetails.guests[0]?.email}
          className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-colors ${
            emailSent 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : !bookingDetails.guests[0]?.email
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {sendingEmail ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : emailSent ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Mail className="w-5 h-5" />
          )}
          {sendingEmail ? 'Sending...' : emailSent ? 'Email Sent' : 'Send Email'}
        </button>

        <button
          onClick={handleDownloadReceipt}
          className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Receipt
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          Share Booking
        </button>

        <button
          onClick={onNewBooking}
          className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          New Booking
        </button>
        <button
          className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          onClick={handleDownloadPDF}
        >
          <Download className="w-5 h-5" />
          Download PDF Receipt
        </button>
      </div>

      {/* Important Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h4 className="font-semibold text-yellow-800 mb-3">Important Information</h4>
        <ul className="text-yellow-700 space-y-2 text-sm">
          <li>• Check-in time: 3:00 PM | Check-out time: 11:00 AM</li>
          <li>• Please bring a valid ID and the credit card used for booking</li>
          <li>• Free cancellation up to 24 hours before check-in</li>
          <li>• Contact us at +91-555-0123 for any changes or questions</li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payment
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation; 