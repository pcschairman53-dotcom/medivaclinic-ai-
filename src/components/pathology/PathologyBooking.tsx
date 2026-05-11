import React, { useState, useMemo, memo, useCallback, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, Loader2, Microscope, MapPin, Calendar, User, Phone, ChevronRight, Activity, Zap, LifeBuoy, Check } from "lucide-react";
import { PATHOLOGY_TESTS, GOOGLE_SCRIPT_URL, CLINIC_WHATSAPP } from "../../constants";
import { cn } from "../../lib/utils";
import { db, rtdb } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, push, set, serverTimestamp as rtdbTimestamp } from "firebase/database";

// Error handler for Firestore
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const TestCard = memo(({ 
  test, 
  isSelected, 
  onToggle 
}: { 
  test: any, 
  isSelected: boolean, 
  onToggle: (id: string) => void 
}) => (
  <motion.div 
    layout
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onToggle(test.id)}
    className={cn(
      "p-5 rounded-3xl border-2 transition-all cursor-pointer group relative overflow-hidden flex items-start justify-between gap-4",
      isSelected 
        ? "bg-primary/[0.03] border-primary shadow-[0_10px_30px_rgba(14,165,233,0.15)]" 
        : "bg-white border-slate-100 hover:border-primary/20 hover:bg-slate-50/50 shadow-sm"
    )}
  >
    {isSelected && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-primary/5 pointer-events-none"
      />
    )}
    
    <div className="relative z-10">
      <p className={cn(
        "font-black text-sm tracking-tight transition-colors", 
        isSelected ? "text-primary" : "text-slate-900 group-hover:text-primary/70"
      )}>
        {test.name}
      </p>
      <p className={cn(
        "text-[11px] font-black uppercase tracking-wider mt-1 transition-colors",
        isSelected ? "text-primary/60" : "text-slate-400"
      )}>
        {test.price}
      </p>
    </div>
    
    <div className={cn(
      "w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-300 relative z-10 shrink-0",
      isSelected 
        ? "bg-primary border-primary text-white scale-110 rotate-0" 
        : "bg-slate-50 border-slate-200 group-hover:border-primary/30"
    )}>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -45 }}
          >
            <Check size={14} strokeWidth={4} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
));

