import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, Sparkles, User } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-sky-400 font-semibold drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]'
        : 'text-slate-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#070B14]/80 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_20px_-3px_rgba(2,132,199,0.5)] group-hover:scale-105 group-hover:shadow-[0_0_25px_0px_rgba(56,189,248,0.7)] transition-all duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                Logicwind
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 -mt-1">
                Digital Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/book" className={navLinkClass}>
              Book Consultation
            </NavLink>
            <NavLink to="/help" className={navLinkClass}>
              Help & FAQ
            </NavLink>
            {user && (
              <NavLink to="/my-bookings" className={navLinkClass}>
                My Bookings
              </NavLink>
            )}
            {user?.role === 'ADMIN' && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-xs font-mono font-bold px-2.5 py-1 rounded-full border transition-all ${
                    isActive
                      ? 'bg-rose-500/20 text-rose-300 border-rose-400/50 shadow-[0_0_10px_#f43f5e]'
                      : 'bg-white/[0.05] text-rose-400 border-rose-400/30 hover:bg-rose-500/10'
                  }`
                }
              >
                Admin Console
              </NavLink>
            )}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 pl-2 text-sm text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold text-xs border border-sky-400/30">
                    {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                  </div>
                  <span className="font-semibold text-slate-200 max-w-[120px] truncate">
                    {user.fullName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  icon={LogOut}
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    className="shadow-[0_0_15px_-3px_#0284c7] hover:shadow-[0_0_20px_0px_#0284c7]"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0A1024] px-4 pt-2 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Services
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              About
            </Link>
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Book Consultation
            </Link>
            <Link
              to="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Help & FAQ
            </Link>
            {user && (
              <Link
                to="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              >
                My Bookings
              </Link>
            )}
            {user?.role === 'ADMIN' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-bold text-rose-400 bg-rose-500/10 border border-rose-400/20"
              >
                Admin Command Console
              </Link>
            )}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            {user ? (
              <>
                <div className="px-3 py-2 text-xs text-slate-400 font-medium">
                  Signed in as <span className="font-bold text-white">{user.email}</span>
                </div>
                <Button variant="outline" size="md" onClick={handleLogout} icon={LogOut} className="w-full text-slate-300 border-white/20">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full text-slate-300 border-white/20">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
