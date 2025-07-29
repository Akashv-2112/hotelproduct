import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  User,
  Calendar
} from 'lucide-react';

const Reservations: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reservations = [
    {
      id: 'RES-2024-001',
      guest: 'John Anderson',
      property: 'Grand Plaza Hotel',
      roomType: 'Deluxe Suite',
      checkIn: '2024-01-20',
      checkOut: '2024-01-25',
      nights: 5,
      amount: 1745,
      status: 'confirmed',
      channel: 'Booking.com',
      created: '2024-01-15'
    },
    {
      id: 'RES-2024-002',
      guest: 'Sarah Johnson',
      property: 'Seaside Resort',
      roomType: 'Ocean View',
      checkIn: '2024-01-18',
      checkOut: '2024-01-21',
      nights: 3,
      amount: 837,
      status: 'pending',
      channel: 'Direct',
      created: '2024-01-16'
    },
    {
      id: 'RES-2024-003',
      guest: 'Mike Chen',
      property: 'Mountain Lodge',
      roomType: 'Standard Room',
      checkIn: '2024-01-22',
      checkOut: '2024-01-24',
      nights: 2,
      amount: 398,
      status: 'cancelled',
      channel: 'Expedia',
      created: '2024-01-14'
    },
    {
      id: 'RES-2024-004',
      guest: 'Lisa Wilson',
      property: 'Grand Plaza Hotel',
      roomType: 'Standard Room',
      checkIn: '2024-01-19',
      checkOut: '2024-01-22',
      nights: 3,
      amount: 597,
      status: 'confirmed',
      channel: 'Hotels.com',
      created: '2024-01-17'
    },
  ];

  const failureQueue = [
    {
      id: 'FAIL-001',
      reservation: 'RES-2024-005',
      error: 'Payment authorization failed',
      attempts: 2,
      lastAttempt: '10 min ago',
      property: 'Seaside Resort'
    },
    {
      id: 'FAIL-002',
      reservation: 'RES-2024-006',
      error: 'Room allocation conflict',
      attempts: 1,
      lastAttempt: '25 min ago',
      property: 'Mountain Lodge'
    },
    {
      id: 'FAIL-003',
      reservation: 'RES-2024-007',
      error: 'Guest information incomplete',
      attempts: 3,
      lastAttempt: '1 hour ago',
      property: 'Grand Plaza Hotel'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    if (activeFilter !== 'all' && reservation.status !== activeFilter) return false;
    if (searchTerm && !reservation.guest.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !reservation.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reservations</h1>
        <p className="text-gray-600">Manage bookings, modifications, and guest folios</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-800">1,247</p>
              <p className="text-gray-600 text-sm">Total Reservations</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">892</p>
              <p className="text-gray-600 text-sm">Confirmed</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-600">324</p>
              <p className="text-gray-600 text-sm">Pending</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">31</p>
              <p className="text-gray-600 text-sm">Failed/Cancelled</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Failure Queue Alert */}
      {failureQueue.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-red-800 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Failure Queue ({failureQueue.length} items)
            </h3>
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {failureQueue.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-white rounded p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.reservation} - {item.property}</span>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                    Retry
                  </button>
                </div>
                <p className="text-gray-600 mt-1">{item.error}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'confirmed', 'pending', 'cancelled'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reservations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reservation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(reservation.status)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{reservation.id}</div>
                        <div className="text-sm text-gray-500">{reservation.roomType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{reservation.guest}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{reservation.property}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(reservation.checkIn).toLocaleDateString()} - {new Date(reservation.checkOut).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">{reservation.nights} nights</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {reservation.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{reservation.channel}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;