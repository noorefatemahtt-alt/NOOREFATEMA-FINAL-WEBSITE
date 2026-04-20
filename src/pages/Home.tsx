import { useNavigate } from 'react-router-dom';
import FlightSearch from '../components/FlightSearch';
import { ChevronRight, Globe, MapPin, Star, Headphones, ShieldCheck, Share2, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'bn';
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] md:h-[700px] w-full overflow-hidden flex items-center"
        style={{ fontSize: '16px' }}
      >
        <img 
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2000" 
          alt="Kaaba Pilgrimage"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        
        <div 
          className="relative max-w-7xl mx-auto px-4 w-full flex flex-col justify-center items-center text-center"
          style={{ paddingLeft: '0px', paddingRight: '0px', width: '1000px', height: '600px' }}
        >
          <h1 
            className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight leading-tight"
            style={{ color: '#078707', marginTop: '0px', marginBottom: '0px', width: '800.729px', height: '79px', borderStyle: 'solid' }}
          >
            {t('hero.title')}
          </h1>
          <p 
            className="text-lg md:text-2xl text-white/95 max-w-3xl mx-auto font-medium drop-shadow-lg mb-12 leading-relaxed"
            style={{ marginLeft: '0px', height: '50px', marginTop: '-5px', marginBottom: '5px', fontSize: '19px', width: '777px', marginRight: '0px', lineHeight: '19px', textAlign: 'center', paddingLeft: '0px', paddingTop: '9px', paddingBottom: '9px', color: '#ffffff', borderRadius: '0px', borderWidth: '0px', textDecorationLine: 'none' }}
          >
            {t('hero.subtitle')}
          </p>

          {/* Search Engine */}
          <div 
            className="w-full max-w-5xl mx-auto"
            style={{ marginLeft: '0px', marginRight: '0px', paddingLeft: '31px', paddingTop: '15px' }}
          >
            <div 
              className="bg-white/10 backdrop-blur-md p-2 rounded-3xl shadow-2xl border border-white/20"
              style={{ height: '484px', width: '935px', marginTop: '-15px' }}
            >
              <FlightSearch compact />
            </div>
          </div>
        </div>
      </div>

      {/* Live Flight Tracking */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center">
            <Globe className="h-8 w-8 text-primary mr-3" />
            {isBn ? 'লাইভ ফ্লাইট ট্র্যাকিং' : 'Live Flight Tracking'}
          </h2>
          <div className="h-1.5 w-24 bg-primary mt-3 rounded-full" />
          <p className="text-slate-500 mt-4 text-lg">
            {isBn ? 'বাংলাদেশের আকাশসীমার ফ্লাইটগুলো রিয়েল-টাইমে ট্র্যাক করুন' : 'Track flights in Bangladesh airspace in real-time'}
          </p>
        </div>
        <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative group">
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-0">
            <div className="animate-pulse flex flex-col items-center">
              <Globe className="h-10 w-10 text-slate-300 mb-2 animate-spin-slow" />
              <span className="text-slate-400 font-medium">{isBn ? 'রাডার লোড হচ্ছে...' : 'Loading Radar...'}</span>
            </div>
          </div>
          <iframe 
            src="https://globe.adsbexchange.com/?lat=23.8103&lon=90.4125&zoom=7.2" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            title="Live Flight Tracker"
            className="absolute inset-0 z-10"
          ></iframe>
        </div>
      </section>

      {/* Featured Packages (Hajj & Umrah) */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Featured Packages</h2>
            <div className="h-1.5 w-24 bg-primary mt-3 rounded-full" />
            <p className="text-slate-500 mt-4 text-xl">Spiritual journeys crafted with care and devotion</p>
          </div>
          <button 
            onClick={() => navigate('/hajj')}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-black flex items-center transition-all shadow-xl hover:shadow-primary/20"
          >
            Explore All <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              name: 'Premium Hajj Package', 
              type: 'Hajj', 
              price: '8,50,000', 
              img: 'https://images.unsplash.com/photo-1565035010268-a3816f98589a?auto=format&fit=crop&q=80&w=800',
              features: ['5-Star Hotels', 'VIP Transport', 'Expert Guidance']
            },
            { 
              name: 'Standard Hajj Package', 
              type: 'Hajj', 
              price: '7,20,000', 
              img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800',
              features: ['4-Star Hotels', 'Group Transport', 'Guided Tours']
            },
            { 
              name: 'Economy Hajj Package', 
              type: 'Hajj', 
              price: '6,00,000', 
              img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
              features: ['Standard Hotels', 'Shared Transport', 'Basic Guidance']
            },
            { 
              name: 'Premium Umrah Package', 
              type: 'Umrah', 
              price: '2,20,000', 
              img: 'https://images.unsplash.com/photo-1565035010268-a3816f98589a?auto=format&fit=crop&q=80&w=800',
              features: ['5-Star Hotels', 'Direct Flights', 'VIP Ziyarah']
            },
            { 
              name: 'Standard Umrah Package', 
              type: 'Umrah', 
              price: '1,80,000', 
              img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800',
              features: ['4-Star Hotels', 'Connecting Flights', 'Group Ziyarah']
            },
            { 
              name: 'Economy Umrah Package', 
              type: 'Umrah', 
              price: '1,45,000', 
              img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
              features: ['Near Haram Hotels', 'Group Visa', 'Ziyarah Included']
            },
          ].map((pkg, i) => (
            <div 
              key={i} 
              onClick={() => navigate(pkg.type === 'Hajj' ? '/hajj' : '/umrah')}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer bg-white border border-slate-100"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={pkg.img} 
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Share Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const shareUrl = `${window.location.origin}/${pkg.type.toLowerCase()}?package=${i}`;
                    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                    window.open(fbShareUrl, '_blank', 'width=600,height=400');
                  }}
                  className="absolute top-3 left-3 p-2 bg-[#1877F2] text-white rounded-full shadow-md hover:bg-[#1877F2]/90 transition-all z-10"
                  title="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {pkg.type}
                  </span>
                  <div className="flex items-center text-accent">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="ml-1 text-xs font-bold text-slate-700">5.0</span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">{pkg.name}</h3>
                <ul className="space-y-1.5 mb-4">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-center text-slate-500 text-xs sm:text-sm">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary mr-2 flex-shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Starts From</span>
                    <span className="text-lg font-black text-primary">BDT {pkg.price}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t('home.popular_destinations')}</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Dubai', country: 'UAE', price: '45,000', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800' },
            { name: 'Singapore', country: 'Singapore', price: '32,000', img: 'https://images.unsplash.com/photo-1525625232767-12b80424b1c9?auto=format&fit=crop&q=80&w=800' },
            { name: 'Bangkok', country: 'Thailand', price: '28,000', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579367?auto=format&fit=crop&q=80&w=800' },
            { name: 'Istanbul', country: 'Turkey', price: '65,000', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800' },
          ].map((dest, i) => (
            <div 
              key={i} 
              onClick={() => navigate(`/results?to=${dest.name}`)}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={dest.img} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-black text-white">{dest.name}</h3>
                <p className="text-white/80 text-sm mb-2">{dest.country}</p>
                <p className="text-primary font-bold">BDT {dest.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{t('home.why_book')}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {t('home.why_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: t('home.global_reach'), desc: t('home.global_desc') },
              { icon: ShieldCheck, title: t('home.safe_secure'), desc: t('home.safe_secure') },
              { icon: Headphones, title: t('home.expert_support'), desc: t('home.expert_support') },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
