import React from 'react';
import { Tab } from '../types';
import useHapticFeedback from '../hooks/useHapticFeedback';

interface TabItem {
    id: Tab;
    label: string;
    icon: React.ElementType;
    isCentral?: boolean;
}

interface BottomNavProps {
    tabs: TabItem[];
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ tabs, activeTab, setActiveTab }) => {
    const triggerHapticFeedback = useHapticFeedback();

    const handleTabClick = (tabId: Tab) => {
        triggerHapticFeedback('light');
        setActiveTab(tabId);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-around items-center h-16 pb-[env(safe-area-inset-bottom)]">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    
                    if (tab.isCentral) {
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className="-mt-8 h-16 aspect-square rounded-full bg-gradient-to-br from-kl-orange to-kl-red text-white shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform"
                                aria-label={tab.label}
                            >
                                <Icon className="w-8 h-8" />
                            </button>
                        );
                    }

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors duration-200 ${isActive ? 'text-kl-orange' : 'text-slate-500 dark:text-slate-400 hover:text-kl-orange dark:hover:text-kl-orange'}`}
                            aria-label={tab.label}
                        >
                            <Icon className="w-6 h-6" />
                            <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;