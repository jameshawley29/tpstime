import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, updateThemeColor } = useTheme();

  const handleCustomColorChange = (colorVar: string, value: string) => {
    updateThemeColor(colorVar, value);
  };

  return (
    <div className="p-4 bg-surface rounded-lg border border-border">
  <h3 className="text-lg font-semibold text-text mb-4">Theme Settings</h3>
      
      {/* Theme Selector */}
      <div className="mb-4">
        <label className="block text-text-secondary mb-2">Choose Theme:</label>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value as any)}
          className="bg-background border border-border text-text p-2 rounded"
        >
          <option value="Trinity">Trinity</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      {/* Custom Color Example */}
      <div className="mb-4">
        <label className="block text-text-secondary mb-2">Custom Primary Color:</label>
        <button 
          onClick={() => handleCustomColorChange('color-primary', 'oklch(0.7 0.3 0)')}
          className="bg-primary text-white px-3 py-1 rounded mr-2"
        >
          Red
        </button>
        <button 
          onClick={() => handleCustomColorChange('color-primary', 'oklch(0.6 0.3 120)')}
          className="bg-primary text-white px-3 py-1 rounded mr-2"
        >
          Green
        </button>
        <button 
          onClick={() => handleCustomColorChange('color-primary', 'oklch(0.6 0.3 240)')}
          className="bg-primary text-white px-3 py-1 rounded"
        >
          Blue
        </button>
      </div>

      {/* Theme Preview */}
      <div className="p-3 bg-background border border-border rounded">
  <p className="text-text">Primary text</p>
        <p className="text-text-secondary">Secondary text</p>
        <p className="text-primary">Primary color</p>
        <p className="text-error">Error color</p>
      </div>
    </div>
  );
};

import FooterNote from "../components/FooterNote";

const ThemeSwitcherWithFooter: React.FC = () => (
  <>
    <ThemeSwitcher />
    <FooterNote />
  </>
);

export default ThemeSwitcherWithFooter;