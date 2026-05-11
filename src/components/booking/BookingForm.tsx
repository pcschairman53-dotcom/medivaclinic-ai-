import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, User, Phone, ClipboardList, Clock, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft, MessageCircle } from "lucide-react";
import { submitToSheets } from "../../services/sheets";
import { cn } from "../../lib/utils";
import confetti from "canvas-confetti";

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    problem: "",
    appointmentTime: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitToSheets({
        ...formData,
        source: "Multi-Step Booking Form"
      });
      setSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#8b5cf6', '#22d3ee']
      });
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center gradient-bg">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full glass p-12 rounded-[2.5rem] text-center space-y-6 shadow-2xl border-white"
        >
          <div className="w-20 h-20 bg-green-500 rounded-3xl mx-auto flex items-center justify-center text-white shadow-lg shadow-green-500/20">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black font-display tracking-tight">Booking Received!</h2>
          <p className="text-slate-600">
            Thank you, {formData.name}. Our clinic team will call you at {formData.phone} within 1 hour to confirm your slot.
          </p>
          <div className="space-y-3">
            <a 
              href="https://wa.me/919330457995?text=Hello%20Mediva%20Clinic%20AI,%20I%20just%20booked%20an%20appointment%20online%20and%20would%20like%20to%20confirm."
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold hover:bg-[#20bd5a] transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
            <button 
              onClick={() => window.location.href = "/"}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 gradient-bg">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Info Side */}
        <div className="md:col-span-2 space-y-8 pt-8">
          <div>
            <h2 className="text-4xl font-black font-display tracking-tight leading-tight">
              Ready to <span className="gradient-text italic">Feel Better?</span>
            </h2>
            <p className="text-slate-600 mt-4">
              Schedule your consultation in 60 seconds. Our team is ready to guide you to optimal health.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: CheckCircle2, text: "Instant Priority Booking" },
              { icon: CheckCircle2, text: "Top Rated Medical Professionals" },
              { icon: CheckCircle2, text: "Free Diagnostic Pre-Screening" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-800">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <item.icon size={20} />
                </div>
                {item.text}
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-950 rounded-3xl text-white shadow-2xl shadow-slate-900/30">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Need Urgent Help?</h4>
            <div className="text-2xl font-black">+1 (555) HEALTH-911</div>
            <p className="text-xs opacity-60 mt-1 uppercase tracking-tighter">Emergency support available 24/7</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:col-span-3">
          <div className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border-white">
            {/* Step Progress */}
            <div className="flex gap-2 mb-10">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={cn(
                    "flex-1 h-1.5 rounded-full transition-all duration-500",
                    step >= s ? "bg-primary" : "bg-slate-200"
                  )}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <User size={14} /> Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <Phone size={14} /> Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (000) 000-0000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <ClipboardList size={14} /> What's the main concern?
                      </label>
                      <textarea
                        required
                        name="problem"
                        rows={5}
                        value={formData.problem}
                        onChange={handleChange}
                        placeholder="Briefly describe your symptoms or reason for visit..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <Clock size={14} /> Preferred Appointment Time
                      </label>
                      <input
                        required
                        type="text"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        placeholder="e.g., Tomorrow at 10:00 AM"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={step === 1 ? (!formData.name || !formData.phone) : (!formData.problem)}
                    className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !formData.appointmentTime}
                    className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Book Now"} <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
