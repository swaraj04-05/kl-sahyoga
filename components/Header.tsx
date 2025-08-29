import React from 'react';
import { mockUsers } from '../data/mockData';

const Header: React.FC = () => {
    const currentUser = mockUsers['user1'];

    return (
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-sm px-4 pb-3 pt-[calc(1rem+env(safe-area-inset-top))]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover border-2 border-kl-orange" />
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Welcome back,</p>
                        <h1 className="font-bold text-slate-800 dark:text-white">{currentUser.name}</h1>
                    </div>
                </div>
                <div className="font-bold text-lg">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-kl-orange to-kl-red">KL Sahyoga</span>
                </div>
            </div>
        </header>
    );
};

export default Header;