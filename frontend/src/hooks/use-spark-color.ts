import { useEffect, useState } from 'react';

export const useSparkColor = () => {
  const [sparkColor, setSparkColor] = useState('#ffffff');

  useEffect(() => {
    const updateSparkColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setSparkColor(isDark ? '#ffffff' : '#ff6b35'); // white for dark mode, orange for light mode
    };

    // Initial check
    updateSparkColor();

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      updateSparkColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return sparkColor;
};