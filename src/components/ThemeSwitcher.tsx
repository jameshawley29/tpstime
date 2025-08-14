import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';


const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'trinity', label: 'Trinity' },
  { value: 'dark', label: 'Dark' },
  { value: 'forest', label: 'Forest' },
  { value: 'rose', label: 'Rose' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'sunset', label: 'Sunset' },
];

const ThemePreview: React.FC<{ theme: string; customPrimary: string }> = ({ theme, customPrimary }) => (
  <div
    className="w-64 h-36 rounded-lg border-2 flex flex-col justify-between shadow transition-all duration-200 border-primary mx-auto mb-4"
    style={{
      background: `var(--color-background)`,
      color: `var(--color-text)`,
      borderColor: customPrimary || 'var(--color-primary)',
    }}
    data-theme={theme}
  >
    <div className="flex flex-row justify-between px-3 pt-3">
      <span className="font-bold text-sm" style={{ color: customPrimary || 'var(--color-primary)' }}>A B C</span>
      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Wed</span>
    </div>
    <div className="flex flex-col items-center justify-center flex-1">
      <span className="text-3xl font-bold" style={{ color: customPrimary || 'var(--color-primary)' }}>12:34</span>
      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Until Math Ends</span>
    </div>
    <div className="flex flex-row justify-between px-3 pb-3">
      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Period 1</span>
      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>8:00-8:55</span>
    </div>
  </div>
);

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, updateThemeColor } = useTheme();

  const [customPrimary, setCustomPrimary] = useState<string>('');

  const handleCustomColorChange = (color: string) => {
    setCustomPrimary(color);
    updateThemeColor('color-primary', color);
  };

  const handleDefaultColor = () => {
    setCustomPrimary('');
    updateThemeColor('color-primary', ''); // Remove inline style, fallback to CSS var
  };

  return (
    <div className="p-4 bg-surface rounded-lg border border-border max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-text mb-4 text-center">Theme Settings</h3>

      {/* Theme selection buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {themeOptions.map(opt => (
          <button
            key={opt.value}
            className={`px-3 py-1 rounded border font-semibold transition-colors duration-150 ${theme === opt.value ? 'bg-primary text-background border-primary' : 'bg-background text-primary border border-primary'}`}
            onClick={() => setTheme(opt.value as any)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Single live preview */}
      <ThemePreview theme={theme} customPrimary={customPrimary} />

      {/* Primary Color Options */}
      <div className="mb-2 flex gap-2 justify-center">
        <button
          onClick={() => handleCustomColorChange('#FF0000')}
          className="bg-primary text-white px-3 py-1 rounded"
        >
          Red
        </button>
        <button
          onClick={() => handleCustomColorChange('#10c50d')}
          className="bg-primary text-white px-3 py-1 rounded"
        >
          Green
        </button>
        <button
          onClick={() => handleCustomColorChange('#1CA9C9')}
          className="bg-primary text-white px-3 py-1 rounded"
        >
          Blue
        </button>
        <button
          onClick={handleDefaultColor}
          className="bg-background text-primary border border-primary px-3 py-1 rounded"
        >
          Default
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;