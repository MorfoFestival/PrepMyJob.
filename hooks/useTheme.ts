import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

/**
 * This custom hook manages the application's theme.
 * It persists the chosen theme in localStorage and applies the corresponding CSS class to the HTML root element.
 * It defaults to the 'light' theme if no theme is found in localStorage.
 */
export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for theme in localStorage on initial load. Default to 'light'.
    // This function runs only once, preventing re-evaluation on every render.
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme') as Theme | null;
      // Ensure the stored value is a valid theme
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        return storedTheme;
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Apply the correct class to the root element.
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist the theme choice in localStorage.
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('Failed to save theme to localStorage.', e);
    }
  }, [theme]); // This effect runs whenever the theme state changes.

  return [theme, setTheme];
};
