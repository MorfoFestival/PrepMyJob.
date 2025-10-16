import React, { useState, useRef, useEffect } from 'react';
import { translations } from '../constants';
import { ThemeToggle } from './ThemeToggle';
import { UserIcon } from './icons/UserIcon';
import { HamburgerIcon } from './icons/HamburgerIcon';
import { XIcon } from './icons/XIcon';
import { useAppContext } from '../context/AppContext';
import type { Language, Page } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
    language: Language;
    setLanguage: (language: Language) => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    activePage: Page;
    setActivePage: (page: Page) => void;
}

const NavLink: React.FC<{
    page: Page;
    activePage: Page;
    setActivePage: (page: Page) => void;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}> = ({ page, activePage, setActivePage, children, className, onClick }) => (
    <button 
        onClick={() => {
            setActivePage(page);
            if (onClick) onClick();
        }}
        className={className || `px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
            activePage === page 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
    >
        {children}
    </button>
);

const MobileMenu: React.FC<{
    language: Language;
    activePage: Page;
    setActivePage: (page: Page) => void;
    closeMenu: () => void;
}> = (props) => {
    const { language, activePage, setActivePage, closeMenu } = props;
    const { isAuthenticated, logout } = useAppContext();
    const t = translations[language].header;

    const handleLogout = () => {
        logout();
        closeMenu();
        setActivePage('home');
    };
    
    const mobileLinkClasses = "block w-full text-center py-4 text-xl font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md";

    return (
        <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 flex flex-col items-center justify-center animate-fade-in">
             <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
            `}</style>
            <button onClick={closeMenu} className="absolute top-8 end-4 p-2 text-gray-600 dark:text-gray-300">
                <XIcon className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center gap-6 w-full px-8">
                <NavLink page="home" activePage={activePage} setActivePage={setActivePage} className={mobileLinkClasses} onClick={closeMenu}>{t.home}</NavLink>
                <NavLink page="discover" activePage={activePage} setActivePage={setActivePage} className={mobileLinkClasses} onClick={closeMenu}>{t.discover}</NavLink>
                {isAuthenticated && (
                    <>
                        <div className="w-1/2 border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        <NavLink page="myAnalyses" activePage={activePage} setActivePage={setActivePage} className={mobileLinkClasses} onClick={closeMenu}>{t.myAnalyses}</NavLink>
                        <NavLink page="profile" activePage={activePage} setActivePage={setActivePage} className={mobileLinkClasses} onClick={closeMenu}>{t.profile}</NavLink>
                    </>
                )}
                <div className="w-1/2 border-t border-gray-200 dark:border-gray-700 my-2"></div>
                {isAuthenticated ? (
                     <button onClick={handleLogout} className={`${mobileLinkClasses} !text-red-600 dark:!text-red-400`}>{t.logout}</button>
                ) : (
                    <button onClick={() => { setActivePage('auth'); closeMenu(); }} className={`${mobileLinkClasses} !text-blue-600 dark:!text-blue-400`}>{t.login}</button>
                )}
            </nav>
        </div>
    );
};


export const Header: React.FC<HeaderProps> = (props) => {
    const { language, setLanguage, theme, setTheme, activePage, setActivePage } = props;
    const { isAuthenticated, logout, user } = useAppContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const t = translations[language].header;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        setActivePage('home');
    }
    
    return (
        <>
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 md:gap-6">
                 <h1 
                    onClick={() => setActivePage('home')}
                    className="text-2xl md:text-3xl font-bold tracking-tight cursor-pointer"
                >
                    <span className="text-gray-900 dark:text-gray-100">PrepMyJob</span><span className="text-blue-600">.</span>
                </h1>
                <nav className="hidden md:flex items-center gap-2">
                    <NavLink page="home" activePage={activePage} setActivePage={setActivePage}>{t.home}</NavLink>
                    <NavLink page="discover" activePage={activePage} setActivePage={setActivePage}>{t.discover}</NavLink>
                </nav>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
                <ThemeToggle theme={theme} setTheme={setTheme} />
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
                {isAuthenticated ? (
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(prev => !prev)} className="p-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                           <UserIcon className="w-5 h-5" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute end-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700">
                                <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</div>
                                <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                <a onClick={() => { setActivePage('myAnalyses'); setIsDropdownOpen(false); }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">{t.myAnalyses}</a>
                                <a onClick={() => { setActivePage('profile'); setIsDropdownOpen(false); }} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">{t.profile}</a>
                                <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                <a onClick={handleLogout} className="cursor-pointer block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">{t.logout}</a>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => setActivePage('auth')} className="hidden sm:block px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
                        {t.login}
                    </button>
                )}
                 <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <HamburgerIcon className="w-6 h-6" />
                </button>
            </div>
        </header>

        {isMobileMenuOpen && <MobileMenu language={language} activePage={activePage} setActivePage={setActivePage} closeMenu={() => setIsMobileMenuOpen(false)} />}
        </>
    );
};