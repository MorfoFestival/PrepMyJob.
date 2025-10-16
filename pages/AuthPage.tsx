import React, { useState } from 'react';
import { translations } from '../constants';
import { useAppContext } from '../context/AppContext';
import type { Language, Page } from '../types';

interface AuthPageProps {
  language: Language;
  setActivePage: (page: Page) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ language, setActivePage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppContext();
  const t = translations[language].authPage;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate a successful login/registration
    login(email);
    setActivePage('myAnalyses');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">{t.title}</h2>
        <p className="text-center mt-2 text-gray-600 dark:text-gray-400">{t.subtitle}</p>

        <form onSubmit={handleAuth} className="mt-8 space-y-6">
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            {isLogin ? t.loginButton : t.registerButton}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
             <button onClick={(e) => { e.preventDefault(); login('example.google@gmail.com'); setActivePage('myAnalyses');}} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">{t.googleButton}</button>
             <button onClick={(e) => { e.preventDefault(); login('example.linkedin@linkedin.com'); setActivePage('myAnalyses');}} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">{t.linkedinButton}</button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? t.registerCta : t.loginCta}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500">
            {isLogin ? t.registerButton : t.loginButton}
          </button>
        </p>
      </div>
    </div>
  );
};