import React from 'react';
import { translations } from '../constants';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { CvIcon } from './icons/CvIcon';
import { MailIcon } from './icons/MailIcon';
import { MicIcon } from './icons/MicIcon';
import type { Language, AnalysisTab } from '../types';

interface NavigationProps {
  activeTab: AnalysisTab;
  setActiveTab: (tab: AnalysisTab) => void;
  language: Language;
}

const navItems = [
  { id: 'jobAnalysis', icon: BriefcaseIcon },
  { id: 'cvAnalysis', icon: CvIcon },
  { id: 'coverLetter', icon: MailIcon },
  { id: 'interviewPrep', icon: MicIcon },
] as const;

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, language }) => {
  // FIX: Changed translations property from 'nav' to 'tabs' to match constants.ts
  const t = translations[language].tabs;

  return (
    <div className="w-full flex justify-center mb-8">
        <div className="w-full md:w-auto p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-wrap justify-center items-center gap-2">
        {navItems.map(item => (
            <button
            key={item.id}
            // FIX: The onClick handler now correctly uses setActiveTab with an AnalysisTab
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                // FIX: The comparison now correctly compares the activeTab with the item's id.
                activeTab === item.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-gray-200'
            }`}
            >
                <item.icon className="w-5 h-5 mr-2" />
                {t[item.id]}
            </button>
        ))}
        </div>
    </div>
  );
};
