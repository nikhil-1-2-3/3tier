import React from 'react';
import TiltCard from '../common/TiltCard';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const sampleTestimonials = [
    {
      id: 1,
      quote:
        'Logicwind delivered our cloud web portal on schedule. Their attention to database integrity, API security, and responsive UI components was evident across every sprint.',
      author: 'Alex Morgan (Sample Placeholder)',
      title: 'VP of Product, FinTech Enterprise',
      rating: 5,
    },
    {
      id: 2,
      quote:
        'The team took our initial concept and turned it into an intuitive digital experience. Booking consultations and reviewing project milestones was completely frictionless.',
      author: 'David Chen (Sample Placeholder)',
      title: 'Founder, Cloud Logistics Startup',
      rating: 5,
    },
    {
      id: 3,
      quote:
        'Technical competence paired with clear communication. Their implementation of relational database constraints and robust authentication exceeded our expectations.',
      author: 'Sarah Jenkins (Sample Placeholder)',
      title: 'Engineering Director, Healthcare Tech',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-[#070B14] text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
            Client Perspectives
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Trusted by Modern Product Teams
          </h2>
          <p className="text-sm text-slate-400">
            [Sample testimonial feedback below represents representative illustrative reviews]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleTestimonials.map((t) => (
            <TiltCard
              key={t.id}
              maxTilt={8}
              className="p-8 bg-white/[0.03] border border-white/10 hover:border-sky-400/40 rounded-2xl backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center text-sm border border-sky-400/30">
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-slate-400">{t.title}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
