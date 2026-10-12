import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, Code2, Users } from 'lucide-react';
import Button from '../common/Button';
import TiltCard from '../common/TiltCard';

export default function AboutSection() {
  const points = [
    'Clean, maintainable code architectures following industry best practices',
    'Agile iteration with transparent sprint deliverables and milestone tracking',
    'PostgreSQL & cloud-native security foundations designed to scale',
    'Dedicated engineering team committed to responsive client support',
  ];

  return (
    <section className="py-24 bg-[#070B14] text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
              Company Ethos
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Driving Digital Innovation with Passion and Precision
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              At Logicwind, we believe outstanding software is built at the intersection of technical excellence and authentic partnership. Our engineers and designers collaborate directly with your team to solve complex technical challenges and launch software that users love.
            </p>

            <ul className="space-y-3.5 pt-2">
              {points.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-400/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex gap-4">
              <Link to="/about">
                <Button variant="primary" size="md" icon={ArrowRight}>
                  Our Full Story & Team
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Holographic Stat Card */}
          <div className="lg:col-span-5">
            <TiltCard
              maxTilt={10}
              className="bg-gradient-to-br from-slate-900/90 to-[#0A1024]/90 p-8 sm:p-10 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl relative space-y-8"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="border-b border-white/10 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-brand-300">
                    100%
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
                    <Code2 className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mt-2">Full-Stack Capability</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Seamless synchronization between responsive React clients, Express APIs, and PostgreSQL.
                </p>
              </div>

              <div className="border-b border-white/10 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
                    Zero
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-400/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mt-2">Security Compromises</h4>
                <p className="text-xs text-slate-400 mt-1">
                  HttpOnly tokens, bcrypt password hashing, and endpoint rate limiting standard.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Traceable
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
                    <Cpu className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mt-2">Consultation Booking</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Self-service booking requests with unique references (`LW-BK-XXXXX`) and instant status tracking.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
