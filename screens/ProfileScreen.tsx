
import React from 'react';
import { mockUsers } from '../data/mockData';
import { Theme } from '../types';

interface ProfileScreenProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ theme, toggleTheme }) => {
  const currentUser = mockUsers['user1'];

  const VerifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-kl-blue ml-1"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
  );
  
  const StatCard: React.FC<{ value: string | number; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
    <div className="flex-1 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-4">
      <div className="p-2 bg-white dark:bg-slate-700 rounded-full text-kl-orange">
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );

  const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  const GiftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
  const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>


  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-24 h-24 rounded-full object-cover border-4 border-kl-orange" />
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">{currentUser.name}</h2>
          {currentUser.isVerified && <VerifiedIcon />}
        </div>
        <p className="text-slate-500 dark:text-slate-400">Student @kluniversity.in</p>
      </div>
      
      <div className="flex gap-4">
        <StatCard value={12} label="Donations" icon={<GiftIcon />} />
        <StatCard value={5} label="Requests" icon={<HeartIcon />} />
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-slate-500 dark:text-slate-400 px-2">Settings</h3>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl">
          <div className="flex justify-between items-center p-4">
            <span className="font-medium">Dark Mode</span>
            <button onClick={toggleTheme} className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${theme === Theme.DARK ? 'bg-kl-orange justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'}`}>
              <span className="w-4 h-4 rounded-full bg-white transition-transform"></span>
            </button>
          </div>
          <hr className="border-slate-200 dark:border-slate-700"/>
          <button className="flex justify-between items-center p-4 w-full text-left">
            <span className="font-medium">Edit Profile</span>
            <ArrowRightIcon/>
          </button>
           <hr className="border-slate-200 dark:border-slate-700"/>
          <button className="flex justify-between items-center p-4 w-full text-left">
            <span className="font-medium">Notifications</span>
            <ArrowRightIcon/>
          </button>
        </div>
      </div>
      
      <div>
        <button className="w-full py-3 rounded-xl font-bold text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/80 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
