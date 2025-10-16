import React, { useState, useEffect } from 'react';
import { translations } from './constants';
import { AppProvider, useAppContext } from './context/AppContext';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { AuthPage } from './pages/AuthPage';
import { MyAnalysesPage } from './pages/MyAnalysesPage';
import { ProfilePage } from './pages/ProfilePage';
import type { Language, Page } from './types';
import { Language as LanguageEnum } from './types';

const AppContent: React.FC = () => {
  const [language, setLanguage] = useState<Language>(LanguageEnum.FR);
  const [activePage, setActivePage] = useState<Page>('discover');
  const [theme, setTheme] = useTheme();
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    if (language === LanguageEnum.AR) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);
  
  const renderPage = () => {
    if (!isAuthenticated && (activePage === 'myAnalyses' || activePage === 'profile')) {
       return <AuthPage language={language} setActivePage={setActivePage} />;
    }

    switch(activePage) {
      case 'home':
        return <HomePage language={language} />;
      case 'discover':
        return <DiscoverPage language={language} setActivePage={setActivePage} />;
      case 'auth':
         return <AuthPage language={language} setActivePage={setActivePage} />;
      case 'myAnalyses':
        return <MyAnalysesPage language={language} />;
      case 'profile':
        return <ProfilePage language={language} />;
      default:
        return <DiscoverPage language={language} setActivePage={setActivePage} />;
    }
  }
  
  return (
    <div className="text-gray-800 dark:text-gray-300 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header 
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <main className="flex flex-col items-center">
          {renderPage()}
        </main>
        <footer className="text-center py-8 mt-12 md:mt-16 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Copyright © PrepMyJob. 2025</p>
        </footer>
      </div>
    </div>
  );
}


const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;