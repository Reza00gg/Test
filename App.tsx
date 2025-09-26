
import React, { useState } from 'react';
import type { TabID } from './types';
import BottomNavBar from './components/BottomNavBar';
import HomeView from './components/views/HomeView';
import SearchView from './components/views/SearchView';
import ProfileView from './components/views/ProfileView';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabID>('home');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleTabChange = (tabId: TabID) => {
    if (tabId === currentTab || isAnimatingOut) return;

    setIsAnimatingOut(true);
    setTimeout(() => {
      setCurrentTab(tabId);
      setIsAnimatingOut(false);
    }, 200); // Duration should be slightly less than the CSS transition duration to allow content swap
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView />;
      case 'search':
        return <SearchView />;
      case 'profile':
        return <ProfileView />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans text-slate-800 dark:text-white overflow-x-hidden">
        <main
          className={`pb-28 transition-opacity duration-300 ease-in-out ${
            isAnimatingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {renderContent()}
        </main>
        <BottomNavBar activeTab={currentTab} onTabChange={handleTabChange} />
      </div>
    </ThemeProvider>
  );
};

export default App;