import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../types';
import { Language as LanguageEnum } from '../types';
import { FrFlagIcon } from './icons/FrFlagIcon';
import { EnFlagIcon } from './icons/EnFlagIcon';
import { EsFlagIcon } from './icons/EsFlagIcon';
import { DeFlagIcon } from './icons/DeFlagIcon';
import { ArFlagIcon } from './icons/ArFlagIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const languageOptions = [
  { code: LanguageEnum.FR, name: 'Français', Icon: FrFlagIcon },
  { code: LanguageEnum.EN, name: 'English', Icon: EnFlagIcon },
  { code: LanguageEnum.ES, name: 'Español', Icon: EsFlagIcon },
  { code: LanguageEnum.DE, name: 'Deutsch', Icon: DeFlagIcon },
  { code: LanguageEnum.AR, name: 'العربية', Icon: ArFlagIcon },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = languageOptions.find(opt => opt.code === language) || languageOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <selectedLanguage.Icon className="w-5 h-5 rounded-sm" />
        <span className="mx-2 uppercase">{selectedLanguage.code}</span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute end-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700 animate-fade-in-down">
           <style>{`
            @keyframes fade-in-down {
              from { opacity: 0; transform: translateY(-5px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-down {
                animation: fade-in-down 0.2s ease-out forwards;
            }
           `}</style>
          {languageOptions.map(option => (
            <button
              key={option.code}
              onClick={() => handleSelect(option.code)}
              className={`w-full flex items-center px-4 py-2 text-sm text-start ${
                language === option.code
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <option.Icon className="w-5 h-5 me-3 rounded-sm" />
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};