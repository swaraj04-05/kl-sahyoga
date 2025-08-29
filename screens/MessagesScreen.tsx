
import React from 'react';
import { mockMessages } from '../data/mockData';
import EmptyState from '../components/EmptyState';

const MessagesScreen: React.FC = () => {

  const EmptyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Messages</h2>
      </div>
      {mockMessages.length > 0 ? (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800 flex-grow">
          {mockMessages.map((thread) => (
            <li key={thread.id} className="p-4 flex items-start space-x-4 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-colors">
              <img src={thread.user.avatarUrl} alt={thread.user.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800 dark:text-white">{thread.user.name}</h3>
                  <p className="text-xs text-slate-400">{thread.timestamp}</p>
                </div>
                <div className="flex justify-between items-start mt-1">
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate w-52">{thread.lastMessage}</p>
                  {thread.unreadCount > 0 && (
                    <span className="w-6 h-6 flex items-center justify-center text-xs font-bold text-white bg-kl-red rounded-full">{thread.unreadCount}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState 
          icon={<EmptyIcon />}
          title="No Messages Yet"
          message="When you contact someone about a post, your conversation will appear here."
        />
      )}
    </div>
  );
};

export default MessagesScreen;
