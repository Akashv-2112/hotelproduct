import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  AlertTriangle,
  BarChart3,
  TrendingDown,
  Eye
} from 'lucide-react';

const Revenue: React.FC = () => {
  const revenueStats = [
    { label: 'Revenue (MTD)', value: '$2.4M', change: '+22%', trend: 'up' },
    { label: 'RevPAR', value: '$189.50', change: '+15%', trend: 'up' },
    { label: 'ADR', value: '$245.75', change: '+8%', trend: 'up' },
    { label: 'Occupancy', value: '77.2%', change: '+5%', trend: 'up' },
  ];

  const rateParity = [
    { property: 'Grand Plaza Hotel', ota: 'Booking.com', ourRate: 299, otaRate: 289, variance: -10, status: 'alert' },
    { property: 'Grand Plaza Hotel', ota: 'Expedia', ourRate: 299, otaRate: 299, variance: 0, status: 'ok' },
    { property: 'Seaside Resort', ota: 'Hotels.com', ourRate: 279, otaRate: 295, variance: +16, status: 'alert' },
    { property: 'Mountain Lodge', ota: 'Booking.com', ourRate: 199, otaRate: 199, variance: 0, status: 'ok' },
    { property: 'Seaside Resort', ota: 'Agoda', ourRate: 279, otaRate: 275, variance: -4, status: 'warning' },
  ];

  const promoEngine = [
    { 
      id: 1, 
      name: 'Early Bird Special', 
      discount: '15%', 
      properties: 3, 
      bookings: 124, 
      revenue: 45600, 
      status: 'active',
      endDate: '2024-02-15'
    },
    { 
      id: 2, 
      name: 'Weekend Getaway', 
      discount: '20%', 
      properties: 2, 
      bookings: 89, 
      revenue: 32400, 
      status: 'active',
      endDate: '2024-01-31'
    },
    { 
      id: 3, 
      name: 'Last Minute Deal', 
      discount: '25%', 
      properties: 4, 
      bookings: 67, 
      revenue: 28900, 
      status: 'paused',
      endDate: '2024-03-01'
    },
  ];

  const forecast = [
    { month: 'Jan 2024', revenue: 2400000, occupancy: 77, revPAR: 189 },
    { month: 'Feb 2024', revenue: 2650000, occupancy: 82, revPAR: 205 },
    { month: 'Mar 2024', revenue: 2800000, occupancy: 85, revPAR: 218 },
    { month: 'Apr 2024', revenue: 3100000, occupancy: 88, revPAR: 235 },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Revenue Management</h1>
        <p className="text-gray-600">Monitor performance, track rate parity, and manage promotions</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-blue-500">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rate Parity Monitor */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Rate Parity Monitor</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {rateParity.map((rate, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    rate.status === 'ok' ? 'bg-green-500' :
                    rate.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{rate.property}</div>
                    <div className="text-xs text-gray-500">{rate.ota}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">${rate.ourRate} vs ${rate.otaRate}</div>
                  <div className={`text-xs ${
                    rate.variance === 0 ? 'text-green-600' :
                    Math.abs(rate.variance) < 10 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {rate.variance > 0 ? '+' : ''}{rate.variance !== 0 ? `$${rate.variance}` : 'Match'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Engine */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Active Promotions</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
              Create Promo
            </button>
          </div>
          <div className="space-y-4">
            {promoEngine.map((promo) => (
              <div key={promo.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      promo.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <h3 className="font-medium text-gray-800">{promo.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {promo.discount}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Ends {promo.endDate}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Bookings</p>
                    <p className="font-medium">{promo.bookings}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-medium">${promo.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Properties</p>
                    <p className="font-medium">{promo.properties}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast Dashboard */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Revenue Forecast</h2>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Properties</option>
              <option>Grand Plaza Hotel</option>
              <option>Seaside Resort</option>
              <option>Mountain Lodge</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Period</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Occupancy</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">RevPAR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((period, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{period.month}</td>
                  <td className="py-3 px-4 font-medium">${(period.revenue / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4">{period.occupancy}%</td>
                  <td className="py-3 px-4">${period.revPAR}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 text-sm font-medium">+{index * 5 + 10}%</span>
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

export default Revenue;