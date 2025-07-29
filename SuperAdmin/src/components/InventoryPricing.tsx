import React, { useState } from 'react';
import { 
  Calendar, 
  Upload, 
  Settings, 
  AlertTriangle, 
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus
} from 'lucide-react';

const InventoryPricing: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');

  // Sample calendar data
  const calendarData = [
    { date: '2024-01-15', rooms: 45, available: 12, rate: 299, occupancy: 73 },
    { date: '2024-01-16', rooms: 45, available: 8, rate: 329, occupancy: 82 },
    { date: '2024-01-17', rooms: 45, available: 15, rate: 279, occupancy: 67 },
    { date: '2024-01-18', rooms: 45, available: 3, rate: 399, occupancy: 93 },
    { date: '2024-01-19', rooms: 45, available: 0, rate: 449, occupancy: 100 },
    { date: '2024-01-20', rooms: 45, available: 5, rate: 379, occupancy: 89 },
  ];

  const dynamicRules = [
    { 
      id: 1, 
      name: 'Weekend Premium', 
      condition: 'Weekends', 
      adjustment: '+25%', 
      status: 'active',
      properties: 3
    },
    { 
      id: 2, 
      name: 'High Demand Period', 
      condition: 'Occupancy > 85%', 
      adjustment: '+15%', 
      status: 'active',
      properties: 5
    },
    { 
      id: 3, 
      name: 'Last Minute Boost', 
      condition: 'Same Day Booking', 
      adjustment: '+30%', 
      status: 'paused',
      properties: 2
    },
    { 
      id: 4, 
      name: 'Low Season Discount', 
      condition: 'Jan-Mar', 
      adjustment: '-10%', 
      status: 'active',
      properties: 4
    },
  ];

  const stopSells = [
    { property: 'Grand Plaza Hotel', roomType: 'Standard Room', dates: 'Jan 19-20', reason: 'Maintenance' },
    { property: 'Seaside Resort', roomType: 'Ocean View', dates: 'Jan 22-25', reason: 'Renovation' },
    { property: 'Mountain Lodge', roomType: 'Suite', dates: 'Jan 18', reason: 'Event Booking' },
  ];

  const renderCalendarView = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Live Inventory Calendar</h2>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Grand Plaza Hotel</option>
            <option>Seaside Resort</option>
            <option>Mountain Lodge</option>
          </select>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium">January 2024</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Total Rooms</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Available</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Rate</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Occupancy</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {calendarData.map((day, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{new Date(day.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">{day.rooms}</td>
                <td className="py-3 px-4">
                  <span className={`font-medium ${
                    day.available === 0 ? 'text-red-600' : 
                    day.available < 5 ? 'text-amber-600' : 'text-green-600'
                  }`}>
                    {day.available}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium">${day.rate}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          day.occupancy >= 90 ? 'bg-red-500' : 
                          day.occupancy >= 70 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${day.occupancy}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{day.occupancy}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDynamicRules = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Dynamic Pricing Rules</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </button>
      </div>

      <div className="space-y-4">
        {dynamicRules.map((rule) => (
          <div key={rule.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  rule.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <div>
                  <h3 className="font-medium text-gray-800">{rule.name}</h3>
                  <p className="text-sm text-gray-600">{rule.condition}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  rule.adjustment.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {rule.adjustment}
                </span>
                <span className="text-sm text-gray-500">{rule.properties} properties</span>
                <button className="text-gray-600 hover:text-gray-800">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStopSells = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Stop Sells & Restrictions</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Add Stop Sell
        </button>
      </div>

      <div className="space-y-4">
        {stopSells.map((stop, index) => (
          <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="font-medium text-gray-800">{stop.property}</h3>
                  <p className="text-sm text-gray-600">{stop.roomType} • {stop.dates}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-red-700">{stop.reason}</span>
                <button className="text-red-600 hover:text-red-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Inventory & Pricing</h1>
        <p className="text-gray-600">Manage room availability, rates, and dynamic pricing rules</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center">
          <Upload className="w-5 h-5 text-blue-500 mr-3" />
          <span className="font-medium text-gray-800">Bulk Update</span>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center">
          <Calendar className="w-5 h-5 text-green-500 mr-3" />
          <span className="font-medium text-gray-800">Calendar View</span>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center">
          <TrendingUp className="w-5 h-5 text-purple-500 mr-3" />
          <span className="font-medium text-gray-800">Rate Analysis</span>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center">
          <Settings className="w-5 h-5 text-gray-500 mr-3" />
          <span className="font-medium text-gray-800">Preferences</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {renderCalendarView()}
        {renderDynamicRules()}
        {renderStopSells()}
      </div>
    </div>
  );
};

export default InventoryPricing;