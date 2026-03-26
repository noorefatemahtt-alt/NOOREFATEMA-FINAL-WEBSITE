import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a32303ad11bfd287ac4a11/bf4bfa049_OFFICELOGO.jpg" 
                alt="Noor e Fatema Logo" 
                className="h-14 w-auto rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-lg font-black text-white leading-none tracking-tight">
                  NOOR E FATEMA
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Hajj Kafela
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted partner for spiritual journeys. We specialize in Hajj, Umrah, and premium travel services worldwide with a commitment to excellence and devotion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest border-l-4 border-primary pl-4">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/flights" className="hover:text-primary transition-colors">{t('nav.flights')}</Link></li>
              <li><Link to="/hajj" className="hover:text-primary transition-colors">{t('nav.hajj')}</Link></li>
              <li><Link to="/umrah" className="hover:text-primary transition-colors">{t('nav.umrah')}</Link></li>
              <li><Link to="/hotels" className="hover:text-primary transition-colors">{t('nav.hotels')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest border-l-4 border-primary pl-4">Our Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/visa" className="hover:text-primary transition-colors">{t('nav.visa')}</Link></li>
              <li><Link to="/flights" className="hover:text-primary transition-colors">Flight Booking</Link></li>
              <li><Link to="/hotels" className="hover:text-primary transition-colors">Hotel Reservation</Link></li>
              <li><Link to="/hajj" className="hover:text-primary transition-colors">Hajj Packages</Link></li>
              <li><Link to="/umrah" className="hover:text-primary transition-colors">Umrah Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest border-l-4 border-primary pl-4">Contact Info</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span className="text-slate-400">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <span className="text-slate-400">01842705790</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span className="text-slate-400 break-all">info@noorefatematravels.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Noore Fatema Travels. All rights reserved.</p>
          <div className="flex space-x-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
