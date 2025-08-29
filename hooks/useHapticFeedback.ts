import { useCallback } from 'react';

type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const useHapticFeedback = () => {
  const triggerHapticFeedback = useCallback((type: HapticFeedbackType = 'light') => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        switch (type) {
          case 'light':
            navigator.vibrate(20);
            break;
          case 'medium':
            navigator.vibrate(40);
            break;
          case 'heavy':
            navigator.vibrate(60);
            break;
          case 'success':
            navigator.vibrate([20, 50, 20]);
            break;
          case 'warning':
            navigator.vibrate([50, 50, 50]);
            break;
          case 'error':
            navigator.vibrate([100, 50, 100]);
            break;
          default:
            navigator.vibrate(20);
        }
      } catch (error) {
        console.warn("Haptic feedback failed:", error);
      }
    }
  }, []);

  return triggerHapticFeedback;
};

export default useHapticFeedback;
