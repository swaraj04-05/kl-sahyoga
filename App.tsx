import React, { useState, useEffect, useCallback } from 'react';
import { Tab, Theme } from './types';
import { TABS } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import RequestsScreen from './screens/RequestsScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <HomeScreen />;
      case Tab.REQUESTS:
        return <RequestsScreen />;
      case Tab.DONATE:
        return <CreatePostScreen type="donation" onPostCreated={() => setActiveTab(Tab.HOME)} />;
      case Tab.MESSAGES:
        return <MessagesScreen />;
      case Tab.PROFILE:
        return <ProfileScreen theme={theme} toggleTheme={toggleTheme} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950">
      <Header />
      <main className="flex-grow overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))]">
        {renderScreen()}
      </main>
      <BottomNav tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;