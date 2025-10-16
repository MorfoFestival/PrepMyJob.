import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  targetRole: string;
  industry: string;
}

interface AppContextType {
  jobDescription: string;
  setJobDescription: (desc: string) => void;
  cvText: string;
  setCvText: (text: string) => void;
  cvFileName: string;
  setCvFileName: (name: string) => void;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [cvText, setCvText] = useState('');
  const [cvFileName, setCvFileName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    // Simulate user creation on login/signup
    const namePart = email.split('@')[0].replace(/[\._]/g, ' ');
    const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1).split(' ')[0] || "Nouveau";
    const lastName = namePart.split(' ')[1] || "Utilisateur";

    setUser({
      email,
      firstName: firstName,
      lastName: lastName,
      targetRole: '',
      industry: '',
    });
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updatedInfo: Partial<User>) => {
    setUser(currentUser => currentUser ? { ...currentUser, ...updatedInfo } : null);
  }, []);

  const value = {
    jobDescription,
    setJobDescription,
    cvText,
    setCvText,
    cvFileName,
    setCvFileName,
    isAuthenticated,
    user,
    login,
    logout,
    updateUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};