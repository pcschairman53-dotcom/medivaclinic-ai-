import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Heart } from "lucide-react";
import { NAV_LINKS } from "../../constants";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4",
        scrolled ? "glass sm:m-4 m-2 rounded-2xl py-3 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 sm:p-2 bg-primary rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-bold font-display tracking-tight">
            Mediva<span className="text-primary italic">Clinic</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.href ? "text-primary" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <Link
              to="/pathology"
              className="px-5 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              Pathology
            </Link>
            <Link
              to="/booking"
              className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-all"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 bg-white/50 backdrop-blur-sm rounded-xl border border-white/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden glass mt-4 rounded-2xl overflow-hidden shadow-2xl border border-white/40"
          >
            <div className="flex flex-col p-4 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-bold p-4 rounded-xl transition-all",
                    location.pathname === link.href ? "bg-primary/10 text-primary" : "hover:bg-slate-50 text-slate-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] bg-slate-100 my-2" />
              <Link
                to="/pathology"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-white border border-slate-100 text-slate-900 text-center rounded-xl font-black uppercase tracking-widest text-xs mb-1"
              >
                Pathology Services
              </Link>
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-primary text-white text-center rounded-xl font-bold shadow-lg shadow-primary/20"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
