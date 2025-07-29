import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ChannelManager from './components/ChannelManager';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [hotel, setHotel] = useState(null);

  const handleLogin = (hotelData: any) => {
    setHotel(hotelData);
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHotel(null);
    setCurrentView('dashboard');
    setShowLanding(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard hotel={hotel} />;
      case 'channel-manager':
        return <ChannelManager hotel={hotel} />;
      case 'settings':
        return <Settings hotel={hotel} />;
      default:
        return <Dashboard hotel={hotel} />;
    }
  };

  if (showLanding && !isAuthenticated) {
    return <LandingPage onLoginClick={() => setShowLanding(false)} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        hotel={hotel}
        onLogout={handleLogout}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;