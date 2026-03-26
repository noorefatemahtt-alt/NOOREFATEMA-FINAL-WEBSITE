import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Plane, Menu, X, Phone, Globe, User, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { to: "/", label: t('nav.home'), end: true },
    { to: "/flights", label: t('nav.flights') },
    { to: "/hajj", label: t('nav.hajj') },
    { to: "/umrah", label: t('nav.umrah') },
    { to: "/hotels", label: t('nav.hotels') },
    { to: "/contact", label: t('nav.contact') },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a32303ad11bfd287ac4a11/bf4bfa049_OFFICELOGO.jpg" 
                alt="Noor e Fatema Logo" 
                className="h-12 w-auto rounded-lg shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-lg font-black text-primary leading-none tracking-tight">
                  NOOR E FATEMA
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  Hajj Kafela
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => 
                  cn(
                    "text-sm font-medium transition-colors",
                    isActive 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : "text-slate-600 hover:text-primary"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-6">
              <Globe className="h-4 w-4 text-slate-400" />
              <select 
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="text-sm font-medium text-slate-600 bg-transparent outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-600 font-medium">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm truncate max-w-[100px]">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  title={t('nav.logout')}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 text-slate-600 hover:text-primary font-medium">
                <User className="h-4 w-4" />
                <span>{t('nav.login')}</span>
              </Link>
            )}

            <a 
              href="tel:01842705790" 
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>01842705790</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 pb-6 px-4 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4 pt-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  cn(
                    "text-lg font-bold transition-colors py-2 border-b border-slate-50",
                    isActive ? "text-primary" : "text-slate-600"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            <div className="flex items-center justify-between py-4 border-b border-slate-50">
              <div className="flex items-center space-x-2 text-slate-600 font-bold">
                <Globe className="h-5 w-5 text-primary" />
                <span>{i18n.language === 'en' ? 'Language' : 'ভাষা'}</span>
              </div>
              <select 
                onChange={(e) => {
                  changeLanguage(e.target.value);
                  setIsOpen(false);
                }}
                value={i18n.language}
                className="text-sm font-bold text-primary bg-slate-50 px-3 py-1 rounded-lg outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>

            {user ? (
              <div className="flex flex-col space-y-4 py-4 border-b border-slate-50">
                <div className="flex items-center space-x-3 text-slate-600 font-bold">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span className="truncate">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 text-red-500 font-bold py-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 text-slate-600 hover:text-primary font-bold py-4 border-b border-slate-50"
              >
                <User className="h-5 w-5 text-primary" />
                <span>{t('nav.login')}</span>
              </Link>
            )}

            <a 
              href="tel:01842705790" 
              className="flex items-center justify-center space-x-3 bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20"
            >
              <Phone className="h-5 w-5" />
              <span>01842705790</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
