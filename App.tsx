
import React, { useState, useEffect } from 'react';
import { Page, User } from './types';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Scan from './pages/Scan';
import Tips from './pages/Tips';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [user, setUser] = useState<User | null>(null);

  // Check for existing user session
  useEffect(() => {
    const savedUser = localStorage.getItem('yugal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage(Page.DASHBOARD);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('yugal_user', JSON.stringify(userData));
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('yugal_user');
    setCurrentPage(Page.LANDING);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.LANDING:
        return <Landing onLogin={handleLogin} />;
      case Page.DASHBOARD:
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
      case Page.SCAN:
        return <Scan user={user} onAnalysisComplete={(res) => {
          if (user) {
            const updatedUser = { ...user, lastAnalysis: res };
            setUser(updatedUser);
            localStorage.setItem('yugal_user', JSON.stringify(updatedUser));
          }
          setCurrentPage(Page.DASHBOARD);
        }} />;
      case Page.TIPS:
        return <Tips />;
      case Page.PROFILE:
        return <Profile user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 relative max-w-md mx-auto shadow-2xl bg-[#0a0a0a]">
      {renderPage()}
      {currentPage !== Page.LANDING && (
        <BottomNav activePage={currentPage} onNavigate={setCurrentPage} />
      )}
    </div>
  );
};

export default App;
