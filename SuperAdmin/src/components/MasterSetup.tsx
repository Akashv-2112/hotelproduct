import React, { useState } from 'react';
import { 
  Plus, 
  Building, 
  MapPin, 
  Users, 
  Settings, 
  Globe,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const MasterSetup: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties');

  const properties = [
    { id: 1, name: 'Grand Plaza Hotel', location: 'New York, NY', rooms: 245, status: 'active', manager: 'Sarah Johnson' },
    { id: 2, name: 'Seaside Resort', location: 'Miami, FL', rooms: 180, status: 'active', manager: 'Mike Chen' },
    { id: 3, name: 'Mountain Lodge', location: 'Denver, CO', rooms: 95, status: 'pending', manager: 'Lisa Anderson' },
    { id: 4, name: 'City Center Inn', location: 'Chicago, IL', rooms: 120, status: 'active', manager: 'David Wilson' },
  ];

  const roomTypes = [
    { id: 1, property: 'Grand Plaza Hotel', type: 'Standard Room', capacity: 2, count: 150, baseRate: 199 },
    { id: 2, property: 'Grand Plaza Hotel', type: 'Deluxe Suite', capacity: 4, count: 75, baseRate: 349 },
    { id: 3, property: 'Seaside Resort', type: 'Ocean View', capacity: 2, count: 120, baseRate: 279 },
    { id: 4, property: 'Seaside Resort', type: 'Beachfront Villa', capacity: 6, count: 60, baseRate: 599 },
  ];

  const otaConnections = [
    { name: 'Booking.com', status: 'connected', properties: 4, lastSync: '2 min ago' },
    { name: 'Expedia', status: 'connected', properties: 3, lastSync: '5 min ago' },
    { name: 'Airbnb', status: 'pending', properties: 2, lastSync: '1 hour ago' },
    { name: 'Hotels.com', status: 'connected', properties: 4, lastSync: '3 min ago' },
    { name: 'Agoda', status: 'error', properties: 1, lastSync: '2 hours ago' },
  ];

  const renderPropertiesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Properties</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Building className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{property.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{property.rooms}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{property.manager}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      property.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
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

  const renderRoomTypesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Room Types & Rate Plans</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Room Type
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roomTypes.map((room) => (
          <div key={room.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{room.type}</h3>
                <p className="text-sm text-gray-600">{room.property}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Capacity</p>
                <p className="font-medium">{room.capacity} guests</p>
              </div>
              <div>
                <p className="text-gray-500">Count</p>
                <p className="font-medium">{room.count} rooms</p>
              </div>
              <div>
                <p className="text-gray-500">Base Rate</p>
                <p className="font-medium">${room.baseRate}/night</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOTATab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">OTA & GDS Connections</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Connection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otaConnections.map((ota, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Globe className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">{ota.name}</h3>
              </div>
              <span className={`w-3 h-3 rounded-full ${
                ota.status === 'connected' ? 'bg-green-500' :
                ota.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className={`font-medium ${
                  ota.status === 'connected' ? 'text-green-600' :
                  ota.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {ota.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Properties:</span>
                <span className="font-medium">{ota.properties}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Sync:</span>
                <span className="font-medium">{ota.lastSync}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'properties', label: 'Properties', icon: Building },
    { id: 'room-types', label: 'Room Types', icon: Settings },
    { id: 'ota-gds', label: 'OTA & GDS', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Master Setup</h1>
        <p className="text-gray-600">Onboard properties, configure room types, and manage integrations</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'properties' && renderPropertiesTab()}
        {activeTab === 'room-types' && renderRoomTypesTab()}
        {activeTab === 'ota-gds' && renderOTATab()}
      </div>
    </div>
  );
};

export default MasterSetup;