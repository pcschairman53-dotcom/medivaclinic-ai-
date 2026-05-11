import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const WHATSAPP_NUMBER = "919330457995";
  const WHATSAPP_MESSAGE = encodeURIComponent("Hello Mediva Clinic AI, I would like to consult with a doctor.");
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-4">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 relative group"
          >
            <div className="w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center text-[#25D366]">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">Urgent Care</p>
              <p className="text-xs font-bold text-slate-800 dark:text-white">Need help? Chat now</p>
            </div>
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={12} />
            </button>
            <div className="absolute left-4 top-full w-3 h-3 bg-white dark:bg-slate-900 border-b border-r border-slate-100 dark:border-slate-800 rotate-45 -translate-y-1.5" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-[#25D366] rounded-full blur-xl -z-10"
        />
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#20bd5a] transition-all relative overflow-hidden group"
          title="Chat on WhatsApp"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <MessageCircle size={32} className="relative z-10" />
        </motion.a>
      </div>
    </div>
  );
}
