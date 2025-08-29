import React from 'react';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);

interface SearchBarProps {
    onFilterClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterClick }) => {
    return (
        <div className="relative flex items-center gap-2">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Search for items or requests..."
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-kl-orange focus:ring-0 transition-colors"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SearchIcon />
                </div>
            </div>
            <button 
                onClick={onFilterClick}
                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Open filters"
            >
                <FilterIcon />
            </button>
        </div>
    );
};

export default SearchBar;