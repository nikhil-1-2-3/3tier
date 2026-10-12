import React from 'react';
import Card from '../components/common/Card';
import { Sparkles, Code, Cpu, Shield, Users, HeartHandshake, Award } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Code,
      title: 'Craftsmanship & Clean Code',
      description: 'We believe code is an asset that must remain easy to read, refactor, and maintain for years to come.',
    },
    {
      icon: HeartHandshake,
      title: 'Transparent Collaboration',
      description: 'No hidden layers. Our clients have direct visibility into commits, architecture decisions, and task progression.',
    },
    {
      icon: Shield,
      title: 'Security-First Defaults',
      description: 'From parameter sanitization to cookie flags and rate limiting, we implement defensive engineering at every layer.',
    },
    {
      icon: Cpu,
      title: 'Scalable System Design',
      description: 'We build for today while establishing decoupled architectures ready for future containerization and cloud migrations.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
          Our Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Engineering Thoughtful Digital Solutions at Logicwind
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Logicwind was founded on the conviction that high-impact software development requires both rigorous engineering fundamentals and deep client collaboration.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 space-y-4 bg-gradient-to-br from-brand-50/50 to-white">
          <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To empower enterprises, founders, and growing businesses by architecting dependable digital platforms, web applications, and cloud infrastructures that solve real-world problems and stand the test of time.
          </p>
        </Card>

        <Card className="p-8 space-y-4 bg-gradient-to-br from-sky-50/50 to-white">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To be a globally recognized technology partner known for transparent delivery, technical excellence, and sustainable digital products that balance aesthetic beauty with high throughput and bulletproof reliability.
          </p>
        </Card>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Core Engineering Principles</h3>
          <p className="text-sm text-slate-500">How we approach design, development, and delivery every single day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <Card key={idx} hoverEffect className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Company Verification Note */}
      <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-3">
        <Users className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <div>
          <span className="font-semibold text-slate-700">Transparency Notice:</span> This company profile contains editable placeholder information. Any specific client names, official certifications, or corporate registrations will be updated upon final verification.
        </div>
      </div>
    </div>
  );
}
