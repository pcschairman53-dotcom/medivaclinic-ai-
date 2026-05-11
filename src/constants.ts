import { Heart, Shield, Zap, Clock, Users, Phone, MessageSquare, Microscope, Activity, LifeBuoy, ArrowRight, Menu, X, Check, Star, HelpCircle, Calendar, Send } from "lucide-react";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    title: "General Consultation",
    description: "Personalized medical advice and thorough check-ups with our expert general practitioners.",
    icon: Heart,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Cardiology",
    description: "Advanced heart care and diagnostics using state-of-the-art medical technology.",
    icon: Shield,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Pediatrics",
    description: "Specialized healthcare for infants, children, and adolescents in a friendly environment.",
    icon: Users,
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Diagnostic Imaging",
    description: "Precise X-rays, Ultrasounds, and standard imaging for accurate health assessments.",
    icon: Microscope,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "24/7 Support",
    description: "Immediate guidance and emergency consultation whenever you need it most.",
    icon: Clock,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Medical AI Lab",
    description: "Cutting-edge diagnostics powered by advanced artificial intelligence for early detection.",
    icon: Activity,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Pathology & Lab",
    description: "Comprehensive blood tests and laboratory analysis with digital report delivery.",
    icon: Microscope,
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "AI Symptom Screening",
    description: "Instant AI-powered symptom analysis to guide you to the right specialist immediately.",
    icon: Zap,
    color: "from-amber-500 to-orange-400",
  },
  {
    title: "Emergency Response",
    description: "Rapid medical coordination and emergency assistance available at all times.",
    icon: LifeBuoy,
    color: "from-rose-500 to-red-600",
  }
];

export const TESTIMONIALS = [
  {
    name: "Soumen Chakraborty",
    role: "Belgharia Patient",
    content: "The AI assistant made appointment booking very easy. The clinic support was fast, professional, and helpful.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=68"
  },
  {
    name: "Priyanka Sen",
    role: "Kolkata Resident",
    content: "I really liked the quick healthcare guidance and smooth consultation support. The experience felt modern and reliable.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=45"
  },
  {
    name: "Arijit Das",
    role: "Regular Patient",
    content: "Very responsive support system with easy WhatsApp communication and clean healthcare experience.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  }
];

export const FAQS = [
  {
    question: "How do I book an appointment?",
    answer: "You can book directly through our 'Book Appointment' button, use the Mediva AI assistant, or message us on WhatsApp for rapid scheduling."
  },
  {
    question: "Is online consultation available?",
    answer: "Yes, we offer both virtual consultations via secure video link and in-person visits at our futuristic healthcare facility."
  },
  {
    question: "How does the AI assistant work?",
    answer: "Our Mediva AI uses advanced diagnostics to analyze your symptoms and medical data, providing instant guidance before you speak with a human doctor."
  },
  {
    question: "Is my medical information secure?",
    answer: "Absolutely. We use enterprise-grade encryption and comply with global healthcare data standards to ensure your medical records remain 100% private."
  },
  {
    question: "How quickly will support respond?",
    answer: "Our AI assistant responds instantly. For human support via our Live Hub or WhatsApp, typical response times are under 5 minutes during business hours."
  },
  {
    question: "Can I contact on WhatsApp?",
    answer: "Yes, we have a dedicated WhatsApp line for quick queries, appointment updates, and direct communication with our medical concierge team."
  },
  {
    question: "What services are available?",
    answer: "We provide comprehensive care including General Consultation, Cardiology, Pediatrics, Diagnostic Imaging, and specialized AI-driven health screenings."
  }
];

export const PATHOLOGY_TESTS = [
  { id: "cbc", name: "CBC Test", price: "₹350", category: "Blood" },
  { id: "thyroid", name: "Thyroid Profile", price: "₹650", category: "Hormone" },
  { id: "diabetes", name: "Diabetes (HBA1C)", price: "₹450", category: "Blood" },
  { id: "lft", name: "Liver Function Test", price: "₹850", category: "Organ" },
  { id: "kft", name: "Kidney Function Test", price: "₹950", category: "Organ" },
  { id: "lipid", name: "Lipid Profile", price: "₹750", category: "Heart" },
  { id: "vitamin", name: "Vitamin B12 / D3", price: "₹1200", category: "Nutrient" },
  { id: "hormone", name: "Hormone Panel", price: "₹1500", category: "Hormone" },
  { id: "urine", name: "Urine Routine", price: "₹250", category: "Standard" },
  { id: "ecg", name: "ECG", price: "₹400", category: "Heart" },
  { id: "xray", name: "X-Ray", price: "₹600", category: "Imaging" },
  { id: "ultrasound", name: "Ultrasound", price: "₹1500", category: "Imaging" },
  { id: "mri", name: "MRI Scan", price: "₹5500", category: "Imaging" },
  { id: "ct", name: "CT Scan", price: "₹3500", category: "Imaging" },
  { id: "fullbody", name: "Full Body Checkup", price: "₹2999", category: "Package" }
];

export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxrFGJAIpNWOqPbV6p4rRB_QnUp-73SAyKX8MzqEe2eoNlqYYICONGT_gV4OAHqymSc/exec";
export const CLINIC_WHATSAPP = "+919330457995";
