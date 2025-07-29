import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  UserPlus, 
  Eye, 
  Edit, 
  Key,
  Lock,
  Unlock,
  Settings,
  Search,
  Filter
} from 'lucide-react';

const AccessControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@grandplaza.com',
      role: 'Property Manager',
      property: 'Grand Plaza Hotel',
      status: 'active',
      lastLogin: '2 hours ago',
      twoFA: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@seasideresort.com',
      role: 'Front Desk Manager',
      property: 'Seaside Resort',
      status: 'active',
      lastLogin: '1 day ago',
      twoFA: false
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      email: 'lisa@mountainlodge.com',
      role: 'Revenue Manager',
      property: 'Mountain Lodge',
      status: 'inactive',
      lastLogin: '1 week ago',
      twoFA: true
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@citycenter.com',
      role: 'General Manager',
      property: 'City Center Inn',
      status: 'active',
      lastLogin: '30 min ago',
      twoFA: true
    },
  ];

  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access',
      users: 2,
      permissions: ['All Permissions'],
      color: 'red'
    },
    {
      id: 2,
      name: 'Property Manager',
      description: 'Manage single property',
      users: 12,
      permissions: ['Property Management', 'Reservations', 'Reports'],
      color: 'blue'
    },
    {
      id: 3,
      name: 'Revenue Manager',
      description: 'Revenue and pricing control',
      users: 8,
      permissions: ['Pricing', 'Revenue Reports', 'Rate Management'],
      color: 'green'
    },
    {
      id: 4,
      name: 'Front Desk Manager',
      description: 'Guest services and reservations',
      users: 24,
      permissions: ['Reservations', 'Guest Services', 'Basic Reports'],
      color: 'purple'
    },
    {
      id: 5,
      name: 'Read Only',
      description: 'View access only',
      users: 15,
      permissions: ['View Reports', 'View Reservations'],
      color: 'gray'
    },
  ];

  const demoAccounts = [
    {
      id: 1,
      name: 'Demo Hotel Chain',
      properties: 3,
      created: '2024-01-10',
      expires: '2024-02-10',
      status: 'active',
      usage: '145 actions'
    },
    {
      id: 2,
      name: 'Sample Resort Group',
      properties: 2,
      created: '2024-01-15',
      expires: '2024-02-15',
      status: 'active',
      usage: '89 actions'
    },
    {
      id: 3,
      name: 'Test Property Management',
      properties: 1,
      created: '2024-01-05',
      expires: '2024-01-20',
      status: 'expired',
      usage: '67 actions'
    },
  ];

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">2FA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.property}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    {user.twoFA ? (
                      <Lock className="w-4 h-4 text-green-500" />
                    ) : (
                      <Unlock className="w-4 h-4 text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-800" title="Impersonate">
                        <Key className="w-4 h-4" />
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

  const renderRolesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Role Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const colorClasses = {
            red: 'bg-red-100 text-red-800 border-red-200',
            blue: 'bg-blue-100 text-blue-800 border-blue-200',
            green: 'bg-green-100 text-green-800 border-green-200',
            purple: 'bg-purple-100 text-purple-800 border-purple-200',
            gray: 'bg-gray-100 text-gray-800 border-gray-200',
          };

          return (
            <div key={role.id} className={`rounded-lg p-6 border-2 ${colorClasses[role.color as keyof typeof colorClasses]} hover:shadow-md transition-shadow duration-200`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{role.name}</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {role.users} users assigned
                </p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((permission, index) => (
                    <span key={index} className="px-2 py-1 bg-white bg-opacity-50 text-xs rounded-full">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDemoTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Demo Accounts</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center">
          <UserPlus className="w-4 h-4 mr-2" />
          Create Demo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Properties</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {demoAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{account.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{account.properties}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{account.created}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{account.expires}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{account.usage}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      account.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Access">
                        <Key className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800" title="Extend">
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
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles', icon: Shield },
    { id: 'demo', label: 'Demo Accounts', icon: Key },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Control</h1>
        <p className="text-gray-600">Manage users, roles, and demo accounts</p>
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
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'roles' && renderRolesTab()}
        {activeTab === 'demo' && renderDemoTab()}
      </div>
    </div>
  );
};

export default AccessControl;