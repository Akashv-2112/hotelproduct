import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Code, 
  Download, 
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Copy,
  Eye
} from 'lucide-react';

const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('connectors');

  const connectors = [
    {
      name: 'Opera PMS',
      type: 'PMS',
      status: 'connected',
      properties: 8,
      lastSync: '2 min ago',
      version: '2.4.1',
      description: 'Full two-way sync with Opera Property Management System'
    },
    {
      name: 'Fidelio Suite8',
      type: 'PMS',
      status: 'connected',
      properties: 3,
      lastSync: '5 min ago',
      version: '1.8.3',
      description: 'Real-time inventory and reservation synchronization'
    },
    {
      name: 'RMS Cloud',
      type: 'PMS',
      status: 'pending',
      properties: 0,
      lastSync: 'Never',
      version: '3.1.0',
      description: 'Cloud-based property management integration'
    },
    {
      name: 'Sabre GDS',
      type: 'GDS',
      status: 'connected',
      properties: 12,
      lastSync: '1 min ago',
      version: '4.2.7',
      description: 'Global distribution system connectivity'
    },
    {
      name: 'Amadeus GDS',
      type: 'GDS',
      status: 'error',
      properties: 5,
      lastSync: '2 hours ago',
      version: '2.9.4',
      description: 'Travel booking and distribution platform'
    },
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/properties',
      description: 'Retrieve all properties',
      usage: '2,847 calls/day'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/reservations',
      description: 'Create new reservation',
      usage: '1,234 calls/day'
    },
    {
      method: 'PUT',
      endpoint: '/api/v1/rates',
      description: 'Update room rates',
      usage: '890 calls/day'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/availability',
      description: 'Check room availability',
      usage: '5,678 calls/day'
    },
    {
      method: 'DELETE',
      endpoint: '/api/v1/reservations/{id}',
      description: 'Cancel reservation',
      usage: '456 calls/day'
    },
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Daily Revenue Report',
      frequency: 'Daily at 6:00 AM',
      recipients: ['revenue@company.com', 'management@company.com'],
      format: 'Excel',
      status: 'active',
      lastSent: '6:00 AM today'
    },
    {
      id: 2,
      name: 'Weekly Occupancy Summary',
      frequency: 'Weekly on Mondays',
      recipients: ['operations@company.com'],
      format: 'PDF',
      status: 'active',
      lastSent: 'Monday 9:00 AM'
    },
    {
      id: 3,
      name: 'Monthly P&L Statement',
      frequency: 'Monthly on 1st',
      recipients: ['finance@company.com', 'ceo@company.com'],
      format: 'Excel',
      status: 'active',
      lastSent: 'Jan 1, 2024'
    },
    {
      id: 4,
      name: 'Rate Parity Alert',
      frequency: 'Real-time',
      recipients: ['revenue@company.com'],
      format: 'Email',
      status: 'paused',
      lastSent: '2 hours ago'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'error':
      case 'paused':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
      case 'paused':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800';
      case 'POST':
        return 'bg-blue-100 text-blue-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderConnectorsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">PMS & CRS Connectors</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Connector
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {connectors.map((connector, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(connector.status)}
                <div>
                  <h3 className="font-semibold text-gray-800">{connector.name}</h3>
                  <p className="text-sm text-gray-600">{connector.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(connector.status)}`}>
                  {connector.status}
                </span>
                <button className="text-gray-600 hover:text-gray-800">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{connector.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Properties</p>
                <p className="font-medium">{connector.properties}</p>
              </div>
              <div>
                <p className="text-gray-500">Version</p>
                <p className="font-medium">{connector.version}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Last Sync</p>
                <p className="font-medium">{connector.lastSync}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAPITab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Open API</h2>
        <div className="flex space-x-2">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Documentation
            <ExternalLink className="w-3 h-3 ml-1" />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Generate Key
          </button>
        </div>
      </div>

      {/* API Key Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">API Keys</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">Production Key</h4>
              <p className="text-sm text-gray-600 font-mono">pk_live_••••••••••••••••••••••••••••••••••••••••</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Eye className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">Test Key</h4>
              <p className="text-sm text-gray-600 font-mono">pk_test_••••••••••••••••••••••••••••••••••••••••</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Eye className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Popular Endpoints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endpoint</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apiEndpoints.map((endpoint, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-900">{endpoint.endpoint}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{endpoint.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{endpoint.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Scheduled Reports</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scheduledReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{report.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.frequency}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {report.recipients.length} recipient{report.recipients.length > 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.format}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.lastSent}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Settings className="w-4 h-4" />
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

  const tabs = [
    { id: 'connectors', label: 'Connectors', icon: Zap },
    { id: 'api', label: 'Open API', icon: Code },
    { id: 'reports', label: 'Reports', icon: Download },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Integrations & Exports</h1>
        <p className="text-gray-600">Manage connectors, API access, and automated reports</p>
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
        {activeTab === 'connectors' && renderConnectorsTab()}
        {activeTab === 'api' && renderAPITab()}
        {activeTab === 'reports' && renderReportsTab()}
      </div>
    </div>
  );
};

export default Integrations;