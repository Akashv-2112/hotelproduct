import React, { useState } from 'react';
import { Save, Bell, Shield, CreditCard, Globe, User } from 'lucide-react';

interface SettingsProps {
  hotel: any;
}

const Settings: React.FC<SettingsProps> = ({ hotel }) => {
  const [settings, setSettings] = useState({
    hotelName: hotel.name,
    email: hotel.email,
    timezone: 'UTC-5',
    currency: 'USD',
    notifications: {
      bookings: true,
      cancellations: true,
      payments: true
    },
    channelSync: {
      autoSync: true,
      syncInterval: 15
    }
  });

  const handleSave = () => {
    // Simulate saving settings
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your hotel and account settings</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hotel Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Hotel Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
              <input
                type="text"
                value={settings.hotelName}
                onChange={(e) => setSettings({...settings, hotelName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="UTC-5">UTC-5 (Eastern)</option>
                <option value="UTC-6">UTC-6 (Central)</option>
                <option value="UTC-7">UTC-7 (Mountain)</option>
                <option value="UTC-8">UTC-8 (Pacific)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">New Bookings</p>
                <p className="text-xs text-gray-500">Get notified when new bookings are received</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.bookings}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, bookings: e.target.checked}
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Cancellations</p>
                <p className="text-xs text-gray-500">Get notified when bookings are cancelled</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.cancellations}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, cancellations: e.target.checked}
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Updates</p>
                <p className="text-xs text-gray-500">Get notified about payment status changes</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.payments}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, payments: e.target.checked}
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Channel Sync */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Channel Synchronization</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto Sync</p>
                <p className="text-xs text-gray-500">Automatically sync rates and availability</p>
              </div>
              <input
                type="checkbox"
                checked={settings.channelSync.autoSync}
                onChange={(e) => setSettings({
                  ...settings,
                  channelSync: {...settings.channelSync, autoSync: e.target.checked}
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sync Interval (minutes)</label>
              <select
                value={settings.channelSync.syncInterval}
                onChange={(e) => setSettings({
                  ...settings,
                  channelSync: {...settings.channelSync, syncInterval: parseInt(e.target.value)}
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">Change Password</div>
              <div className="text-xs text-gray-500 mt-1">Update your account password</div>
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-xs text-gray-500 mt-1">Enable additional security for your account</div>
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors">
              <div className="text-sm font-medium text-gray-900">API Keys</div>
              <div className="text-xs text-gray-500 mt-1">Manage your API keys for integrations</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;