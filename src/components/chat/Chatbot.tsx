import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, User, Bot, Loader2, Minus, Maximize2, Calendar, ClipboardList, MapPin, Shield, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { chatWithAI } from "../../services/gemini";
import { submitToSheets } from "../../services/sheets";
import { Message } from "../../types";
import { cn } from "../../lib/utils";
import ReactMarkdown from "react-markdown";
import confetti from "canvas-confetti";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark for futuristic feel
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [showEmergency, setShowEmergency] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<Message[]>([]);

  // Sync ref with state for history tracking without triggering re-renders
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting - only once on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "init-1",
          role: "assistant",
          content: "Initializing **Mediva Omni Neural Core**... 🧠",
          timestamp: new Date()
        },
        {
          id: "1",
          role: "assistant",
          content: "Protocol established. I am ✨ **Mediva**, your high-tier AI health concierge. Our neural network has detected your presence. How may I assist your medical journey today?",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Memoized constants to prevent unnecessary re-renders
  const QUICK_REPLIES = useMemo(() => [
    { label: language === "en" ? "Book Appointment" : "অ্যাপয়েন্টমেন্ট বুক করুন", icon: <Calendar size={14} />, query: "I want to book an appointment" },
    { label: language === "en" ? "Check Symptoms" : "লক্ষণ পরীক্ষা করুন", icon: <ClipboardList size={14} />, query: "I want to check some symptoms" },
    { label: language === "en" ? "Clinic Location" : "ক্লিনিকের অবস্থান", icon: <MapPin size={14} />, query: "Where is the clinic located?" },
  ], [language]);

  const SYMPTOM_CATEGORIES = useMemo(() => [
    { label: "Fever", icon: "🌡️" },
    { label: "Dental", icon: "🦷" },
    { label: "Skin", icon: "🧴" },
    { label: "General", icon: "🏥" },
  ], []);

  // Derived progress memoized
  const progress = useMemo(() => Math.min((messages.length / 8) * 100, 100), [messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsThinking(true);

    try {
      // Use messagesRef to get the most up-to-date history without including messages in dependencies
      const history = [...messagesRef.current, userMessage].map(m => ({ role: m.role, content: m.content }));
      const aiResponse = await chatWithAI(history);

      // Artificial delay for futuristic feeling - slightly optimized
      await new Promise(resolve => setTimeout(resolve, 600));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Chat failed:", error);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  }, [input, isLoading]); // Fixed dependencies to exclude messages

  const captureLead = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const chatContent = messages.map(m => `${m.role}: ${m.content}`).join("\n");
      await submitToSheets({
        name: "Premium Chat User",
        phone: "AI Collected",
        problem: chatContent.slice(0, 1000),
        source: `AI Assistant (${language.toUpperCase()})`
      });
      setSubmitted(true);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { x: 0.9, y: 0.9 }
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  }, [messages, language]);

  const toggleLanguage = useCallback(() => {
    const newLang = language === "en" ? "bn" : "en";
    setLanguage(newLang);
    const greeting = newLang === "en" 
      ? "Language switched to English. How can I help?" 
      : "ভাষা পরিবর্তন করে বাংলা করা হয়েছে। আমি আপনাকে কীভাবে সাহায্য করতে পারি?";
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "assistant",
      content: greeting,
      timestamp: new Date()
    }]);
  }, [language]);

  return (
    <>
      {/* Floating Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        id="chatbot-trigger"
        className={cn(
          "fixed bottom-6 right-6 z-40 p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 group",
          isOpen && "hidden"
        )}
      >
        <div className="relative">
          <motion.div
            animate={{ 
              boxShadow: ["0 0 0px rgba(14,165,233,0)", "0 0 20px rgba(14,165,233,0.4)", "0 0 0px rgba(14,165,233,0)"],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-primary rounded-full blur-md -z-10"
          />
          <MessageSquare size={28} />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-[0_0_10px_#22d3ee]" 
          />
        </div>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-800 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all">
          Chat with Mediva AI ✨
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(20px)" }}
              animate={{ 
                opacity: 1, 
                scale: isMinimized ? 0.4 : 1, 
                y: isMinimized ? 50 : 0, 
                filter: "blur(0px)",
                width: isFullScreen ? "100vw" : (isMinimized ? "300px" : "min(480px, 92vw)"),
                height: isFullScreen ? "100vh" : (isMinimized ? "90px" : "min(750px, 85vh)"),
                bottom: isFullScreen ? "0px" : "24px",
                right: isFullScreen ? "0px" : (isFullScreen ? "0px" : "24px"),
              }}
              exit={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(20px)" }}
              drag={!isFullScreen && !isMinimized}
              dragMomentum={false}
              style={{ willChange: "transform, opacity, width, height" }}
              className={cn(
                "fixed z-50 flex flex-col rounded-[2.8rem] shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden border transition-all duration-500 ease-out",
                isDarkMode 
                  ? "bg-slate-950/90 border-slate-800 text-white" 
                  : "bg-white/90 backdrop-blur-3xl border-white/50 text-slate-900",
                isFullScreen && "rounded-none"
              )}
            >
            {/* Glowing Aura Effect */}
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden">
               <motion.div 
                 animate={{ opacity: [0.05, 0.15, 0.05] }}
                 transition={{ repeat: Infinity, duration: 5 }}
                 className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-primary/10" 
               />
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_#22d3ee]" />
            </div>

            {/* Header */}
            <div 
              className={cn(
                "p-5 flex items-center justify-between shadow-lg relative overflow-hidden shrink-0 cursor-grab active:cursor-grabbing",
                isDarkMode ? "bg-slate-900" : "bg-gradient-to-br from-primary via-blue-600 to-secondary text-white"
              )}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 blur-[80px] rounded-full translate-x-10 -translate-y-10" />
              
              <div className="flex items-center justify-between w-full mb-2 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                      className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 via-primary to-secondary rounded-2xl blur-sm opacity-40"
                    />
                    <div className="w-12 h-12 bg-slate-800/90 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner relative">
                      <Bot size={28} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-950 shadow-[0_0_12px_#22d3ee]" />
                  </div>
                  {!isMinimized && (
                    <div>
                      <h3 className="font-black text-lg tracking-tighter flex items-center gap-2">
                        Mediva <span className="text-cyan-400 italic">Omni</span>
                      </h3>
                      <div className="flex items-center gap-2">
                         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                           {language === "en" ? "Autonomous Healthcare Core" : "অটোনমাস হেলথকেয়ার কোর"}
                         </span>
                      </div>
                    </div>
                  )}
                  {isMinimized && (
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">Mediva AI</span>
                      <span className="text-[8px] uppercase tracking-widest text-cyan-400 animate-pulse">Running...</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {!isMinimized && (
                    <>
                      <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-2 hover:bg-white/10 rounded-xl transition-all group">
                        <Maximize2 size={18} className="group-hover:scale-110 transition-transform" />
                      </button>
                      <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-white/10 rounded-xl transition-all group text-cyan-400">
                        {isDarkMode ? <Shield size={18} className="group-hover:rotate-12 transition-transform" /> : <Shield size={18} className="fill-current" />}
                      </button>
                      <button onClick={toggleLanguage} className="p-2 hover:bg-white/10 rounded-xl transition-all font-black text-[10px] tracking-widest">
                        {language === "en" ? "BN" : "EN"}
                      </button>
                    </>
                  )}
                  <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                    <Minus size={20} />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-red-400">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <div className="relative z-10 space-y-1.5 px-1 mt-2">
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] opacity-60">
                    <span>{language === "en" ? "Nexus Connectivity Status" : "নেক্সাস কানেক্টিভিটি স্ট্যাটাস"}</span>
                    <span className="text-cyan-400">{isLoading ? (language === "en" ? "Processing..." : "প্রসেসিং হচ্ছে...") : (language === "en" ? "Ready" : "প্রস্তুত")}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-primary shadow-[0_0_15px_#22d3ee]" 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Notice */}
            <AnimatePresence>
              {showEmergency && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-500/10 border-b border-red-500/20 p-3 px-6 flex items-center justify-between shrink-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    <p className="text-[10px] font-bold text-red-600 leading-tight">
                      {language === "en" 
                        ? "For life-threatening emergencies, please call your local emergency services immediately."
                        : "জীবনহানিকর জরুরি অবস্থার জন্য, দয়া করে এখনই আপনার স্থানীয় জরুরি বিভাগে কল করুন।"}
                    </p>
                  </div>
                  <button onClick={() => setShowEmergency(false)} className="text-red-400 hover:text-red-600">
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className={cn(
                "flex-1 overflow-y-auto px-6 py-10 md:px-8 space-y-10 scroll-smooth transition-opacity duration-300 scrollbar-none",
                isDarkMode ? "bg-slate-950/50" : "bg-slate-50/50",
                isMinimized && "opacity-0 pointer-events-none"
              )}
            >
              {messages.map((m, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  key={m.id}
                  className={cn(
                    "flex gap-4",
                    m.role === 'user' ? "flex-row-reverse text-right" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border relative",
                    m.role === 'assistant' 
                      ? "bg-slate-900 border-slate-800 text-cyan-400" 
                      : "bg-primary text-white border-primary"
                  )}>
                    {m.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                    {m.role === 'assistant' && (
                      <motion.div 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-cyan-400/10 rounded-2xl blur-sm" 
                      />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-xl relative group overflow-hidden",
                    m.role === 'assistant' 
                      ? (isDarkMode ? "bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800 shadow-slate-900/50" : "bg-white text-slate-800 rounded-tl-none border border-slate-100") 
                      : "bg-primary text-white rounded-tr-none shadow-primary/20",
                  )}>
                    {m.role === 'assistant' && (
                       <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400/20" />
                    )}
                    <div className={cn("markdown-body relative z-10 text-[13px]", isDarkMode && "prose-invert")}>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>

                    {m.role === 'assistant' && (m.content.includes("Belgharia") || m.content.includes("700056")) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 space-y-2 relative z-10"
                      >
                        <div className="w-full h-32 bg-slate-900 rounded-[1.5rem] overflow-hidden relative border border-slate-800 shadow-inner group-hover:border-cyan-400/50 transition-colors">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-primary/10" />
                          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:20px_20px]" />
                          <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                             <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center animate-pulse">
                               <MapPin size={24} className="text-cyan-400" />
                             </div>
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400/70">Interactive Nexus Map</span>
                          </div>
                        </div>

                        <a 
                          href="https://www.google.com/maps/search/Mediva+Clinic+Belgharia+Kolkata+700056"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 py-3 bg-cyan-400 text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-300 transition-all shadow-[0_4px_15px_rgba(34,211,238,0.3)]"
                        >
                          <MapPin size={14} /> Get Directions
                        </a>
                        <button 
                          onClick={() => window.location.href = "/booking"}
                          className={cn(
                            "w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border",
                            isDarkMode ? "bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800" : "bg-white border-slate-200 text-slate-800 hover:border-primary"
                          )}
                        >
                          <Calendar size={14} /> Book Appointment
                        </button>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between mt-3 opacity-30 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-medium tracking-widest uppercase">
                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {m.role === 'assistant' && idx === messages.length - 1 && (
                        <CheckCircle2 size={12} className="text-cyan-400" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center shrink-0">
                    <Bot size={20} className="animate-pulse" />
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] rounded-tl-none shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        {[0, 0.2, 0.4].map(d => (
                          <motion.span 
                            key={d}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} 
                            transition={{ repeat: Infinity, duration: 0.8, delay: d }} 
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full" 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
                        Mediva is synthesizing...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Triage / SYmptom Buttons (Conditional) */}
              {messages.length <= 2 && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {SYMPTOM_CATEGORIES.map(cat => (
                    <motion.button
                      key={cat.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSend(`${cat.label} concern`)}
                      className={cn(
                        "p-4 rounded-3xl border flex items-center justify-center gap-3 transition-all",
                        isDarkMode ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-primary" : "bg-white border-slate-100 hover:bg-white hover:border-primary shadow-sm"
                      )}
                    >
                      <span className="text-xl shrink-0">{cat.icon}</span>
                      <span className="text-[11px] font-black uppercase tracking-wider">{cat.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Dynamic Action Prompt */}
              {!isLoading && messages.length > 4 && !submitted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "p-6 rounded-[2rem] space-y-4 border shadow-sm",
                    isDarkMode ? "bg-primary/10 border-primary/20" : "bg-primary/5 border-primary/10"
                  )}
                >
                  <p className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    Complete Request
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={captureLead}
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-primary text-white rounded-2xl text-sm font-black shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (language === "en" ? "Secure My Appointment" : "আমার অ্যাপয়েন্টমেন্ট নিশ্চিত করুন")}
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href="https://wa.me/919330457995?text=Hello%20Mediva%20Clinic%20AI,%20I%20would%20like%20to%20consult%20with%20a%20doctor."
                        target="_blank"
                        rel="noreferrer"
                        className="py-3.5 px-2 bg-green-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-green-600 shadow-lg shadow-green-500/20 whitespace-nowrap overflow-hidden"
                      >
                        <MessageCircle size={14} className="shrink-0" /> WhatsApp
                      </a>
                      <button 
                        onClick={() => window.location.href = "/booking"}
                        className={cn(
                          "py-3.5 px-2 border rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all whitespace-nowrap overflow-hidden",
                          isDarkMode ? "bg-slate-800 border-slate-700 hover:bg-slate-700" : "bg-white border-slate-200 hover:border-primary"
                        )}
                      >
                        <Calendar size={14} className="shrink-0" /> Portal
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500 text-white p-6 rounded-3xl flex items-center gap-4 shadow-xl shadow-emerald-500/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-tighter">Request Received</h4>
                    <p className="text-[10px] opacity-90 font-medium">Our specialist will call you within 15 minutes.</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input & Quick Actions */}
            <div className={cn(
              "p-6 md:p-8 border-t shrink-0 transition-opacity duration-300",
              isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100",
              isMinimized && "opacity-0 pointer-events-none"
            )}>
              <div className="flex gap-2 overflow-x-auto pb-5 scrollbar-none snap-x px-1">
                {QUICK_REPLIES.map(reply => (
                  <button
                    key={reply.label}
                    onClick={() => handleSend(reply.query)}
                    className={cn(
                      "shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border active:scale-95 snap-center",
                      isDarkMode 
                        ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-cyan-400 shadow-lg shadow-black/20" 
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-primary hover:text-white"
                    )}
                  >
                    {reply.icon}
                    {reply.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 items-center">
                <div className="relative flex-1 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[1.5rem] blur opacity-10 group-focus-within:opacity-30 transition-opacity" />
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={language === "en" ? "Describe your symptoms..." : "আপনার সমস্যার কথা বলুন..."}
                    className={cn(
                      "w-full rounded-[1.8rem] px-8 py-5.5 pr-16 text-sm focus:outline-none transition-all outline-none border font-semibold relative z-10",
                      isDarkMode 
                        ? "bg-slate-900/80 border-slate-800 focus:border-cyan-400 text-white" 
                        : "bg-slate-50 border-slate-200 focus:border-primary text-slate-900"
                    )}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center z-20">
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading || isSubmitting}
                      className="w-12 h-12 bg-primary text-white rounded-2xl shadow-[0_8px_20px_rgba(14,165,233,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:shadow-none"
                    >
                      <ArrowRight size={22} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-5 mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                <span className="flex items-center gap-1.5"><Shield size={10} className="text-cyan-400" /> BIO-SECURED</span>
                <span className="opacity-30">•</span>
                <span className="flex items-center gap-1.5"><Bot size={10} className="text-secondary" /> OMNI NEURAL 5.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
