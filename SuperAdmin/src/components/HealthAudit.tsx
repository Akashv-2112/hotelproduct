import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  Database,
  Wifi,
  Server,
  Eye,
  Download,
  Search
} from 'lucide-react';

const HealthAudit: React.FC = () => {
  const [activeTab, setActiveTab] = useState('health');
  const [searchTerm, setSearchTerm] = useState('');

  const systemHealth = [
    {
      component: 'API Gateway',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '45ms',
      lastCheck: '1 min ago',
      issues: 0
    },
    {
      component: 'Database Cluster',
      status: 'healthy',
      uptime: '99.8%',
      responseTime: '12ms',
      lastCheck: '30 sec ago',
      issues: 0
    },
    {
      component: 'PMS Sync Service',
      status: 'warning',
      uptime: '98.2%',
      responseTime: '156ms',
      lastCheck: '2 min ago',
      issues: 2
    },
    {
      component: 'OTA Connections',
      status: 'healthy',
      uptime: '99.7%',
      responseTime: '89ms',
      lastCheck: '45 sec ago',
      issues: 0
    },
    {
      component: 'Payment Gateway',
      status: 'healthy',
      uptime: '99.95%',
      responseTime: '67ms',
      lastCheck: '1 min ago',
      issues: 0
    },
    {
      component: 'Email Service',
      status: 'error',
      uptime: '95.4%',
      responseTime: 'N/A',
      lastCheck: '5 min ago',
      issues: 3
    },
  ];

  const alerts = [
    {
      id: 1,
      type: 'error',
      title: 'Email Service Down',
      message: 'SMTP server connection failed',
      timestamp: '5 minutes ago',
      component: 'Email Service',
      severity: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Response Time',
      message: 'PMS sync taking longer than usual',
      timestamp: '12 minutes ago',
      component: 'PMS Sync Service',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Database backup completed successfully',
      timestamp: '1 hour ago',
      component: 'Database Cluster',
      severity: 'low'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Rate Limit Approaching',
      message: 'Booking.com API calls at 80% of limit',
      timestamp: '2 hours ago',
      component: 'OTA Connections',
      severity: 'medium'
    },
  ];

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-17 14:32:15',
      user: 'admin@system.com',
      action: 'Created new property',
      details: 'Added "Luxury Beach Resort" to the system',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2024-01-17 14:28:42',
      user: 'sarah@grandplaza.com',
      action: 'Updated room rates',
      details: 'Modified rates for Standard Room (Jan 20-25)',
      ip: '10.0.1.45'
    },
    {
      id: 3,
      timestamp: '2024-01-17 14:15:33',
      user: 'mike@seasideresort.com',
      action: 'Cancelled reservation',
      details: 'Cancelled RES-2024-003 for guest John Smith',
      ip: '10.0.1.67'
    },
    {
      id: 4,
      timestamp: '2024-01-17 14:12:18',
      user: 'system',
      action: 'Automated sync',
      details: 'Synchronized inventory with Booking.com',
      ip: 'internal'
    },
    {
      id: 5,
      timestamp: '2024-01-17 14:08:29',
      user: 'lisa@mountainlodge.com',
      action: 'Role assignment',
      details: 'Assigned Front Desk Manager role to new user',
      ip: '10.0.2.23'
    },
  ];

  const syncStatus = [
    {
      integration: 'Booking.com',
      lastSync: '2 minutes ago',
      status: 'success',
      records: 1247,
      errors: 0
    },
    {
      integration: 'Expedia',
      lastSync: '5 minutes ago',
      status: 'success',
      records: 892,
      errors: 0
    },
    {
      integration: 'Hotels.com',
      lastSync: '3 minutes ago',
      status: 'success',
      records: 634,
      errors: 0
    },
    {
      integration: 'Agoda',
      lastSync: '15 minutes ago',
      status: 'warning',
      records: 423,
      errors: 2
    },
    {
      integration: 'Opera PMS',
      lastSync: '1 minute ago',
      status: 'success',
      records: 2143,
      errors: 0
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderHealthTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">System Health</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemHealth.map((component, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(component.status)}
                <h3 className="font-medium text-gray-800">{component.component}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                {component.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Uptime:</span>
                <span className="font-medium">{component.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Response Time:</span>
                <span className="font-medium">{component.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Check:</span>
                <span className="font-medium">{component.lastCheck}</span>
              </div>
              {component.issues > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Issues:</span>
                  <span className="font-medium text-red-600">{component.issues}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Alert Center</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            Mark All Read
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
            Configure Alerts
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const alertColors = {
            error: 'border-red-200 bg-red-50',
            warning: 'border-yellow-200 bg-yellow-50',
            info: 'border-blue-200 bg-blue-50',
          };

          const severityColors = {
            high: 'bg-red-100 text-red-800',
            medium: 'bg-yellow-100 text-yellow-800',
            low: 'bg-blue-100 text-blue-800',
          };

          return (
            <div key={alert.id} className={`border rounded-lg p-4 ${alertColors[alert.type as keyof typeof alertColors]}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(alert.type)}
                  <div>
                    <h3 className="font-medium text-gray-800">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{alert.component}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[alert.severity as keyof typeof severityColors]}`}>
                    {alert.severity}
                  </span>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAuditTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Audit Logs</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{log.timestamp}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSyncTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Sync Status</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {syncStatus.map((sync, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  {sync.integration.includes('PMS') ? (
                    <Database className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Wifi className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <h3 className="font-medium text-gray-800">{sync.integration}</h3>
              </div>
              {getStatusIcon(sync.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Last Sync:</span>
                <span className="font-medium">{sync.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Records:</span>
                <span className="font-medium">{sync.records.toLocaleString()}</span>
              </div>
              {sync.errors > 0 ? (
                <div className="flex justify-between">
                  <span className="text-gray-500">Errors:</span>
                  <span className="font-medium text-red-600">{sync.errors}</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium text-green-600">Clean</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'health', label: 'System Health', icon: Activity },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'audit', label: 'Audit Logs', icon: Clock },
    { id: 'sync', label: 'Sync Status', icon: RefreshCw },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Health & Audit</h1>
        <p className="text-gray-600">Monitor system health, alerts, and audit trails</p>
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
        {activeTab === 'health' && renderHealthTab()}
        {activeTab === 'alerts' && renderAlertsTab()}
        {activeTab === 'audit' && renderAuditTab()}
        {activeTab === 'sync' && renderSyncTab()}
      </div>
    </div>
  );
};

export default HealthAudit;