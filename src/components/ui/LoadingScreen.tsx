import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="p-6 bg-primary rounded-[2.5rem] shadow-2xl shadow-primary/40 mb-8"
          >
            <Heart size={64} className="text-white fill-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-black font-display text-white tracking-tighter">
              Mediva<span className="text-primary italic">Clinic</span>
            </h1>
            <div className="flex gap-2 justify-center">
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-primary rounded-full" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <p className="text-slate-500 text-xs uppercase tracking-[0.5em] font-black">Initializing AI Lab</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
