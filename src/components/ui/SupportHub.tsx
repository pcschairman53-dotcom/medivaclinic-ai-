import React, { useState, useCallback, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Headphones, 
  X, 
  MessageCircle, 
  PhoneCall, 
  Calendar, 
  Bot, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  ShieldCheck,
  Zap
} from "lucide-react";
import { submitToSheets } from "../../services/sheets";
import confetti from "canvas-confetti";
import { cn } from "../../lib/utils";

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"menu" | "callback">("menu");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    problem: ""
  });

  const WHATSAPP_NUMBER = "919330457995";
  const WHATSAPP_MESSAGE = encodeURIComponent("Hello Mediva Clinic Support, I need assistance.");
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  const handleCallbackSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitToSheets({
        ...formData,
        source: "Live Support Callback"
      });
      setSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0EA5E9', '#25D366', '#FFFFFF']
      });
    } catch (error) {
      console.error("Callback submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <>
      {/* Floating Badge */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setView("menu");
          setSubmitted(false);
        } }
        className="fixed bottom-32 right-6 z-40 flex items-center gap-3 p-2 pr-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-2xl group transition-all"
        id="support-hub-trigger"
      >
        <div className="relative">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Headphones size={24} />
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-1.5 leading-none mb-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Support Online
          </p>
          <p className="text-xs font-bold text-slate-800 dark:text-white leading-none">Live Support</p>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{ willChange: "transform, opacity" }}
              className="w-full max-w-[480px] bg-white dark:bg-slate-950 rounded-[2rem] sm:rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-slate-800 overflow-hidden relative"
            >
              {/* Futuristic Background */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(#0EA5E9_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full" />
              </div>

              {/* Header */}
              <div className="p-6 sm:p-10 pb-4 sm:pb-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[0_10px_25px_rgba(14,165,233,0.3)] border border-white/20">
                    <Headphones className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl sm:text-2xl tracking-tighter text-slate-900 dark:text-white">Support Hub</h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                       <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#25D366] bg-[#25D366]/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                         <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#25D366] rounded-full animate-pulse" />
                         Live
                       </span>
                       <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                         24/7 Secure
                       </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-800"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-10 pt-2 relative z-10">
                <AnimatePresence mode="wait">
                  {view === "menu" ? (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium pb-1 sm:pb-2">
                        How would you like our team to assist you today?
                      </p>

                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setIsOpen(false);
                            // Trigger chatbot - usually by clicking its floating button
                            const chatbotTrigger = document.getElementById('chatbot-trigger');
                            if (chatbotTrigger) chatbotTrigger.click();
                          }}
                          className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] sm:rounded-[2.5rem] group hover:border-primary transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-4 sm:gap-5 text-left">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary shadow-[0_5px_15px_rgba(14,165,233,0.1)] group-hover:scale-110 transition-transform">
                              <Bot size={24} className="sm:w-7 sm:h-7" />
                            </div>
                            <div>
                              <p className="font-black text-sm sm:text-base text-slate-800 dark:text-white">Chat with AI Assistant</p>
                              <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-slate-400 mt-0.5">Instant Medical Advice 🧠</p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-all sm:w-5 sm:h-5" />
                        </motion.button>

                        <motion.a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-between p-6 bg-[#25D366]/5 border border-[#25D366]/10 rounded-[2rem] group hover:border-[#25D366] transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-5 text-left">
                            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[#25D366] shadow-[0_5px_15px_rgba(37,211,102,0.1)] group-hover:scale-110 transition-transform">
                              <MessageCircle size={28} />
                            </div>
                            <div>
                              <p className="font-black text-slate-800 dark:text-white">WhatsApp Support</p>
                              <p className="text-[10px] uppercase font-black tracking-widest text-[#25D366] mt-0.5">Quick Consultation 💬</p>
                            </div>
                          </div>
                          <ChevronRight size={20} className="text-slate-300 group-hover:text-[#25D366] transition-all" />
                        </motion.a>

                        <motion.button
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setView("callback")}
                          className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem] group hover:border-primary transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-5 text-left">
                            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary shadow-[0_5px_15px_rgba(14,165,233,0.1)] group-hover:scale-110 transition-transform">
                              <PhoneCall size={28} />
                            </div>
                            <div>
                              <p className="font-black text-slate-800 dark:text-white">Request Call Back</p>
                              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-0.5">Expert Phone Advice 📞</p>
                            </div>
                          </div>
                          <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-all" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.location.href = "/booking"}
                          className="flex items-center justify-between p-5 bg-primary text-white rounded-3xl group shadow-lg shadow-primary/20"
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                              <Calendar size={24} />
                            </div>
                            <div>
                              <p className="font-bold">Book Appointment</p>
                              <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Secure Your Slot 🗓️</p>
                            </div>
                          </div>
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="callback"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {submitted ? (
                        <div className="text-center py-12 space-y-6">
                           <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                             <CheckCircle2 size={40} />
                           </div>
                           <div className="space-y-2">
                             <h4 className="text-2xl font-black text-slate-900 dark:text-white">Request Received</h4>
                             <p className="text-slate-500 dark:text-slate-400 font-medium">Our support team will contact you shortly to assist.</p>
                           </div>
                           <button 
                             onClick={() => setIsOpen(false)}
                             className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full font-black text-sm uppercase tracking-widest shadow-xl"
                           >
                             Close Window
                           </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <button 
                            onClick={() => setView("menu")}
                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all"
                          >
                            <ChevronRight size={16} className="rotate-180" /> Back to options
                          </button>
                          
                          <div className="space-y-4">
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white">Call-Back Support</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                              Our consultants are ready to assist you. Provide your details and we'll reach out.
                            </p>
                          </div>

                          <form onSubmit={handleCallbackSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Name</label>
                                <input 
                                  required
                                  type="text"
                                  placeholder="John Doe"
                                  value={formData.name}
                                  onChange={e => setFormData({...formData, name: e.target.value})}
                                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary transition-all"
                                />
                              </div>
                              <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Phone Number</label>
                                <input 
                                  required
                                  type="tel"
                                  placeholder="+91 00000 00000"
                                  value={formData.phone}
                                  onChange={e => setFormData({...formData, phone: e.target.value})}
                                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary transition-all"
                                />
                              </div>
                              <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Assistance Needed</label>
                                <textarea 
                                  required
                                  rows={3}
                                  placeholder="Describe your issue..."
                                  value={formData.problem}
                                  onChange={e => setFormData({...formData, problem: e.target.value})}
                                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary transition-all resize-none"
                                />
                              </div>
                            </div>
                            <button 
                              disabled={isSubmitting}
                              className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="animate-spin" size={20} />
                                  Booking Callback...
                                </>
                              ) : "Request Callback Call"}
                            </button>
                          </form>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/5 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-6">
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <ShieldCheck size={12} className="text-primary" />
                    Secure Support
                 </div>
                 <div className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <Zap size={12} className="text-secondary" />
                    Instant Response
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
