import { useServiceStatus } from "@/contexts/HealthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

export const SystemStatusWidget = () => {
  const { status } = useServiceStatus();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (status === 'online') {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [status]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-[100] w-80 glass-card bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-xl p-4 overflow-hidden"
        >
          {/* Animated Background Glow */}
          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none transition-colors duration-1000 ${
            status === 'checking' ? 'bg-blue-500/10' : 
            status === 'online' ? 'bg-emerald-500/10' : 'bg-destructive/10'
          }`} />

          <div className="flex items-start gap-3 relative z-10">
            {/* Icon */}
            <div className="mt-1">
              {status === 'checking' && <FaSpinner className="w-5 h-5 text-blue-400 animate-spin" />}
              {status === 'online' && <FaCheckCircle className="w-5 h-5 text-emerald-400" />}
              {status === 'offline' && <FaExclamationTriangle className="w-5 h-5 text-destructive" />}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="font-semibold text-sm">
                {status === 'checking' && 'Starting Builder Engine'}
                {status === 'online' && 'SiteBuilder Ready'}
                {status === 'offline' && 'Workspace Offline'}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {status === 'checking' && 'Preparing your creative workspace...'}
                {status === 'online' && 'Workspace initialized successfully'}
                {status === 'offline' && 'Trying to restore connection...'}
              </p>

              {/* Loading Checklist */}
              {status === 'checking' && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <FaCheckCircle className="w-3 h-3 text-emerald-500" />
                    <span className="text-foreground">Interface Loaded</span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <FaSpinner className="w-3 h-3 text-blue-500 animate-spin" />
                    <span className="text-muted-foreground">Connecting Project Storage</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1.0 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <FaSpinner className="w-3 h-3 text-blue-500 animate-spin" />
                    <span className="text-muted-foreground">Loading Builder Engine</span>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
