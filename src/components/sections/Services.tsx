import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../constants";

export default function Services() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Advanced Services</h4>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-slate-900 leading-[1.1] sm:leading-tight">
            Comprehensive Care for <br className="hidden sm:block" />
            <span className="gradient-text italic">Every Patient</span>
          </h2>
          <p className="text-slate-600">
            Mediva Clinic offers a wide range of specialized medical services, from general check-ups to advanced cardiology, all supported by our AI-enhanced infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => {
                if (service.title.toLowerCase().includes("pathology") || service.title.toLowerCase().includes("diagnostic imaging")) {
                  navigate("/pathology");
                } else if (service.title.toLowerCase().includes("support") || service.title.toLowerCase().includes("screening") || service.title.toLowerCase().includes("emergency")) {
                  const hubTrigger = document.getElementById('support-hub-trigger');
                  if (hubTrigger) hubTrigger.click();
                } else {
                  const chatbotTrigger = document.getElementById('chatbot-trigger');
                  if (chatbotTrigger) chatbotTrigger.click();
                }
              }}
              className="glass dark:bg-slate-900/40 p-10 rounded-[3rem] group cursor-pointer border border-slate-100 dark:border-white/5 hover:border-primary/50 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(14,165,233,0.15)] relative overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute -inset-1 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl -z-10 group-hover:from-primary/20 group-hover:to-secondary/20" />
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 font-medium">
                {service.description}
              </p>
              <div className="flex items-center gap-3 text-sm font-black text-primary uppercase tracking-widest pt-4 border-t border-slate-50 dark:border-white/5">
                Learn More <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 sm:mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl opacity-30 -z-10 animate-pulse" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-premium p-8 sm:p-14 rounded-[2.5rem] sm:rounded-[4rem] bg-white/40 dark:bg-slate-900/40 border-white/60 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 relative overflow-hidden backdrop-blur-2xl"
          >
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 sm:space-y-6 max-w-2xl text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm border border-primary/5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Personalized Care
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Need a customized <br className="hidden sm:block" />
                <span className="gradient-text italic">treatment plan?</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg font-medium leading-relaxed">
                Our specialists utilize advanced AI diagnostics to build a recovery plan tailored specifically to your unique health profile and history.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-4 relative z-10 w-full lg:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const chatbotTrigger = document.getElementById('chatbot-trigger');
                  if (chatbotTrigger) chatbotTrigger.click();
                }}
                className="group relative w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black uppercase tracking-[0.15em] text-xs sm:text-sm rounded-2xl sm:rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(14,165,233,0.4)] transition-all overflow-hidden flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-white">
                  Schedule Analysis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">
                  AI-Powered Diagnostics Ready
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
