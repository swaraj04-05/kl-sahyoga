import React from 'react';

interface ToastProps {
  text: string;
  isVisible: boolean;
  onClick: () => void;
}

const Toast: React.FC<ToastProps> = ({ text, isVisible, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed top-[calc(1rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-kl-blue text-white text-sm font-semibold rounded-full shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      {text}
    </div>
  );
};

export default Toast;
