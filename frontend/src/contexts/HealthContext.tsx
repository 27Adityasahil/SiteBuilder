import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type Status = 'checking' | 'online' | 'offline';

interface HealthContextType {
  status: Status;
  checkHealth: () => Promise<void>;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const BuilderHealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<Status>('checking');


  const checkHealth = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/health?t=${Date.now()}`, { timeout: 3000 });
      if (response.data.status === 'online') {
        setStatus('online');
      } else {
        setStatus('offline');
      }
    } catch (error) {
      setStatus('offline');
    }
  };

  useEffect(() => {
    // Initial check
    checkHealth();

    // Background heartbeat every 60 seconds
    const heartbeat = setInterval(() => {
      checkHealth();
    }, 60000);

    return () => clearInterval(heartbeat);
  }, []);

  // Auto-retry every 5 seconds when offline
  useEffect(() => {
    let retryInterval: ReturnType<typeof setInterval>;
    if (status === 'offline') {
      retryInterval = setInterval(() => {
        checkHealth();
      }, 5000);
    }

    return () => {
      if (retryInterval) clearInterval(retryInterval);
    };
  }, [status]);

  return (
    <HealthContext.Provider value={{ status, checkHealth }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useServiceStatus = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useServiceStatus must be used within a BuilderHealthProvider');
  }
  return context;
};
