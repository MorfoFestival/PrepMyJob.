import React, { useState, useCallback } from 'react';
import { translations } from '../constants';
import { BriefcaseIcon } from '../components/icons/BriefcaseIcon';
import { CvIcon } from '../components/icons/CvIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { MicIcon } from '../components/icons/MicIcon';
import { JobAnalysis } from './tabs/JobAnalysis';
import { CvAnalysis } from './tabs/CvAnalysis';
import { CoverLetterGenerator } from './tabs/CoverLetterGenerator';
import { InterviewPrep } from './tabs/InterviewPrep';
import type { Language, AnalysisTab } from '../types';

interface HomePageProps {
  language: Language;
}

const tabItems: { id: AnalysisTab; icon: React.FC<{className?: string}> }[] = [
  { id: 'jobAnalysis', icon: BriefcaseIcon },
  { id: 'cvAnalysis', icon: CvIcon },
  { id: 'coverLetter', icon: MailIcon },
  { id: 'interviewPrep', icon: MicIcon },
];

export const HomePage: React.FC<HomePageProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<AnalysisTab>('jobAnalysis');
  const t = translations[language].tabs;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'jobAnalysis':
        return <JobAnalysis language={language} />;
      case 'cvAnalysis':
        return <CvAnalysis language={language} />;
      case 'coverLetter':
        return <CoverLetterGenerator language={language} />;
      case 'interviewPrep':
        return <InterviewPrep language={language} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center mb-8">
        <div className="w-full md:w-auto p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl flex flex-wrap justify-center items-center gap-2">
          {tabItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-gray-200'
              }`}
            >
              <item.icon className="w-5 h-5 me-2" />
              {t[item.id]}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full mt-8">
        {renderActiveTab()}
      </div>
    </div>
  );
};