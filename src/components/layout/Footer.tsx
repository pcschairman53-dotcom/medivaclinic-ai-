import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, CheckCircle2, ArrowRight, Sparkles, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    try {
      // In a real app, you would send this to your backend or Google Sheets
      // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-24 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -mr-64 -mb-64" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-primary rounded-2xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white font-display tracking-tight">
              Mediva<span className="text-primary italic">Clinic</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed font-medium">
            The next generation of healthcare. Combining expert medical professionals with cutting-edge AI technology for a better patient experience.
          </p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Instagram].map((Icon, i) => (
              <motion.a 
                key={i}
                href="#" 
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Quick Links</h4>
          <ul className="space-y-4 text-sm font-medium">
            {["About Us", "Our Services", "FAQ", "Book Appointment"].map((item, i) => (
              <li key={i}>
                <Link to={item === "About Us" ? "/about" : item === "Our Services" ? "/services" : item === "FAQ" ? "/faq" : "/booking"} className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-primary/20 rounded-full group-hover:bg-primary transition-colors" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Contact Us</h4>
          <ul className="space-y-6 text-sm font-medium">
            <li className="flex gap-4 group cursor-default">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Email</p>
                <p className="text-white group-hover:text-primary transition-colors">contact@mediva.care</p>
              </div>
            </li>
            <li className="flex gap-4 group cursor-default">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Phone size={18} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Phone</p>
                <p className="text-white group-hover:text-primary transition-colors">+91 9330457995</p>
              </div>
            </li>
            <li className="flex gap-4 group cursor-default">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MapPin size={18} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Location</p>
                <p className="text-white group-hover:text-primary transition-colors">Belgharia, Kolkata - 700056</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Newsletter</h4>
            <p className="text-sm font-medium leading-relaxed">Stay updated with the latest health tips and clinic news.</p>
          </div>

          <div className="relative glass-premium p-1.5 rounded-[2rem] bg-white/5 border border-white/10 group-focus-within:border-primary/50 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 text-center space-y-2"
                >
                  <div className="flex justify-center">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>
                  <p className="text-xs font-black text-white">Subscribed Successfully!</p>
                  <p className="text-[10px] text-slate-500 font-medium italic">Thank you for subscribing to Mediva Health Updates</p>
                  <motion.button 
                    onClick={() => setStatus("idle")}
                    className="text-[10px] font-black text-primary uppercase tracking-widest mt-2 hover:underline"
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex items-center"
                >
                  <div className="absolute left-4 text-slate-500">
                    <Sparkles size={16} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    disabled={status === "loading"}
                    className="w-full bg-transparent border-0 rounded-3xl pl-12 pr-16 py-4 text-sm text-white focus:outline-none focus:ring-0 placeholder:text-slate-600 font-medium transition-all"
                  />
                  <div className="absolute right-1">
                    <motion.button 
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowRight size={20} />
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-600">
            <Shield size={12} className="text-primary/50" />
            Secure & Privacy Focused
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-medium tracking-wider">
        <div className="flex items-center gap-4 text-slate-500 grayscale opacity-40">
          <p>&copy; 2026 Mediva Clinic. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Privacy Policy</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Terms of Service</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Kolkata, India</a>
        </div>
      </div>
    </footer>
  );
}

