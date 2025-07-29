import React from 'react';
import { 
  Users, 
  Building, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    { label: 'Total Properties', value: '1,247', change: '+12%', trend: 'up', icon: Building, color: 'blue' },
    { label: 'Active Users', value: '8,432', change: '+8%', trend: 'up', icon: Users, color: 'green' },
    { label: 'Monthly Bookings', value: '24,891', change: '+15%', trend: 'up', icon: Calendar, color: 'purple' },
    { label: 'Revenue (MTD)', value: '$2.4M', change: '+22%', trend: 'up', icon: DollarSign, color: 'emerald' },
  ];

  const recentActivities = [
    { type: 'property', message: 'New property "Grand Plaza Hotel" onboarded', time: '2 minutes ago', status: 'success' },
    { type: 'user', message: 'User role updated for john@hotelchain.com', time: '15 minutes ago', status: 'info' },
    { type: 'integration', message: 'Booking.com sync completed successfully', time: '32 minutes ago', status: 'success' },
    { type: 'alert', message: 'Rate parity issue detected for Seaside Resort', time: '1 hour ago', status: 'warning' },
    { type: 'system', message: 'Scheduled backup completed', time: '2 hours ago', status: 'success' },
  ];

  const systemHealth = [
    { name: 'API Gateway', status: 'healthy', uptime: '99.9%' },
    { name: 'Database', status: 'healthy', uptime: '99.8%' },
    { name: 'PMS Sync', status: 'warning', uptime: '98.2%' },
    { name: 'OTA Connections', status: 'healthy', uptime: '99.7%' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your platform's performance and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            purple: 'bg-purple-500',
            emerald: 'bg-emerald-500',
          };

          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6 text-white" />
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
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const statusIcons = {
                success: <CheckCircle className="w-4 h-4 text-green-500" />,
                warning: <AlertCircle className="w-4 h-4 text-amber-500" />,
                info: <Clock className="w-4 h-4 text-blue-500" />,
              };

              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                  {statusIcons[activity.status as keyof typeof statusIcons]}
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">System Health</h2>
          <div className="space-y-4">
            {systemHealth.map((system, index) => {
              const statusColors = {
                healthy: 'bg-green-100 text-green-800',
                warning: 'bg-amber-100 text-amber-800',
                error: 'bg-red-100 text-red-800',
              };

              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      system.status === 'healthy' ? 'bg-green-500' : 
                      system.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-800">{system.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{system.uptime}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[system.status as keyof typeof statusColors]
                    }`}>
                      {system.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            'Create Demo Account',
            'Onboard Property',
            'Reset User Password',
            'Generate Report',
            'Monitor Rates',
            'Check Integrations'
          ].map((action, index) => (
            <button key={index} className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">{action}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;