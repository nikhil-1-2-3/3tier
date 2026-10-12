import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Smartphone,
  Palette,
  Cloud,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import TiltCard from '../common/TiltCard';

const ICON_MAP = {
  Code2: Code2,
  Smartphone: Smartphone,
  Palette: Palette,
  Cloud: Cloud,
  Cpu: Cpu,
  ShieldCheck: ShieldCheck,
};

export default function ServiceCard({ service }) {
  const IconComponent = ICON_MAP[service.icon] || Sparkles;

  return (
    <TiltCard
      maxTilt={10}
      className="bg-[#0D1527]/90 border border-white/10 hover:border-sky-400/50 p-7 flex flex-col justify-between h-full group shadow-xl hover:shadow-[0_10px_35px_-10px_rgba(2,132,199,0.3)] transition-all duration-300 backdrop-blur-xl"
    >
      <div>
        {/* Header Icon & Category Tag */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-brand-600/30 to-sky-400/20 text-sky-400 border border-sky-400/30 flex items-center justify-center p-3 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-md">
            <IconComponent className="w-7 h-7" />
          </div>

          {service.category && (
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-white/[0.05] text-sky-300 border border-white/10 group-hover:border-sky-400/30 transition-colors">
              {service.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors mb-3 leading-snug">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      {/* Footer CTA */}
      <div className="pt-5 border-t border-white/10 flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Practice</span>
        </span>

        <Link
          to={`/book?serviceId=${service.id}`}
          className="inline-flex items-center text-sm font-semibold text-sky-400 group-hover:text-sky-300 gap-2 transition-colors"
        >
          <span>Book Session</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </TiltCard>
  );
}
