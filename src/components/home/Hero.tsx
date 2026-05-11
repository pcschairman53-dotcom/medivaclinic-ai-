import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full gradient-bg -z-10" />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div 
              animate={{ 
                y: [0, -5, 0],
                boxShadow: ["0 4px 20px rgba(14,165,233,0.1)", "0 10px 40px rgba(14,165,233,0.2)", "0 4px 20px rgba(14,165,233,0.1)"]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-full shadow-2xl hover:bg-white/80 transition-all cursor-default group/badge"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-lg opacity-40 group-hover/badge:opacity-70 transition-opacity animate-pulse" />
                <span className="relative flex h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-primary">Next-Gen Healthcare is here</span>
              <Sparkles size={14} className="text-primary/60 group-hover/badge:rotate-12 transition-transform" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-400 font-black ml-1 flex items-center gap-2"
            >
              <span className="w-8 h-[1px] bg-slate-200" />
              AI-powered consultation & diagnostic support
            </motion.p>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-display tracking-tight leading-[0.95] sm:leading-[0.9] text-slate-900">
            Expert Care <br />
            <span className="gradient-text italic">Powered by AI</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
            Experience the future of medical consultation. Our smart clinic combines human expertise with advanced intelligence to provide you with the fastest, most accurate healthcare.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              to="/booking" 
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-slate-900 text-white rounded-full font-bold overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Book Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 sm:py-5 hover:bg-white/50 rounded-full transition-colors group border border-transparent hover:border-slate-100 sm:border-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform shrink-0">
                <Play size={16} sm:size={18} fill="currentColor" />
              </div>
              <span className="font-bold text-sm">How it Works</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 items-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">15k+</div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-black">Patients Served</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">98%</div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-black">Satisfaction</div>
            </div>
            <button 
              onClick={() => {
                const hubTrigger = document.getElementById('support-hub-trigger');
                if (hubTrigger) hubTrigger.click();
              }}
              className="group text-left space-y-1 col-span-2 sm:col-span-1 border-t sm:border-t-0 pt-6 sm:pt-0 border-slate-100"
            >
              <div className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-primary transition-all flex items-center gap-2 tracking-tighter">
                24/7
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-black">Live Expert Support</div>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ willChange: "transform, opacity" }}
          className="relative lg:mt-0 mt-12"
        >
          {/* Main Visual */}
          <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 group">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop" 
              alt="Modern Clinic" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              filter: ["none", "drop-shadow(0 0 10px rgba(16,185,129,0.1))", "none"]
            }} 
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, y: -15 }}
            className="absolute -top-4 -right-2 sm:-top-10 sm:-right-10 glass-premium p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 max-w-[160px] sm:max-w-[240px] group/trust cursor-default backdrop-blur-xl bg-white/40 z-20"
          >
            <div className="flex gap-2 sm:gap-4 items-center mb-2 sm:mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 blur-lg opacity-20 group-hover/trust:opacity-40 transition-opacity animate-pulse" />
                <div className="relative w-8 h-8 sm:w-12 sm:h-12 bg-emerald-50 text-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100 group-hover/trust:scale-110 transition-transform duration-500">
                  <ShieldCheck size={20} sm:size={26} />
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/70">Secure</span>
                <h4 className="text-[10px] sm:text-sm font-black text-slate-900 tracking-tight leading-none sm:leading-normal">Verified Healthcare</h4>
              </div>
            </div>
            <p className="text-[9px] sm:text-[11px] text-slate-600 leading-relaxed font-medium">
              AI-assisted support reviewed with professional healthcare guidance.
            </p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-10 glass p-3 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center gap-3 sm:gap-4 z-20"
          >
            <div className="flex -space-x-3 sm:-space-x-4">
              <img src="https://i.pravatar.cc/100?1" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white shadow-sm" />
              <img src="https://i.pravatar.cc/100?2" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white shadow-sm" />
              <img src="https://i.pravatar.cc/100?3" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white shadow-sm" />
            </div>
            <div>
              <div className="font-bold text-[10px] sm:text-sm">Join 15k+ Patients</div>
              <div className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-bold">Trust Mediva</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
