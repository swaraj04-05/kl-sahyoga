import React, { useState, useEffect } from 'react';
import { Category } from '../types';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { category: Category | 'All', urgent: boolean, sort: string }) => void;
}

const allCategories: (Category | 'All')[] = ['All', ...Object.values(Category)];

const FilterSheet: React.FC<FilterSheetProps> = ({ isOpen, onClose, onApply }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isUrgent, setIsUrgent] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleApply = () => {
    onApply({ category: selectedCategory, urgent: isUrgent, sort: sortBy });
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      ></div>
      <div 
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl p-4 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-center mb-6">Filters & Sort</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${selectedCategory === cat ? 'bg-kl-orange text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Sort By</h3>
            <div className="flex gap-2">
              <button onClick={() => setSortBy('newest')} className={`flex-1 py-2 rounded-lg text-sm font-semibold ${sortBy === 'newest' ? 'bg-kl-orange text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Newest</button>
              <button onClick={() => setSortBy('most-needed')} className={`flex-1 py-2 rounded-lg text-sm font-semibold ${sortBy === 'most-needed' ? 'bg-kl-orange text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>Most Needed</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
            <label htmlFor="urgent-filter" className="font-medium text-slate-700 dark:text-slate-300">Show only urgent posts</label>
            <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="urgent-filter" id="urgent-filter" checked={isUrgent} onChange={() => setIsUrgent(!isUrgent)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white dark:bg-slate-500 border-4 appearance-none cursor-pointer checked:right-0 checked:bg-kl-orange"/>
              <label htmlFor="urgent-filter" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer"></label>
            </div>
          </div>

          <button onClick={handleApply} className="w-full py-3.5 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-kl-orange to-kl-red shadow-lg hover:shadow-xl transition-shadow">
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSheet;
