import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'blue';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateThemeColor: (colorVar: string, value: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes/attributes
    root.classList.remove('dark');
    root.removeAttribute('data-theme');
    
    // Apply new theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);


  const updateThemeColor = (colorVar: string, value: string) => {
    document.documentElement.style.setProperty(`--${colorVar}`, value);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};