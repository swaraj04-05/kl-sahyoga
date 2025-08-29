
import React from 'react';

const PostCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md overflow-hidden flex flex-col m-4 animate-pulse">
      <div className="w-full h-48 bg-slate-200 dark:bg-slate-800"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded mb-1"></div>
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>

        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4 gap-4">
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>

                <div className="flex items-center gap-2">
                     <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                     <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
