import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextType {
  isMinimized: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(() => {
    const stored = localStorage.getItem('sidebarMinimized');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarMinimized', JSON.stringify(isMinimized));
  }, [isMinimized]);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <SidebarContext.Provider value={{ isMinimized, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}; 