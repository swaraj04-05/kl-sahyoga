
import React, { useState } from 'react';
import { Category } from '../types';

const categories: Category[] = [
  Category.BOOKS,
  Category.GADGETS,
  Category.CLOTHES,
  Category.FURNITURE,
  Category.FOOD,
  Category.OTHER
];

const CategoryChips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.BOOKS);

  return (
    <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md pt-3 pb-3">
        <div className="flex space-x-3 overflow-x-auto pb-2 -mb-2 px-4 scrollbar-hide">
        {categories.map((category) => (
            <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === category
                ? 'bg-gradient-to-r from-kl-orange to-kl-red text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            >
            {category}
            </button>
        ))}
        </div>
    </div>
  );
};

export default CategoryChips;
