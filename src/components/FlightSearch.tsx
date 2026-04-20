import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Plane, 
  Hotel, 
  FileText, 
  Map, 
  Globe, 
  Smartphone, 
  Search, 
  Users, 
  Calendar, 
  MapPin,
  ShieldCheck,
  Headphones,
  Award,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { AIRPORTS } from '../constants/airports';

type Tab = 'Flights' | 'Hotels' | 'Visa' | 'Tours' | 'Explore' | 'E-Sim';
type TripType = 'One Way' | 'Round Trip' | 'Multi City';

interface FlightSearchProps {
  initialTab?: Tab;
  compact?: boolean;
  hideTabs?: boolean;
}

export default function FlightSearch({ initialTab, compact, hideTabs }: FlightSearchProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n: i18nInstance } = useTranslation();
  const isBn = i18nInstance.language === 'bn';
  const [activeTab, setActiveTab] = React.useState<Tab>(initialTab || 'Flights');

  // Handle hash-based tab switching
  React.useEffect(() => {
    if (hideTabs) return;
    const hash = window.location.hash.replace('#', '');
    if (hash === 'hotels') setActiveTab('Hotels');
    else if (hash === 'flights') setActiveTab('Flights');
    else if (hash === 'tours') setActiveTab('Tours');
    else if (hash === 'explore') setActiveTab('Explore');
    else if (hash === 'esim') setActiveTab('E-Sim');
  }, [location.hash, hideTabs]);

  const [tripType, setTripType] = React.useState<TripType>('One Way');
  const [cabinClass, setCabinClass] = React.useState('Economy');
  const [from, setFrom] = React.useState('DAC');
  const [to, setTo] = React.useState('DXB');
  const [error, setError] = React.useState<string | null>(null);

  // Ensure from and to are never the same
  React.useEffect(() => {
    if (from === to) {
      const nextAirport = AIRPORTS.find(a => a.code !== from);
      if (nextAirport) {
        setTo(nextAirport.code);
      }
    }
  }, [from, to]);
  
  const [passengers, setPassengers] = React.useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  const [childDOBs, setChildDOBs] = React.useState<string[]>([]);
  const today = new Date().toISOString().split('T')[0];

  const handleChildCountChange = (count: number) => {
    setPassengers(prev => ({ ...prev, children: count }));
    setChildDOBs(new Array(count).fill(''));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (from === to) {
      setError(t('search.same_route_error'));
      return;
    }
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const searchParams = {
      from,
      to,
      depart: formData.get('depart'),
      return: formData.get('return'),
      passengers,
      tripType,
      cabinClass
    };
    navigate('/results', { state: searchParams });
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const searchParams = {
      destination: formData.get('destination'),
      checkIn: formData.get('checkIn'),
      checkOut: formData.get('checkOut'),
      guests: formData.get('guests'),
    };
    navigate('/hotel-results', { state: searchParams });
  };

  const tabs = [
    { id: 'Flights', icon: Plane, label: t('search.flights') },
    { id: 'Hotels', icon: Hotel, label: t('search.hotels') },
    { id: 'Visa', icon: FileText, label: t('search.visa'), path: '/visa' },
    { id: 'Tours', icon: Map, label: t('search.tours') },
  ];

  return (
    <div 
      id="search-section" 
      className={cn(
        "w-full max-w-6xl mx-auto px-4 relative z-10",
        compact ? "-mt-4" : "-mt-24"
      )}
      style={{ marginTop: '0px', width: '897.215px', height: '487.09px', marginLeft: '0px', paddingLeft: '20px', paddingRight: '6px', marginRight: '0px', marginBottom: '0px', paddingTop: '20px', paddingBottom: '6px' }}
    >
      {/* Tabs */}
      {!hideTabs && (
        <div className="flex flex-wrap gap-1 mb-0 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.path) {
                  navigate(tab.path);
                } else {
                  setActiveTab(tab.id as Tab);
                }
              }}
              className={cn(
                "flex items-center space-x-2 rounded-t-xl font-bold transition-all duration-200 whitespace-nowrap",
                compact ? "px-4 py-3 text-xs sm:text-sm" : "px-6 py-4",
                activeTab === tab.id 
                  ? "bg-white text-primary shadow-[-4px_-4px_10px_rgba(0,0,0,0.05)]" 
                  : "bg-slate-100/80 text-slate-500 hover:bg-slate-200"
              )}
            >
              <tab.icon className={cn(compact ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-5 w-5")} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Search Card */}
      <div 
        className={cn(
          "bg-white shadow-2xl",
          hideTabs ? "rounded-2xl" : "rounded-b-2xl rounded-tr-2xl",
          compact ? "p-4 sm:p-6" : "p-6 sm:p-8"
        )}
        style={{ marginTop: '0px', paddingTop: '10px', paddingBottom: '10px', paddingRight: '44px', paddingLeft: '37px', height: '284.326px', width: '858.215px' }}
      >
        {activeTab === 'Flights' && (
          <form onSubmit={handleSearch} className={cn("space-y-6", compact && "space-y-4")}>
            {/* Trip Type & Cabin */}
            <div className={cn(
              "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4",
              compact && "pb-3"
            )}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {[
                  { id: 'One Way', label: t('search.one_way') },
                  { id: 'Round Trip', label: t('search.round_trip') },
                  { id: 'Multi City', label: t('search.multi_city') }
                ].map((type) => (
                  <label key={type.id} className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === type.id}
                      onChange={() => setTripType(type.id as TripType)}
                      className="w-4 h-4 text-primary border-slate-300 focus:ring-primary"
                    />
                    <span className={cn(
                      "text-sm font-bold transition-colors",
                      tripType === type.id ? "text-primary" : "text-slate-500 group-hover:text-slate-700"
                    )}>{type.label}</span>
                  </label>
                ))}
              </div>

              <select 
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="bg-slate-50 border-none text-sm font-bold text-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none w-full sm:w-auto"
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>

            {/* Search Inputs */}
            <div className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
              compact && "gap-2 sm:gap-3"
            )}>
              {/* From */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('search.from')}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <MapPin className="h-5 w-5 text-slate-400 mr-3" />
                  <select
                    name="from"
                    required
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800 appearance-none"
                  >
                    <option value="" disabled>{t('search.from_placeholder')}</option>
                    <optgroup label="Domestic">
                      {AIRPORTS.filter(a => a.type === 'Domestic' && a.code !== to).map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="International">
                      {AIRPORTS.filter(a => a.type === 'International' && a.code !== to).map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* To */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('search.to')}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <MapPin className="h-5 w-5 text-slate-400 mr-3" />
                  <select
                    name="to"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800 appearance-none"
                  >
                    <option value="" disabled>{t('search.to_placeholder')}</option>
                    <optgroup label="Domestic">
                      {AIRPORTS.filter(a => a.type === 'Domestic' && a.code !== from).map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="International">
                      {AIRPORTS.filter(a => a.type === 'International' && a.code !== from).map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Depart */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('search.depart')}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    type="date"
                    name="depart"
                    required
                    min={today}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Return */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('search.return')}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    type="date"
                    name="return"
                    min={today}
                    disabled={tripType === 'One Way'}
                    className={cn(
                      "bg-transparent w-full outline-none font-semibold text-slate-800",
                      tripType === 'One Way' && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Passengers */}
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
              style={{ marginBottom: '13px', height: '101.2222px', width: '779.208px' }}
            >
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{t('search.passengers')}</span>
                </label>
                <div className="flex space-x-4">
                  <div 
                    className="flex-1"
                    style={{ marginTop: '-7px' }}
                  >
                    <label className="text-[10px] text-slate-400 uppercase font-bold">{t('search.adult')}</label>
                    <select 
                      value={passengers.adults}
                      onChange={(e) => setPassengers(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-bold"
                    >
                      {[1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">{t('search.child')}</label>
                    <select 
                      value={passengers.children}
                      onChange={(e) => handleChildCountChange(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-bold"
                    >
                      {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">{t('search.infant')}</label>
                    <select 
                      value={passengers.infants}
                      onChange={(e) => setPassengers(prev => ({ ...prev, infants: parseInt(e.target.value) }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-bold"
                    >
                      {[0,1,2].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dynamic Child DOBs */}
              <div className="md:col-span-2">
                {passengers.children > 0 && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-xs text-amber-600 font-medium bg-amber-50 p-2 rounded border border-amber-100">
                      {t('search.child_dob_warning')}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {childDOBs.map((dob, idx) => (
                        <div key={idx}>
                          <label className="text-[10px] text-slate-400 uppercase font-bold">{t('search.child')} {idx + 1} DOB</label>
                          <input
                            type="date"
                            required
                            value={dob}
                            onChange={(e) => {
                              const newDOBs = [...childDOBs];
                              newDOBs[idx] = e.target.value;
                              setChildDOBs(newDOBs);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div 
              className="flex justify-center pt-4"
              style={{ paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px', paddingTop: '0px', width: '150.979px', marginLeft: '0px', marginTop: '-77px' }}
            >
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
                style={{ height: '41px', width: '244.986px', fontSize: '12px' }}
              >
                <Search className="h-6 w-6" style={{ backgroundColor: '#0f172a' }} />
                <span>{activeTab === 'Flights' ? t('hero.search_flights') : t('search.search_hotels')}</span>
              </button>
            </div>
          </form>
        )}
        
        {activeTab === 'Hotels' && (
          <form onSubmit={handleHotelSearch} className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="relative group lg:col-span-1">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('search.destination')}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <MapPin className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    name="destination"
                    required
                    placeholder={t('search.destination_placeholder')}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('search.check_in')}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    type="date"
                    name="checkIn"
                    required
                    min={today}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('search.check_out')}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    type="date"
                    name="checkOut"
                    required
                    min={today}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('search.guests')}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Users className="h-5 w-5 text-slate-400 mr-3" />
                  <select
                    name="guests"
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? (i18n.language === 'bn' ? 'অতিথি' : 'Guest') : (i18n.language === 'bn' ? 'অতিথি' : 'Guests')}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-3"
              >
                <Search className="h-6 w-6" />
                <span>{t('search.search_hotels')}</span>
              </button>
            </div>
          </form>
        )}

        {activeTab === 'Visa' && (
          <form onSubmit={(e) => { e.preventDefault(); navigate('/visa'); }} className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Country */}
              <div className="relative group lg:col-span-1">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isBn ? 'দেশ' : 'Country'}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Globe className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    name="country"
                    required
                    placeholder={isBn ? 'দেশ নির্বাচন করুন' : 'Select Country'}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Travel Date */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isBn ? 'ভ্রমণের তারিখ' : 'Travel Date'}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    type="date"
                    name="travelDate"
                    required
                    min={today}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Visa Type */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isBn ? 'ভিসার ধরন' : 'Visa Type'}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <FileText className="h-5 w-5 text-slate-400 mr-3" />
                  <select
                    name="visaType"
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  >
                    <option value="Tourist">{isBn ? 'ট্যুরিস্ট ভিসা' : 'Tourist Visa'}</option>
                    <option value="Business">{isBn ? 'বিজনেস ভিসা' : 'Business Visa'}</option>
                    <option value="Student">{isBn ? 'স্টুডেন্ট ভিসা' : 'Student Visa'}</option>
                  </select>
                </div>
              </div>

              {/* Travelers */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{isBn ? 'ভ্রমণকারী' : 'Travelers'}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Users className="h-5 w-5 text-slate-400 mr-3" />
                  <select
                    name="travelers"
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {isBn ? 'জন' : 'Person(s)'}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-3"
              >
                <Search className="h-6 w-6" />
                <span>{isBn ? 'ভিসা খুঁজুন' : 'Search Visa'}</span>
              </button>
            </div>
          </form>
        )}

        {activeTab === 'Tours' && (
          <form onSubmit={(e) => { e.preventDefault(); navigate('/tours'); }} className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="relative group lg:col-span-1">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isBn ? 'গন্তব্য' : 'Destination'}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <MapPin className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    name="destination"
                    required
                    placeholder={isBn ? 'গন্তব্য লিখুন' : 'Enter Destination'}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Tour Date */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isBn ? 'ভ্রমণের তারিখ' : 'Tour Date'}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    type="date"
                    name="tourDate"
                    required
                    min={today}
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{isBn ? 'সময়কাল' : 'Duration'}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Map className="h-5 w-5 text-slate-400 mr-3" />
                  <select
                    name="duration"
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  >
                    <option value="1-3">{isBn ? '১-৩ দিন' : '1-3 Days'}</option>
                    <option value="4-7">{isBn ? '৪-৭ দিন' : '4-7 Days'}</option>
                    <option value="8-14">{isBn ? '৮-১৪ দিন' : '8-14 Days'}</option>
                    <option value="15+">{isBn ? '১৫+ দিন' : '15+ Days'}</option>
                  </select>
                </div>
              </div>

              {/* Travelers */}
              <div className="relative group">
                <label className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{isBn ? 'ভ্রমণকারী' : 'Travelers'}</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-4 pt-7 group-focus-within:border-primary transition-colors">
                  <Users className="h-5 w-5 text-slate-400 mr-3" />
                  <select
                    name="travelers"
                    className="bg-transparent w-full outline-none font-semibold text-slate-800"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {isBn ? 'জন' : 'Person(s)'}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-3"
              >
                <Search className="h-6 w-6" />
                <span>{isBn ? 'ট্যুর খুঁজুন' : 'Search Tours'}</span>
              </button>
            </div>
          </form>
        )}

        {activeTab === 'Explore' && (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <Globe className="h-12 w-12 opacity-20" />
            <p className="font-medium">{isBn ? 'এক্সপ্লোর শীঘ্রই আসছে!' : 'Explore is coming soon!'}</p>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        style={{ height: '82.7778px', width: '859.208px', marginTop: '18px' }}
      >
        <div className="flex items-center space-x-4 bg-white/50 backdrop-blur p-4 rounded-2xl border border-white/20">
          <div className="bg-primary/10 p-3 rounded-full">
            <Headphones className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">24/7 Support</h4>
            <p className="text-xs text-slate-500">Always here to help you</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-white/50 backdrop-blur p-4 rounded-2xl border border-white/20">
          <div className="bg-primary/10 p-3 rounded-full">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Secure Payment</h4>
            <p className="text-xs text-slate-500">100% safe transactions</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-white/50 backdrop-blur p-4 rounded-2xl border border-white/20">
          <div className="bg-primary/10 p-3 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Award-winning</h4>
            <p className="text-xs text-slate-500">Best OTA in the region</p>
          </div>
        </div>
      </div>
    </div>
  );
}
