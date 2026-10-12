import React from 'react';
import { Shield, Zap, Users, RefreshCw, Smartphone, Database } from 'lucide-react';
import TiltCard from '../common/TiltCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Rapid Prototyping & Delivery',
      description: 'Go from concept to production-ready MVP with agile sprints and continuous integration pipelines.',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-400/30',
    },
    {
      icon: Database,
      title: 'Relational Data Integrity',
      description: 'Strict schema migrations, normalized PostgreSQL models, and transactional reliability.',
      color: 'from-sky-500/20 to-brand-500/20 text-sky-400 border-sky-400/30',
    },
    {
      icon: Shield,
      title: 'Built-in Security Controls',
      description: 'End-to-end token verification, password salting, encrypted transmission, and API rate protection.',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-400/30',
    },
    {
      icon: Users,
      title: 'Direct Engineer Access',
      description: 'Communicate directly with senior engineers and architects rather than account intermediaries.',
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-400/30',
    },
    {
      icon: Smartphone,
      title: 'Cross-Device Responsiveness',
      description: 'Pixel-perfect mobile, tablet, and desktop viewports optimized for performance and accessibility.',
      color: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-400/30',
    },
    {
      icon: RefreshCw,
      title: 'Lifecycle Support & Evolution',
      description: 'Ongoing technical audits, infrastructure scaling, and feature iterations post-launch.',
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-400/30',
    },
  ];

  return (
    <section className="py-24 bg-[#080E1E] text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
            Why Partner with Logicwind
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineering Built for Growth and Longevity
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Every layer of our software architecture is designed with performance, maintainability, and user delight in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <TiltCard
                key={idx}
                maxTilt={8}
                className="p-7 bg-white/[0.03] border border-white/10 hover:border-sky-400/40 rounded-2xl backdrop-blur-xl shadow-lg transition-colors group space-y-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${f.color} flex items-center justify-center border group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">{f.description}</p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
