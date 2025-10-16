import React from 'react';
import { translations } from '../constants';
import { useAppContext } from '../context/AppContext';
import type { Language } from '../types';

interface MyAnalysesPageProps {
    language: Language;
}

const mockAnalyses = [
    { id: 1, type: "Analyse d'Offre", title: "Développeur Frontend Senior @ TechCorp", date: "2024-10-26", score: 88 },
    { id: 2, type: "Analyse de CV", title: "CV_JohnDoe_2024.pdf", date: "2024-10-25", score: 92 },
    { id: 3, type: "Analyse d'Offre", title: "Chef de Produit @ InnovateInc", date: "2024-10-22", score: 76 },
];

export const MyAnalysesPage: React.FC<MyAnalysesPageProps> = ({ language }) => {
    const { user } = useAppContext();
    const t = translations[language].myAnalysesPage;
    const hasAnalyses = mockAnalyses.length > 0;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2 dark:text-gray-100">{t.title}</h2>
            {user && <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-2">Bienvenue, {user.firstName} !</p>}
            <p className="text-center text-gray-600 dark:text-gray-400 mb-10">{t.subtitle}</p>

            {hasAnalyses ? (
                <div className="space-y-4">
                    {mockAnalyses.map(analysis => (
                        <div key={analysis.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                            <div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${analysis.type === "Analyse d'Offre" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"}`}>{analysis.type}</span>
                                <p className="font-semibold mt-2 text-gray-800 dark:text-gray-200">{analysis.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{analysis.date}</p>
                            </div>
                            <div className="text-right">
                               <p className="font-bold text-xl text-gray-700 dark:text-gray-300">{analysis.score}%</p>
                               <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">Voir les détails</a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center bg-gray-100 dark:bg-gray-800/50 p-8 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{t.noAnalyses}</p>
                </div>
            )}
        </div>
    );
};