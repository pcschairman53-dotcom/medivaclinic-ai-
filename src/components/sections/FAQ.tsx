import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Plus, Minus, Phone, MessageCircle, Bot, Headphones, ArrowRight } from "lucide-react";
import { FAQS } from "../../constants";
import { cn } from "../../lib/utils";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="support" className="py-24 px-6 bg-white overflow-hidden relative">
      {/* Decorative Blobs for the section */}
      <div className="absolute top-0 left-1/4 w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 right-0 w-[30%] h-[50%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto space-y-48 pb-20">
        {/* Premium Support Section */}
        <div className="space-y-24">
          <div className="space-y-10 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 border border-primary/20 rounded-full shadow-[0_10px_20px_rgba(14,165,233,0.05)] backdrop-blur-md"
              >
                <div className="relative w-2.5 h-2.5">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                  <div className="relative w-2.5 h-2.5 bg-primary rounded-full" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Assistance Available</span>
              </motion.div>
              
              <h2 className="text-6xl md:text-8xl font-black font-display tracking-tight text-slate-900 leading-[0.85] text-center">
                Expert Care <br />
                <span className="gradient-text italic">When it Matters</span>
              </h2>
              
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                Experience medical assistance that never sleeps. Our hybrid support system connects you with <span className="text-slate-900 font-bold">AI precision</span> and <span className="text-primary font-bold italic">Human empathy</span> in seconds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-0">
            <motion.div 
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => {
                const chatbotTrigger = document.getElementById('chatbot-trigger');
                if (chatbotTrigger) chatbotTrigger.click();
              }}
              className="p-14 glass dark:bg-slate-900 rounded-[4rem] group cursor-pointer border border-slate-100 dark:border-white/5 hover:border-primary transition-all shadow-[0_25px_60px_rgba(0,0,0,0.04)] hover:shadow-[0_50px_100px_rgba(14,165,233,0.2)] relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-primary shadow-[0_15px_35px_rgba(14,165,233,0.25)] group-hover:scale-110 group-hover:rotate-6 transition-all relative z-10 border border-slate-50 dark:border-slate-800">
                <Bot size={48} />
              </div>
              <div className="space-y-4 mt-10 relative z-10">
                <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">AI Expert</h4>
                <p className="text-base text-slate-500 leading-relaxed font-medium">Instant medical data analysis and smart symptom screening 24/7.</p>
              </div>
              <div className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.25em] text-primary pt-8 group-hover:gap-6 transition-all">
                Launch Assistant <ArrowRight size={18} />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => {
                const hubTrigger = document.getElementById('support-hub-trigger');
                if (hubTrigger) hubTrigger.click();
              }}
              className="p-14 bg-slate-950 rounded-[4rem] group cursor-pointer border border-white/10 hover:border-primary transition-all shadow-[0_40px_120px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.25),transparent_70%)] opacity-50" />
              <div className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_0_50px_rgba(14,165,233,0.6)] group-hover:scale-110 transition-all relative z-10 border border-white/20">
                <Headphones size={48} />
              </div>
              <div className="space-y-4 mt-10 relative z-10">
                <h4 className="text-3xl font-black text-white tracking-tight">Support Hub</h4>
                <p className="text-base text-slate-400 leading-relaxed font-medium">Real-time consultation with our specialist concierge team.</p>
              </div>
              <div className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.25em] text-primary pt-8 group-hover:gap-6 transition-all">
                Access Live Hub <ArrowRight size={18} />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <motion.a 
              whileHover={{ y: -15, scale: 1.02 }}
              href="https://wa.me/919330457995?text=Hello%20Mediva%20Clinic%20AI,%20I%20would%20like%20to%20consult%20with%20a%20doctor." 
              target="_blank" 
              rel="noreferrer" 
              className="p-14 glass dark:bg-slate-900 rounded-[4rem] group cursor-pointer border border-slate-100 dark:border-white/5 hover:border-green-500 transition-all shadow-[0_25px_60px_rgba(0,0,0,0.04)] hover:shadow-[0_50px_100px_rgba(37,211,102,0.2)] relative overflow-hidden flex flex-col items-center text-center block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-[#25D366] shadow-[0_15px_35px_rgba(37,211,102,0.25)] group-hover:scale-110 group-hover:-rotate-6 transition-all relative z-10 border border-slate-50 dark:border-slate-800">
                <MessageCircle size={48} />
              </div>
              <div className="space-y-4 mt-10 relative z-10">
                <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">WhatsApp</h4>
                <p className="text-base text-slate-500 leading-relaxed font-medium">Instant messaging for rapid answers and booking support.</p>
              </div>
              <div className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.25em] text-[#25D366] pt-8 group-hover:gap-6 transition-all">
                Send Message <ArrowRight size={18} />
              </div>
            </motion.a>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Knowledge Base</h4>
              <h2 className="text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
                Frequently Asked <br />
                <span className="gradient-text italic">Questions</span>
              </h2>
              <p className="text-slate-600 max-w-md">
                Everything you need to know about our medical services, booking process, and how our AI technology works.
              </p>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const hubTrigger = document.getElementById('support-hub-trigger');
                if (hubTrigger) hubTrigger.click();
              }}
              className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 cursor-pointer group/support hover:bg-white hover:border-primary/30 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/support:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover/support:scale-110 transition-transform relative z-10">
                <HelpCircle size={32} />
                <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-pulse -z-10 group-hover/support:opacity-0" />
              </div>
              <div className="relative z-10">
                <p className="text-sm font-black text-slate-900">Still have questions?</p>
                <p className="text-xs text-slate-500 mt-1 font-medium italic">Our support team is just a click away.</p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-[2.5rem] transition-all duration-500",
                  activeIndex === index 
                    ? "bg-primary/5 border-primary/30 shadow-[0_20px_50px_rgba(14,165,233,0.1)] border" 
                    : "bg-white border-slate-100 hover:border-primary/20 hover:bg-slate-50 border"
                )}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full p-8 sm:p-10 flex items-center justify-between text-left relative z-10"
                >
                  <h3 className={cn(
                    "font-black text-lg sm:text-xl transition-colors pr-12 leading-tight",
                    activeIndex === index ? "text-primary" : "text-slate-900 group-hover:text-primary"
                  )}>
                    {faq.question}
                  </h3>
                  <div className={cn(
                    "shrink-0 w-12 h-12 rounded-2xl transition-all flex items-center justify-center shadow-sm",
                    activeIndex === index ? "bg-primary text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                    {activeIndex === index ? <Minus size={22} /> : <Plus size={22} />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 sm:px-10 pb-10 text-slate-600 leading-relaxed text-base sm:text-lg font-medium relative z-10">
                        <div className="pt-2 border-t border-primary/10">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Subtle Glow on Active */}
                {activeIndex === index && (
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Row enhancement */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass-premium p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 bg-white/40 border-white/60 relative group/cta">
            <div 
              onClick={() => {
                const hubTrigger = document.getElementById('support-hub-trigger');
                if (hubTrigger) hubTrigger.click();
              }}
              className="space-y-4 text-center md:text-left cursor-pointer group-hover/cta:translate-x-2 transition-transform duration-500"
            >
              <h3 className="text-4xl font-black text-slate-900 tracking-tight group-hover/cta:text-primary transition-colors italic">Still have questions?</h3>
              <p className="text-slate-500 font-medium max-w-sm text-lg leading-relaxed">
                Our support team and AI are standing by to help you with anything you need. <span className="text-primary underline decoration-primary/30 underline-offset-4">Open Hub</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
              <button 
                onClick={() => {
                  const chatbotTrigger = document.getElementById('chatbot-trigger');
                  if (chatbotTrigger) chatbotTrigger.click();
                }}
                className="flex flex-col items-center gap-3 p-6 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-3xl transition-all group"
              >
                <div className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Bot size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Chat with AI</span>
              </button>

              <a 
                href="https://wa.me/919330457995?text=I%20have%20questions%20about%20Mediva."
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-green-500/5 hover:bg-green-500/10 border border-green-500/10 rounded-3xl transition-all group"
              >
                <div className="p-3 bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600">WhatsApp</span>
              </a>

              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex flex-col items-center gap-3 p-6 bg-slate-900 hover:bg-black border border-slate-800 rounded-3xl transition-all group"
              >
                <div className="p-3 bg-white/10 text-white rounded-xl group-hover:scale-110 transition-transform">
                  <ArrowRight size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Book Now</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
