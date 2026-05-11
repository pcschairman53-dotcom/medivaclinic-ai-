import { motion } from "motion/react";
import { MessageCircle, ArrowRight, Share2, ShieldCheck, Heart } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative glass-dark p-12 md:p-24 rounded-[3.5rem] overflow-hidden text-center space-y-8">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40%] h-full bg-secondary/10 blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 relative z-10"
          >
            <div className="flex justify-center">
              <button 
                onClick={() => {
                  const hubTrigger = document.getElementById('support-hub-trigger');
                  if (hubTrigger) hubTrigger.click();
                }}
                className="inline-flex items-center gap-3 p-2 px-6 bg-white/5 rounded-full border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer shadow-lg shadow-black/20"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Live Support Online
              </button>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black font-display tracking-tighter text-white leading-[0.95] sm:leading-[0.9] text-center">
              Ready for a Medical <br className="hidden sm:block" />
              <span className="text-primary italic">Breakthrough?</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-center">
              Don't wait for symptoms to worsen. Get a professional consultation or chat with our AI expert today. Experience diagnostic precision.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "/booking"}
                className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-primary text-white rounded-full font-black text-base sm:text-lg shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
              >
                Book Now <ArrowRight size={20} />
              </motion.button>
              
              <a 
                href="https://wa.me/919330457995?text=Hello%20Mediva%20Clinic%20AI,%20I%20would%20like%20to%20consult%20with%20a%20doctor."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-white/5 text-white rounded-full font-black text-base sm:text-lg border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle fill="#25D366" color="#25D366" size={20} /> WhatsApp Us
              </a>
            </div>
          </motion.div>

          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 opacity-50">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="text-primary" />
              <span className="text-xs text-white font-bold uppercase tracking-widest">Secured Data</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Heart className="text-primary" />
              <span className="text-xs text-white font-bold uppercase tracking-widest">Patient First</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="text-primary" />
              <span className="text-xs text-white font-bold uppercase tracking-widest">Expert Doctors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
