import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../constants";

export default function Testimonials() {
  return (
    <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4 max-w-2xl">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Patient Stories</h4>
            <h2 className="text-5xl md:text-6xl font-black font-display tracking-tight text-slate-900 leading-tight">
              What our patients <br />
              <span className="gradient-text italic">are saying</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="flex -space-x-4">
              {TESTIMONIALS.map((t, i) => (
                <img key={i} src={t.avatar} className="w-12 h-12 rounded-full border-4 border-slate-50" />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-bold">4.9/5 Average</div>
              <div className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">From 2,000+ reviews</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="glass p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative group hover:shadow-[0_40px_100px_rgba(14,165,233,0.15)] transition-all duration-500 border border-slate-100"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-primary/5">
                <Quote size={24} />
              </div>
              
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#FFB800" color="#FFB800" className="drop-shadow-sm" />
                ))}
              </div>

              <p className="text-lg text-slate-700 italic leading-relaxed mb-10 font-medium">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-5 border-t border-slate-50 pt-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={testimonial.avatar} alt={testimonial.name} className="relative w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 tracking-tight">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>

              {/* Decorative background glow on hover */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
