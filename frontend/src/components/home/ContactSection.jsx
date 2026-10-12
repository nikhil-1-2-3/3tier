import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Calendar, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import TiltCard from '../common/TiltCard';

export default function ContactSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#080E1E] to-[#050811] text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-900/90 via-[#0A1024]/90 to-slate-900/90 border border-white/10 rounded-3xl p-8 sm:p-14 backdrop-blur-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
                Start Your Journey
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Ready to Accelerate Your Digital Product?
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Schedule a consultation session with our technical team today or submit an enquiry through our support center. We're ready to bring your vision to life.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link to="/book">
                  <Button
                    size="lg"
                    variant="primary"
                    icon={Calendar}
                    className="w-full sm:w-auto shadow-[0_0_25px_-5px_#0284c7] hover:shadow-[0_0_35px_0px_#0284c7] font-semibold"
                  >
                    Book an Appointment
                  </Button>
                </Link>
                <Link to="/help">
                  <Button
                    size="lg"
                    variant="secondary"
                    icon={HelpCircle}
                    className="w-full sm:w-auto bg-white/[0.05] hover:bg-white/[0.1] text-white border-white/10"
                  >
                    Help & Enquiries
                  </Button>
                </Link>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="lg:col-span-5">
              <TiltCard
                maxTilt={8}
                className="bg-white/[0.03] rounded-2xl p-6 sm:p-8 border border-white/10 backdrop-blur-xl space-y-5"
              >
                <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Direct Contact Information</span>
                </h3>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 border border-sky-400/30">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-mono">Email Address</p>
                      <p className="font-semibold text-white">contact@logicwind.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 border border-indigo-400/30">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-mono">Direct Line</p>
                      <p className="font-semibold text-white">+91 (0) 555-019-2026</p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 border-t border-white/10 pt-3">
                  * Monitored Monday through Friday, 9:00 AM – 6:00 PM IST.
                </p>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
