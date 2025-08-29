
import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-kl-orange mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-xs">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-6 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-kl-orange to-kl-red shadow-md hover:shadow-lg transition-shadow"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
