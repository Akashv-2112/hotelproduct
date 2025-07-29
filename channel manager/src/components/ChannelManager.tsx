import React, { useState, useEffect } from 'react';
import { ChevronDown, Save, RefreshCw, Calendar, DollarSign, TrendingUp, Users, Eye } from 'lucide-react';

const roomTypes = [
  { id: 'standard', name: 'Standard Room', capacity: 2 },
  { id: 'deluxe', name: 'Deluxe Room', capacity: 3 },
  { id: 'suite', name: 'Suite', capacity: 4 },
  { id: 'presidential', name: 'Presidential Suite', capacity: 6 }
];

const ChannelManager: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState('booking.com');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [channelStats] = useState({
    'booking.com': { bookings: 45, revenue: 12500, occupancy: 78 },
    'expedia': { bookings: 32, revenue: 8900, occupancy: 65 },
    'airbnb': { bookings: 28, revenue: 7200, occupancy: 58 },
    'agoda': { bookings: 19, revenue: 5100, occupancy: 42 },
    'hotel-site': { bookings: 38, revenue: 11200, occupancy: 72 }
  });

  const channels = [
    { id: 'booking.com', name: 'Booking.com', color: 'bg-blue-500' },
    { id: 'expedia', name: 'Expedia', color: 'bg-yellow-500' },
    { id: 'airbnb', name: 'Airbnb', color: 'bg-pink-500' },
    { id: 'agoda', name: 'Agoda', color: 'bg-red-500' },
    { id: 'hotel-site', name: 'Hotel Website', color: 'bg-green-500' }
  ];

  const generateMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const getNextMonths = () => {
    const months = [];
    const current = new Date();
    for (let i = 0; i < 11; i++) {
      const date = new Date(current.getFullYear(), current.getMonth() + i, 1);
      months.push(date);
    }
    return months;
  };

  const days = generateMonthDays(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const currentChannelStats = channelStats[selectedChannel as keyof typeof channelStats];

  const [roomData, setRoomData] = useState(() => {
    const data: any = {};
    channels.forEach(channel => {
      data[channel.id] = {};
      getNextMonths().forEach(month => {
        const monthKey = month.toISOString().slice(0, 7); // 'YYYY-MM'
        data[channel.id][monthKey] = {};
        roomTypes.forEach(room => {
          data[channel.id][monthKey][room.id] = {};
          generateMonthDays(month).forEach(day => {
            data[channel.id][monthKey][room.id][day] = {
              price: Math.floor(Math.random() * 200) + 100,
              available: Math.floor(Math.random() * 10) + 1
            };
          });
        });
      });
    });
    return data;
  });

  const getMonthKey = (date: Date) => date.toISOString().slice(0, 7);
  const currentMonthKey = getMonthKey(currentMonth);

  const updateRoomData = (roomId: string, day: number, field: string, value: number) => {
    setRoomData((prev: any) => ({
      ...prev,
      [selectedChannel]: {
        ...prev[selectedChannel],
        [currentMonthKey]: {
          ...prev[selectedChannel][currentMonthKey],
          [roomId]: {
            ...prev[selectedChannel][currentMonthKey][roomId],
            [day]: {
              ...prev[selectedChannel][currentMonthKey][roomId][day],
              [field]: value
            }
          }
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Pricing updated successfully!');
    }, 1000);
  };

  useEffect(() => {
    setRoomData((prev: any) => {
      const updated = { ...prev };
      if (!updated[selectedChannel]) updated[selectedChannel] = {};
      if (!updated[selectedChannel][currentMonthKey]) updated[selectedChannel][currentMonthKey] = {};
      roomTypes.forEach(room => {
        if (!updated[selectedChannel][currentMonthKey][room.id]) updated[selectedChannel][currentMonthKey][room.id] = {};
        generateMonthDays(currentMonth).forEach(day => {
          if (!updated[selectedChannel][currentMonthKey][room.id][day]) {
            updated[selectedChannel][currentMonthKey][room.id][day] = {
              price: Math.floor(Math.random() * 200) + 100,
              available: Math.floor(Math.random() * 10) + 1
            };
          }
        });
      });
      return updated;
    });
  }, [selectedChannel, currentMonthKey]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Channel Manager</h1>
            <p className="text-gray-600 mt-1">Manage room inventory and pricing across all channels</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Channel Statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {channels.find(c => c.id === selectedChannel)?.name} Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-900">{currentChannelStats?.bookings}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Revenue</p>
                <p className="text-2xl font-bold text-green-900">${currentChannelStats?.revenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Occupancy Rate</p>
                <p className="text-2xl font-bold text-orange-900">{currentChannelStats?.occupancy}%</p>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-center font-medium text-gray-700 mb-2">
              Select Channel
            </label>
            <div className="relative w-full max-w-[200px] mx-auto">
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="w-full max-w-[200px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none mx-auto"
                style={{ maxWidth: '200px' }}
              >
                {channels.map(channel => (
                  <option
                    key={channel.id}
                    value={channel.id}
                    className="w-full max-w-[180px] text-sm text-ellipsis overflow-hidden whitespace-nowrap mx-auto"
                    style={{ maxWidth: '180px' }}
                  >
                    {channel.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-center font-medium text-gray-700 mb-2">
              Select Month
            </label>
            <div className="relative w-full max-w-[200px] mx-auto">
              <select
                value={currentMonth.toISOString()}
                onChange={(e) => setCurrentMonth(new Date(e.target.value))}
                className="w-full max-w-[200px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none mx-auto"
                style={{ maxWidth: '200px' }}
              >
                {getNextMonths().map(month => (
                  <option
                    key={month.toISOString()}
                    value={month.toISOString()}
                    className="w-full max-w-[180px] text-sm text-ellipsis overflow-hidden whitespace-nowrap mx-auto"
                    style={{ maxWidth: '180px' }}
                  >
                    {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </option>
                ))}
              </select>
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full ${channels.find(c => c.id === selectedChannel)?.color} mr-2`}></div>
            <span className="text-sm font-medium text-gray-700">
              {channels.find(c => c.id === selectedChannel)?.name}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {monthName}
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Room Type
                </th>
                {days.map(day => (
                  <th key={day} className="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    <div className="flex flex-col items-center">
                      <span>{day}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roomTypes.map(room => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white border-r border-gray-200 z-10">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{room.name}</div>
                      <div className="text-xs text-gray-500">Max {room.capacity} guests</div>
                    </div>
                  </td>
                  {days.map(day => (
                    <td key={day} className="px-3 py-4 whitespace-nowrap text-center">
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
                          <input
                            type="number"
                            value={roomData[selectedChannel]?.[currentMonthKey]?.[room.id]?.[day]?.price || 0}
                            onChange={(e) => updateRoomData(room.id, day, 'price', parseInt(e.target.value))}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            min="0"
                          />
                        </div>
                        <div className="text-xs text-gray-500">
                          <input
                            type="number"
                            value={roomData[selectedChannel]?.[currentMonthKey]?.[room.id]?.[day]?.available || 0}
                            onChange={(e) => updateRoomData(room.id, day, 'available', parseInt(e.target.value))}
                            className="w-12 px-1 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            min="0"
                            max="20"
                          />
                          <span className="ml-1">avail</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-sm font-medium text-gray-900">Bulk Price Update</div>
            <div className="text-xs text-gray-500 mt-1">Update prices for multiple days</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-sm font-medium text-gray-900">Copy to Channel</div>
            <div className="text-xs text-gray-500 mt-1">Copy settings to other channels</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-sm font-medium text-gray-900">Import Rates</div>
            <div className="text-xs text-gray-500 mt-1">Import from CSV file</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelManager;