
import React from 'react';
import { Category } from '../types';

interface CreatePostScreenProps {
  type: 'donation' | 'request';
  onPostCreated: () => void;
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ type, onPostCreated }) => {

  const titleText = type === 'donation' ? 'Create a Donation' : 'Make a Request';
  const buttonText = type === 'donation' ? 'Post Donation' : 'Post Request';

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{titleText}</h2>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
        <input type="text" id="title" placeholder={type === 'donation' ? 'e.g., Engineering Textbooks' : 'e.g., Need a study lamp'} className="w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-kl-orange focus:ring-0 transition-colors"/>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
        <textarea id="description" rows={4} placeholder="Provide some details..." className="w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-kl-orange focus:ring-0 transition-colors"></textarea>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
        <select id="category" className="w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-kl-orange focus:ring-0 transition-colors appearance-none">
          {Object.values(Category).map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
        <label htmlFor="urgent" className="font-medium text-slate-700 dark:text-slate-300">Mark as urgent</label>
        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input type="checkbox" name="urgent" id="urgent" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white dark:bg-slate-500 border-4 appearance-none cursor-pointer checked:right-0 checked:bg-kl-orange"/>
          <label htmlFor="urgent" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer"></label>
        </div>
        <style>{`.toggle-checkbox:checked { right: 0; border-color: #FF6B2E; } .toggle-checkbox:checked + .toggle-label { background-color: #FFD3C0; }`}</style>
      </div>

      <button onClick={onPostCreated} className="w-full py-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-kl-orange to-kl-red shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5">
        {buttonText}
      </button>
    </div>
  );
};

export default CreatePostScreen;