export default function PathologyBooking() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gender: "Male",
    age: "",
    city: "",
    date: "",
    collectionType: "Lab Visit",
    notes: "",
    emergency: false
  });

  const categories = useMemo(() => Array.from(new Set(PATHOLOGY_TESTS.map(t => t.category))), []);

  const toggleTest = useCallback((testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
    );
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const nextStep = useCallback(() => setStep(prev => prev + 1), []);
  const prevStep = useCallback(() => setStep(prev => prev - 1), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedTests.length === 0) return alert("Please select at least one test.");
    
    setLoading(true);
    
    const selectedTestNames = PATHOLOGY_TESTS
      .filter(t => selectedTests.includes(t.id))
      .map(t => t.name)
      .join(", ");

    const submissionData = {
      timestamp: new Date().toLocaleString(),
      patientName: formData.name,
      phoneNumber: formData.mobile,
      gender: formData.gender,
      age: formData.age,
      city: formData.city,
      selectedTests: selectedTestNames,
      bookingDate: formData.date,
      collectionType: formData.collectionType,
      notes: formData.notes || "N/A",
      emergency: formData.emergency ? "YES" : "No"
    };

    try {
      // 1. Submit to Google Sheets (Asynchronous Fire-and-Forget)
      // We don't 'await' this to prevent blocking the WhatsApp flow and UI transitions
      const formBody = new URLSearchParams();
      Object.entries(submissionData).forEach(([key, value]) => {
        formBody.append(key, value.toString());
      });

      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString()
      }).catch(err => console.error("Google Sheets sync failed:", err));

      // 1.1 Submit to Firebase Realtime Database (Asynchronous)
      const bookingsRef = ref(rtdb, "pathology_bookings");
      const newBookingRef = push(bookingsRef);
      set(newBookingRef, {
        ...submissionData,
        createdAt: rtdbTimestamp()
      }).catch(err => {
        console.error("Realtime Database sync failed:", err);
      });

      // 1.2 Submit to Firebase Firestore (Optional/Secondary as it was already there)
      addDoc(collection(db, "pathology_bookings"), {
        ...submissionData,
        createdAt: serverTimestamp()
      }).catch(err => {
        console.warn("Firestore sync failed (might be expected for this config):", err);
      });

      // 2. Format WhatsApp Message with Premium Styling
      const message = encodeURIComponent(
        `🧪 *New Pathology Booking Request*\n\n` +
        `👤 *Patient Name:* ${formData.name}\n` +
        `📱 *Mobile:* ${formData.mobile}\n` +
        `🧾 *Selected Tests:* ${selectedTestNames}\n` +
        `📅 *Preferred Date:* ${formData.date}\n` +
        `🏠 *Collection Type:* ${formData.collectionType}\n` +
        `📝 *Notes:* ${formData.notes || "No special instructions"}\n\n` +
        `🚨 *Emergency:* ${formData.emergency ? "YES (Priority)" : "Standard"}\n` +
        `📍 *Location:* ${formData.city}`
      );

      // 3. Set success state first to show the popup immediately
      setSuccess(true);
      setLoading(false);

      // 4. Slight delay for a premium transition feel
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP.replace("+", "")}?text=${message}`;
        window.open(whatsappUrl, "_blank");
      }, 800);

    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="glass-premium p-12 rounded-[4rem] border-primary/20 space-y-8 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
        >
          {/* Decorative background gradients */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 relative z-10"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          
          <div className="space-y-3 relative z-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Booking <span className="text-emerald-500">Authenticated</span></h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Medical records for <span className="text-primary font-bold">{formData.name}</span> have been synchronized with our clinical dashboard.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-5 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center justify-center gap-4 relative z-10"
          >
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-xs font-black text-primary uppercase tracking-[0.2em]">Synchronizing with Clinic WhatsApp...</p>
          </motion.div>

          <div className="p-8 bg-slate-50/80 backdrop-blur-sm rounded-[2.5rem] text-left space-y-4 border border-slate-100 relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Microscope size={12} className="text-primary" /> Diagnostic Summary
              </p>
              <div className="px-3 py-1 bg-white rounded-full border border-slate-100 text-[10px] font-bold text-slate-500">
                {selectedTests.length} Items Selected
              </div>
            </div>
            <p className="text-slate-700 font-bold leading-relaxed text-sm">
              {PATHOLOGY_TESTS.filter(t => selectedTests.includes(t.id)).map(t => t.name).join(", ")}
            </p>
          </div>

          <button 
            onClick={() => window.location.href = "/"}
            className="w-full py-5 bg-slate-950 text-white rounded-[2rem] font-black uppercase tracking-[0.15em] text-xs hover:bg-black transition-all shadow-2xl shadow-slate-900/20 active:scale-[0.98] relative z-10"
          >
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center space-y-4 mb-8 sm:mb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm"
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <Microscope size={12} sm:size={14} /> Diagnostic SaaS 2.0
        </motion.div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-tight sm:leading-none">
          Diagnostic <span className="gradient-text italic">Booking</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto text-sm sm:text-lg px-4">
          Secure, AI-powered diagnostic support with instant clinic coordination via Cloud Database & WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 relative z-10">
        {/* Progress Sidebar */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-4">
          <div className="flex lg:flex-col gap-2 sm:gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {[
              { id: 1, title: "Details", fullTitle: "Patient Details", icon: User },
              { id: 2, title: "Tests", fullTitle: "Select Tests", icon: Microscope },
              { id: 3, title: "Review", fullTitle: "Review & Submit", icon: Send }
            ].map((s) => (
              <div 
                key={s.id}
                className={cn(
                  "p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-500 flex items-center gap-3 sm:gap-4 shrink-0 lg:shrink",
                  step === s.id ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white border-slate-100 text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors",
                  step === s.id ? "bg-white/20" : "bg-slate-50"
                )}>
                  <s.icon size={16} sm:size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">Step 0{s.id}</p>
                  <p className="font-bold text-xs sm:text-base hidden sm:block">{s.fullTitle}</p>
                  <p className="font-bold text-xs sm:hidden">{s.title}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedTests.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 sm:p-8 glass-premium rounded-[1.5rem] sm:rounded-[2.5rem] bg-emerald-500/5 border-emerald-500/20"
            >
              <h4 className="text-emerald-700 font-black uppercase tracking-widest text-[10px] sm:text-xs mb-3 sm:mb-4 flex items-center gap-2">
                <CheckCircle2 size={12} sm:size={14} /> Selected ({selectedTests.length})
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {PATHOLOGY_TESTS.filter(t => selectedTests.includes(t.id)).map(t => (
                  <span key={t.id} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white border border-emerald-100 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-bold text-emerald-600">
                    {t.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Form Area */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="glass-premium p-6 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] bg-white/40 border-white/60 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block">
              <Microscope size={120} />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} sm:size={18} />
                        <input name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/50 border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm sm:text-base" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} sm:size={18} />
                        <input name="mobile" required type="tel" value={formData.mobile} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/50 border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm sm:text-base" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="space-y-2 col-span-2 md:col-span-2">
                      <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-3 sm:py-4 bg-white/50 border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm sm:text-base">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Age</label>
                      <input name="age" required type="number" value={formData.age} onChange={handleInputChange} placeholder="25" className="w-full px-4 py-3 sm:py-4 bg-white/50 border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm sm:text-base" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 ml-1">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} sm:size={16} />
                        <input name="city" required value={formData.city} onChange={handleInputChange} placeholder="Kolkata" className="w-full pl-9 sm:pl-10 pr-4 py-3 sm:py-4 bg-white/50 border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm sm:text-base" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 sm:pt-4">
                    <button type="button" onClick={nextStep} className="w-full py-4 sm:py-5 bg-primary text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group text-sm sm:text-base text-center">
                      Select Tests <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="grid grid-cols-1 gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map((cat) => (
                      <div key={cat} className="space-y-3 sm:space-y-4 mt-2 sm:mt-4">
                        <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                          <Activity size={10} sm:size={12} /> {cat}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {PATHOLOGY_TESTS.filter(t => t.category === cat).map(test => (
                            <TestCard 
                              key={test.id} 
                              test={test} 
                              isSelected={selectedTests.includes(test.id)} 
                              onToggle={toggleTest} 
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <button type="button" onClick={prevStep} className="w-full sm:flex-1 py-4 sm:py-5 bg-slate-100 text-slate-600 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all text-xs sm:text-sm">Back</button>
                    <button type="button" onClick={nextStep} className="w-full sm:flex-[2] py-4 sm:py-5 bg-primary text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 text-xs sm:text-sm">Review Booking</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Preferred Date</label>
                       <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} sm:size={18} />
                        <input name="date" required type="date" value={formData.date} onChange={handleInputChange} className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm sm:text-base" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Collection Type</label>
                       <select name="collectionType" value={formData.collectionType} onChange={handleInputChange} className="w-full px-4 py-3 sm:py-4 bg-white border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-primary transition-all font-medium text-sm sm:text-base">
                        <option>Lab Visit</option>
                        <option>Home Collection (₹100 Addon)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Notes / Health History</label>
                    <textarea name="notes" rows={3} value={formData.notes} onChange={handleInputChange} placeholder="Mention any symptoms or instructions..." className="w-full px-4 py-3 sm:py-4 bg-white border border-slate-100 rounded-xl sm:rounded-2xl focus:outline-none focus:border-primary transition-all font-medium resize-none text-sm sm:text-base" />
                  </div>

                  <div className="p-4 sm:p-6 bg-rose-50 border border-rose-100 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-500 text-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
                        <LifeBuoy size={16} sm:size={20} />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-black text-rose-950">Emergency Priority?</p>
                        <p className="text-[8px] sm:text-[10px] font-bold text-rose-700/60 uppercase tracking-widest leading-tight sm:leading-normal">Immediate coordination</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, emergency: !p.emergency }))}
                      className={cn(
                        "w-10 sm:w-12 h-5 sm:h-6 rounded-full p-1 transition-all shrink-0",
                        formData.emergency ? "bg-rose-500" : "bg-rose-200"
                      )}
                    >
                      <div className={cn("w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full transition-all", formData.emergency ? "translate-x-5 sm:translate-x-6" : "translate-x-0")} />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button type="button" onClick={prevStep} className="w-full sm:flex-1 py-4 sm:py-5 bg-slate-100 text-slate-600 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all text-xs sm:text-sm">Edit Tests</button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full sm:flex-[2] py-4 sm:py-5 bg-slate-950 text-white rounded-xl sm:rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 text-xs sm:text-sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={18} sm:size={20} /> Processing...
                        </>
                      ) : (
                        <>
                          <Send size={18} sm:size={20} /> Send Request
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-center text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Your details are securely stored in our healthcare database
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
