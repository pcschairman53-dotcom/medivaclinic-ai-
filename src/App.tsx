/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoadingScreen from "./components/ui/LoadingScreen";

// Components
import Chatbot from "./components/chat/Chatbot";
import Hero from "./components/home/Hero";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import FAQSection from "./components/sections/FAQ";
import CTASection from "./components/sections/CTA";
import BookingForm from "./components/booking/BookingForm";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import SupportHub from "./components/ui/SupportHub";
import AdminDashboard from "./components/admin/AdminDashboard";
import PathologyBooking from "./components/pathology/PathologyBooking";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LoadingScreen />
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/faq" element={<FAQSection />} />
            <Route path="/about" element={
              <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl sm:text-6xl font-black font-display mb-8">About <span className="gradient-text italic">Mediva</span></h1>
                  <div className="space-y-6 sm:space-y-8">
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                      Mediva Clinic was founded in 2024 with a vision to revolutionize the healthcare experience. We believe that by combining the best medical human expertise with powerful artificial intelligence, we can provide care that is not only faster and more accurate but also more deeply personalized to every patient's needs.
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="p-6 sm:p-8 bg-slate-50 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm"
                    >
                      <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                        Based in Belgharia, Kolkata, Mediva Clinic AI combines modern healthcare support with intelligent AI assistance to help patients access faster guidance, appointment support, and seamless medical communication.
                      </p>
                      <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium mt-4 sm:mt-6">
                        Our mission is to create a smarter and more connected healthcare experience for patients across West Bengal through premium AI-powered healthcare interactions and professional consultation support.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            } />
            <Route path="/pathology" element={<PathologyBooking />} />
            <Route path="/contact" element={<CTASection />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
      </main>
      {!isAdminPage && (
        <>
          <Footer />
          <Chatbot />
          <SupportHub />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}

