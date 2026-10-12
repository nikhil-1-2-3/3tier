import React, { useState } from 'react';
import { Layers, Database, Cloud, ShieldCheck, Zap, Server, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from '../common/TiltCard';
import Button from '../common/Button';

export default function ArchitectureBlueprint3D() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    {
      id: 0,
      title: 'Layer 1: Modern Client Experience',
      tag: 'Presentation Tier',
      icon: Layers,
      color: 'from-sky-500 to-brand-600',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
      specs: [
        { label: 'Core Framework', value: 'React 18 + Vite / Next.js' },
        { label: 'Styling & Tokens', value: 'Tailwind CSS Modern Tokens' },
        { label: 'Accessibility', value: 'WCAG 2.1 AA Compliance' },
        { label: 'Lighthouse Score', value: '98+ Performance Standard' },
      ],
      description:
        'Decoupled, responsive presentation tier featuring fluid micro-animations, accessible DOM hierarchies, and instant client-side transitions.',
    },
    {
      id: 1,
      title: 'Layer 2: High-Throughput REST & Auth APIs',
      tag: 'Application Tier',
      icon: Server,
      color: 'from-brand-500 to-indigo-600',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
      specs: [
        { label: 'Runtime Engine', value: 'Node.js & Express Architecture' },
        { label: 'Authentication', value: 'HttpOnly JWT + bcrypt Salting' },
        { label: 'Defensive Controls', value: 'Rate Limiting & Input Sanitization' },
        { label: 'Average Latency', value: '< 25ms Internal Routing' },
      ],
      description:
        'Robust middleware layer enforcing role-based permissions, rate protection against brute force, and clean RESTful controllers.',
    },
    {
      id: 2,
      title: 'Layer 3: Relational Persistence with Prisma',
      tag: 'Data Tier',
      icon: Database,
      color: 'from-indigo-500 to-purple-600',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      specs: [
        { label: 'Primary Engine', value: 'PostgreSQL 16 Relational DB' },
        { label: 'ORM & Migrations', value: 'Prisma Client Schema Tracking' },
        { label: 'Data Guarantees', value: 'ACID Transactions & Foreign Keys' },
        { label: 'Query Safety', value: 'Parameterized SQL Injection Defense' },
      ],
      description:
        'Strictly normalized relational tables supporting unique constraints, indexes for query performance, and audit trail retention.',
    },
    {
      id: 3,
      title: 'Layer 4: Cloud-Ready Orchestration',
      tag: 'DevOps & Infrastructure Tier',
      icon: Cloud,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      specs: [
        { label: 'Containerization', value: 'Multi-stage Docker & Alpine' },
        { label: 'Service Topology', value: 'Docker Compose with Health Pings' },
        { label: 'Cloud Portability', value: 'AWS EKS / ECS / RDS Ready' },
        { label: 'Uptime SLA', value: 'Designed for 99.95% Availability' },
      ],
      description:
        'Decoupled container blueprints ready for cloud deployment, automated health restarts, and isolated environment variables.',
    },
  ];

  const current = layers[activeLayer];
  const Icon = current.icon;

  return (
    <section className="py-24 bg-gradient-to-b from-[#070B14] via-[#0B132B] to-[#070B14] text-white relative overflow-hidden border-t border-b border-white/[0.08]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-400/30 text-brand-400 text-xs font-bold tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Architecture Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Designed with Layered{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              Enterprise Rigor
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Click through our 4-tier stack architecture below to inspect how each subsystem operates with isolation, security, and scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Layer Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((l, idx) => {
              const LIcon = l.icon;
              const isActive = activeLayer === idx;
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveLayer(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? 'bg-white/[0.08] border-brand-400/50 shadow-lg shadow-brand-500/10 backdrop-blur-xl translate-x-2'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? `bg-gradient-to-tr ${l.color} text-white shadow-md`
                          : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <LIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-mono text-slate-400">
                        {l.tag}
                      </div>
                      <div
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isActive ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {l.title.split(':')[1] || l.title}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      isActive ? 'bg-sky-400 shadow-[0_0_12px_#38bdf8]' : 'bg-slate-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 3D Glass Inspector Card */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={8}
              className="p-8 sm:p-10 bg-slate-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-tr ${current.color} text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${current.badgeColor}`}>
                      {current.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{current.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE & HEALTHY</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                {current.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {current.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="text-[11px] font-mono text-slate-400">{spec.label}</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Production standard tested against OWASP Top 10</span>
                </div>
                <Link to="/book">
                  <Button variant="primary" size="sm" icon={ArrowRight}>
                    Consult With Lead Architect
                  </Button>
                </Link>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
