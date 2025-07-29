import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Activity, 
  Zap,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'master-setup', label: 'Master Setup', icon: Settings },
    { id: 'inventory-pricing', label: 'Inventory & Pricing', icon: Calendar },
    { id: 'reservations', label: 'Reservations', icon: BookOpen },
    { id: 'revenue', label: 'Revenue', icon: TrendingUp },
    { id: 'access-control', label: 'Access Control', icon: Shield },
    { id: 'health-audit', label: 'Health & Audit', icon: Activity },
    { id: 'integrations', label: 'Integrations', icon: Zap },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Super Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Property Management</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-6 py-3 text-left transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center">
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                isActive ? 'text-blue-600' : 'text-gray-300 group-hover:text-gray-400'
              }`} />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;