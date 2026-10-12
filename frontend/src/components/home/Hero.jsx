import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers, Server, Activity, ArrowUpRight } from 'lucide-react';
import Button from '../common/Button';
import Hero3DCanvas from './Hero3DCanvas';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060913] via-[#0A1024] to-[#070B14] text-white pt-16 pb-24 sm:pt-20 sm:pb-32">
      {/* 3D Ambient lighting mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-brand-500/15 via-sky-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 left-10 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Vision, Value & CTA */}
          <div className="lg:col-span-7 space-y-8 z-10">
            {/* Holographic Glowing Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-xs font-mono font-medium tracking-wide text-sky-300 uppercase">
                Digital Engineering & High-Velocity Product Studio
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Architecting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-brand-300 to-indigo-400">
                Resilient Digital
              </span>{' '}
              Products with 3D Depth
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Logicwind crafts enterprise-grade web applications, cloud-native microservices, and human-centered user experiences backed by robust PostgreSQL relational integrity.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link to="/book">
                <Button
                  size="lg"
                  variant="primary"
                  icon={ArrowRight}
                  className="w-full sm:w-auto shadow-[0_0_30px_-5px_#0284c7] hover:shadow-[0_0_40px_0px_#0284c7] font-semibold text-base px-7 py-4"
                >
                  Schedule Technical Consultation
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/15 backdrop-blur-lg font-semibold text-base px-6 py-4"
                >
                  Explore Capabilities
                </Button>
              </Link>
            </div>

            {/* Live Metrics Ticker Bar */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.98%</div>
                <div className="text-xs text-slate-400 mt-1">Platform Uptime</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">&lt; 30ms</div>
                <div className="text-xs text-slate-400 mt-1">Target API Latency</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 mt-1">Relational Integrity</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Interactive Stage */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient circular backdrop */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-600/20 via-sky-500/10 to-indigo-500/20 blur-3xl" />

            {/* 3D Canvas element */}
            <div className="w-full relative z-10">
              <Hero3DCanvas />

              {/* Floating 3D Glass HUD Badge: Top Left */}
              <div className="absolute -top-4 -left-4 sm:top-2 sm:left-2 p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-bounce [animation-duration:5s] pointer-events-none">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Database Engine</div>
                  <div className="text-xs font-bold text-white">PostgreSQL 16 • ACID Active</div>
                </div>
              </div>

              {/* Floating 3D Glass HUD Badge: Bottom Right */}
              <div className="absolute -bottom-6 -right-2 sm:bottom-4 sm:right-0 p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-bounce [animation-duration:6s] pointer-events-none">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-400/30">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Microservice Cluster</div>
                  <div className="text-xs font-bold text-white">Docker & Cloud Orchestrated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
