import React from 'react';
import { translations } from '../constants';
import type { Language, Page } from '../types';
import { BriefcaseIcon } from '../components/icons/BriefcaseIcon';
import { CvIcon } from '../components/icons/CvIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { MicIcon } from '../components/icons/MicIcon';

interface DiscoverPageProps {
    language: Language;
    setActivePage: (page: Page) => void;
}

// FIX: Added a specific type for feature keys to ensure type safety and resolve indexing errors.
type FeatureKey = keyof typeof translations['fr']['discoverPage']['features'];

const featureIcons: Record<FeatureKey, React.ReactNode> = {
    jobAnalysis: <BriefcaseIcon className="w-8 h-8 text-white" />,
    cvAnalysis: <CvIcon className="w-8 h-8 text-white" />,
    coverLetter: <MailIcon className="w-8 h-8 text-white" />,
    interviewPrep: <MicIcon className="w-8 h-8 text-white" />,
};

export const DiscoverPage: React.FC<DiscoverPageProps> = ({ language, setActivePage }) => {
    const t = translations[language];
    const pageT = t.discoverPage;
    const features = Object.keys(pageT.features) as FeatureKey[];

    return (
        <div className="w-full flex flex-col items-center text-center animate-fade-in">
             <style>{`
                @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">{pageT.title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">{pageT.subtitle}</p>

            <div className="mt-16 w-full max-w-5xl">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">{pageT.featuresTitle}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((key) => (
                        <div key={key} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                           <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                                {featureIcons[key]}
                           </div>
                           <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{pageT.features[key].title}</h4>
                           <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{pageT.features[key].description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setActivePage('home')}
                className="mt-16 px-10 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
                {pageT.ctaButton}
            </button>
        </div>
    );
};
