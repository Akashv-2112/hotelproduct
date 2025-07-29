import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, DoorOpen, DoorClosed, BarChart3, Globe } from 'lucide-react';

interface DashboardProps {
  hotel: any;
}

// Define the type for a revenue item
interface ChannelRevenueItem {
  channel: string;
  revenue: number;
  color: string;
}

const Dashboard: React.FC<DashboardProps> = ({ hotel }) => {
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  
  const stats = {
    todayCheckins: 24,
    todayCheckouts: 18,
    totalBookings: 156,
    occupancyRate: 85,
    revenue: 15420
  };

  // Simulated revenue data for different date ranges
  const revenueDataByRange: { [key: string]: ChannelRevenueItem[] } = {
    '7days': [
    { channel: 'Booking.com', revenue: 12500, color: 'bg-blue-500' },
    { channel: 'Hotel Website', revenue: 11200, color: 'bg-green-500' },
    { channel: 'Expedia', revenue: 8900, color: 'bg-yellow-500' },
    { channel: 'Airbnb', revenue: 7200, color: 'bg-pink-500' },
    { channel: 'Agoda', revenue: 5100, color: 'bg-red-500' }
    ],
    '30days': [
      { channel: 'Booking.com', revenue: 42000, color: 'bg-blue-500' },
      { channel: 'Hotel Website', revenue: 39000, color: 'bg-green-500' },
      { channel: 'Expedia', revenue: 32000, color: 'bg-yellow-500' },
      { channel: 'Airbnb', revenue: 27000, color: 'bg-pink-500' },
      { channel: 'Agoda', revenue: 18000, color: 'bg-red-500' }
    ],
    '90days': [
      { channel: 'Booking.com', revenue: 120000, color: 'bg-blue-500' },
      { channel: 'Hotel Website', revenue: 110000, color: 'bg-green-500' },
      { channel: 'Expedia', revenue: 95000, color: 'bg-yellow-500' },
      { channel: 'Airbnb', revenue: 80000, color: 'bg-pink-500' },
      { channel: 'Agoda', revenue: 60000, color: 'bg-red-500' }
    ]
  };

  // Get current data based on selected range
  const channelRevenueData: ChannelRevenueItem[] = revenueDataByRange[selectedDateRange];

  // Dynamically calculate max revenue for axis (rounded up to nearest 5000 or 10000)
  const rawMaxRevenue = Math.max(...channelRevenueData.map((d: ChannelRevenueItem) => d.revenue));
  const axisStep = rawMaxRevenue > 50000 ? 10000 : 5000;
  const maxRevenue = Math.ceil(rawMaxRevenue / axisStep) * axisStep;
  const totalRevenue = channelRevenueData.reduce((sum: number, item: ChannelRevenueItem) => sum + item.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {hotel.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">{stats.todayCheckins}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DoorOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12% from yesterday
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Check-outs</p>
              <p className="text-3xl font-bold text-gray-900">{stats.todayCheckouts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DoorClosed className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +8% from yesterday
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-purple-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +15% from last week
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
              <p className="text-3xl font-bold text-gray-900">{stats.occupancyRate}%</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-orange-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5% from last month
          </div>
        </div>
      </div>

      {/* Channel Revenue Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Revenue by Channel</h2>
          </div>
          <select 
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>
        {/* Vertical Bar Chart with Y Axis */}
        <div className="w-full h-[500px] flex flex-col items-center">
          <div className="relative" style={{ width: '100%', maxWidth: 900, height: 590 }}>
            {/* Y Axis */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between h-[472px] w-20">
              {Array.from({ length: 6 }).map((_, i, arr) => {
                const tick = Math.round(((arr.length - 1 - i) / (arr.length - 1)) * maxRevenue);
                return (
                  <div key={tick} className="flex items-center" style={{ height: i === arr.length - 1 ? 0 : 'calc(472px / 5)' }}>
                    <span className="text-xs text-gray-500 w-9 text-right mr-2 relative" style={{ top: i === 0 ? '-0.5em' : i === arr.length - 1 ? '0.5em' : '0' }}>{tick.toLocaleString()}</span>
                    <div className="flex-1 border-t border-gray-200 w-8" />
                  </div>
                );
              })}
            </div>
            {/* Chart Bars */}
            <div className="absolute left-20 right-0 bottom-8 top-0 flex items-end justify-between h-[472px] z-0">
              {channelRevenueData.map((item: ChannelRevenueItem, index: number) => (
                <div key={index} className="flex flex-col items-end flex-1">
                <div 
                    className={`${item.color} w-10 md:w-12 rounded-t-lg transition-all relative group cursor-pointer flex items-end justify-center`}
                    style={{
                      height: `${(item.revenue / maxRevenue) * 405}px`,
                      minHeight: 4,
                    }}
                  >
                    <span className="absolute left-1/2 -top-8 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
                  ${item.revenue.toLocaleString()}
                    </span>
                  </div>
              </div>
            ))}
            </div>
            {/* X Axis (Channel Names) */}
            <div className="absolute left-[185px] right-0 bottom-0 h-8 flex items-center justify-between">
              {channelRevenueData.map((item: ChannelRevenueItem, index: number) => (
                <span key={index} className="text-xs text-gray-700 w-10 md:w-12 text-center truncate">{item.channel}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Channel Performance</span>
          <span>Total Revenue: ${totalRevenue.toLocaleString()}</span>
        </div>
        {/* Channel Legend */}
        <div className="mt-4 flex flex-wrap gap-4">
          {channelRevenueData.map((item: ChannelRevenueItem, index: number) => (
            <div key={index} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
              <span className="text-sm text-gray-600">{item.channel}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;