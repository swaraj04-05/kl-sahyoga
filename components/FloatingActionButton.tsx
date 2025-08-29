import React from 'react';
import { ICONS } from '../constants';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-6 z-20 w-16 h-16 rounded-2xl bg-gradient-to-br from-kl-orange to-kl-red text-white shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform"
      aria-label="Create new post"
    >
      <ICONS.DONATE className="w-8 h-8" />
    </button>
  );
};

export default FloatingActionButton;