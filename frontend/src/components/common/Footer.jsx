import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-sky-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Logicwind</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Accelerating digital transformation with robust enterprise web apps, scalable cloud architectures, and dedicated technology consulting.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-mono text-[11px]">
                Note: Company-specific contact details below are editable placeholders.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-white transition-colors">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Capabilities */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Expertise</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Custom Web Development</li>
              <li>Cloud & DevOps Advisory</li>
              <li>Mobile App Engineering</li>
              <li>UI/UX Design Systems</li>
              <li>Security & QA Audits</li>
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact & Support</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <span>Tech Park, Gujarat, India (Placeholder)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>contact@logicwind.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>+91 (0) 555-019-2026</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Logicwind Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/help" className="hover:text-slate-400">
              Support Center
            </Link>
            <Link to="/about" className="hover:text-slate-400">
              Privacy & Transparency
            </Link>
            <Link to="/services" className="hover:text-slate-400">
              Service Level Commitments
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
