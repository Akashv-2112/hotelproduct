import React, { useState } from 'react';
import SuperAdminLogin from './components/SuperAdminLogin';
import UserManagement from './components/UserManagement';

const isAuthenticated = () => !!localStorage.getItem('superadmin_token');

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('superadmin_token');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <SuperAdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">SuperAdmin Dashboard</h1>
        <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-2 rounded font-semibold">Logout</button>
      </header>
      <main className="p-8">
        <UserManagement />
      </main>
    </div>
  );
};

export default App;