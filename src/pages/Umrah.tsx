import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock, CheckCircle, Phone, Share2, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const umrahPackages = [
  {
    id: 1,
    title: 'Premium Umrah Package 2026',
    titleBn: 'প্রিমিয়াম ওমরাহ প্যাকেজ ২০২৬',
    price: 150000,
    duration: '15 Days',
    durationBn: '১৫ দিন',
    durationDays: 15,
    hotelStar: 5,
    hotelMakkah: '5 Star Hotel (Near Haram)',
    hotelMadinah: '5 Star Hotel (Near Masjid Nabawi)',
    features: ['Direct Flight', 'Full Board Meals', 'Ziyarah Included', 'Private Transport'],
    featuresBn: ['সরাসরি ফ্লাইট', 'তিন বেলা খাবার', 'জিয়ারত অন্তর্ভুক্ত', 'প্রাইভেট ট্রান্সপোর্ট'],
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Standard Umrah Package 2026',
    titleBn: 'স্ট্যান্ডার্ড ওমরাহ প্যাকেজ ২০২৬',
    price: 120000,
    duration: '15 Days',
    durationBn: '১৫ দিন',
    durationDays: 15,
    hotelStar: 4,
    hotelMakkah: '4 Star Hotel (Walking Distance)',
    hotelMadinah: '4 Star Hotel (Walking Distance)',
    features: ['Connecting Flight', 'Full Board Meals', 'Ziyarah Included', 'Shared Transport'],
    featuresBn: ['কানেক্টিং ফ্লাইট', 'তিন বেলা খাবার', 'জিয়ারত অন্তর্ভুক্ত', 'শেয়ারড ট্রান্সপোর্ট'],
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Economy Umrah Package 2026',
    titleBn: 'ইকোনমি ওমরাহ প্যাকেজ ২০২৬',
    price: 95000,
    duration: '15 Days',
    durationBn: '১৫ দিন',
    durationDays: 15,
    hotelStar: 3,
    hotelMakkah: '3 Star Hotel (Shuttle Service)',
    hotelMadinah: '3 Star Hotel (Walking Distance)',
    features: ['Connecting Flight', 'Standard Meals', 'Ziyarah Included', 'Shared Transport'],
    featuresBn: ['কানেক্টিং ফ্লাইট', 'তিন বেলা খাবার', 'জিয়ারত অন্তর্ভুক্ত', 'শেয়ারড ট্রান্সপোর্ট'],
    image: 'https://images.unsplash.com/photo-1565552115943-074ed6b26231?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Ramadan Special Umrah 2026',
    titleBn: 'রমজান স্পেশাল ওমরাহ ২০২৬',
    price: 180000,
    duration: '20 Days',
    durationBn: '২০ দিন',
    durationDays: 20,
    hotelStar: 5,
    hotelMakkah: '5 Star Hotel (Near Haram)',
    hotelMadinah: '5 Star Hotel (Near Masjid Nabawi)',
    features: ['Direct Flight', 'Iftar & Suhoor', 'Ziyarah Included', 'Private Transport'],
    featuresBn: ['সরাসরি ফ্লাইট', 'ইফতার ও সেহরি', 'জিয়ারত অন্তর্ভুক্ত', 'প্রাইভেট ট্রান্সপোর্ট'],
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Umrah() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isBn = i18n.language === 'bn';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(200000);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const filteredPackages = umrahPackages.filter(pkg => {
    if (pkg.price > priceRange) return false;
    if (selectedDuration && pkg.durationDays !== selectedDuration) return false;
    if (selectedStar && pkg.hotelStar !== selectedStar) return false;
    return true;
  });

  const handleBookNow = (pkg: any) => {
    navigate('/package-booking', { state: { package: pkg, type: 'Umrah' } });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2000" 
          alt="Umrah"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4 py-12 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              {isBn ? 'ওমরাহ প্যাকেজ ২০২৬' : 'Umrah Packages 2026'}
            </h1>
            <div className="h-2 w-32 bg-accent mx-auto rounded-full mb-8" />
            <p className="text-lg md:text-2xl text-white/95 font-medium drop-shadow-lg leading-relaxed">
              {isBn ? 'আপনার পবিত্র ওমরাহ যাত্রা হোক সহজ ও আনন্দময়' : 'Experience a spiritual journey like never before with our premium Umrah services.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div 
                className="p-4 bg-primary text-white flex justify-between items-center cursor-pointer lg:cursor-default"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span className="font-bold text-lg">{isBn ? 'ফিল্টার করুন' : 'Filters'}</span>
                </div>
                <div className="lg:hidden">
                  {isFilterOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </div>

              <div className={`p-6 space-y-8 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                {/* Price Filter */}
                <div>
                  <h3 className="font-bold text-slate-800 mb-4">{isBn ? 'সর্বোচ্চ মূল্য' : 'Max Price'}</h3>
                  <input 
                    type="range" 
                    min="50000" 
                    max="250000" 
                    step="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm text-slate-500 mt-2 font-medium">
                    <span>BDT 50K</span>
                    <span className="font-bold text-primary">BDT {priceRange.toLocaleString()}</span>
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="font-bold text-slate-800 mb-4">{isBn ? 'সময়কাল' : 'Duration'}</h3>
                  <div className="space-y-2">
                    {[10, 15, 20].map(days => (
                      <label key={days} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="duration"
                          checked={selectedDuration === days}
                          onChange={() => setSelectedDuration(days)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-slate-600 group-hover:text-primary transition-colors">
                          {isBn ? `${days} দিন` : `${days} Days`}
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="duration"
                        checked={selectedDuration === null}
                        onChange={() => setSelectedDuration(null)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-slate-600 group-hover:text-primary transition-colors">
                        {isBn ? 'সব' : 'All'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Hotel Star Filter */}
                <div>
                  <h3 className="font-bold text-slate-800 mb-4">{isBn ? 'হোটেল রেটিং' : 'Hotel Rating'}</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map(star => (
                      <label key={star} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="star"
                          checked={selectedStar === star}
                          onChange={() => setSelectedStar(star)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="flex items-center text-slate-600 group-hover:text-primary transition-colors">
                          {Array.from({ length: star }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-accent fill-accent mr-1" />
                          ))}
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="star"
                        checked={selectedStar === null}
                        onChange={() => setSelectedStar(null)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-slate-600 group-hover:text-primary transition-colors">
                        {isBn ? 'সব' : 'All'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredPackages.length > 0 ? filteredPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-100 group flex flex-col">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-primary px-4 py-1.5 rounded-xl font-black shadow-xl text-base">
                      BDT {pkg.price.toLocaleString()}
                    </div>
                    
                    {/* Share Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const shareUrl = `${window.location.origin}/umrah?package=${pkg.id}`;
                        if (navigator.share) {
                          navigator.share({
                            title: pkg.title,
                            text: `Check out this Umrah package: ${pkg.title} for BDT ${pkg.price}!`,
                            url: shareUrl,
                          });
                        } else {
                          navigator.clipboard.writeText(shareUrl);
                          alert(isBn ? 'লিঙ্ক কপি করা হয়েছে!' : 'Link copied to clipboard!');
                        }
                      }}
                      className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-primary hover:text-white transition-all z-10"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="p-6 md:p-8 flex-grow flex flex-col">
                    <div className="flex items-center space-x-1 mb-2">
                      {Array.from({ length: pkg.hotelStar }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                      ))}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                      {isBn ? pkg.titleBn : pkg.title}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl">
                        <div className="bg-primary/10 p-2 rounded-lg mr-3">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-bold text-sm">{isBn ? pkg.durationBn : pkg.duration}</span>
                      </div>
                      <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl">
                        <div className="bg-primary/10 p-2 rounded-lg mr-3 mt-0.5">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Makkah Hotel</span>
                          <span className="text-xs font-bold">{pkg.hotelMakkah}</span>
                        </div>
                      </div>
                      <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl">
                        <div className="bg-primary/10 p-2 rounded-lg mr-3 mt-0.5">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Madinah Hotel</span>
                          <span className="text-xs font-bold">{pkg.hotelMadinah}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mb-8">
                      <h4 className="font-black text-slate-900 mb-4 flex items-center">
                        <span className="w-1.5 h-5 bg-accent rounded-full mr-3" />
                        {isBn ? 'প্যাকেজ সুবিধা:' : 'Package Features:'}
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {(isBn ? pkg.featuresBn : pkg.features).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-slate-600 group/item">
                            <CheckCircle className="h-4 w-4 mr-3 text-green-500 group-hover/item:scale-110 transition-transform" />
                            <span className="font-medium text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button 
                        onClick={() => handleBookNow(pkg)}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-black text-base flex items-center justify-center space-x-3 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 group-hover:scale-[1.02]"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>{isBn ? 'বুকিং করুন' : 'Book Now'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-100">
                  <p className="text-slate-500 text-lg font-medium">
                    {isBn ? 'আপনার ফিল্টারের সাথে মিলে এমন কোনো প্যাকেজ পাওয়া যায়নি।' : 'No packages found matching your filters.'}
                  </p>
                  <button 
                    onClick={() => {
                      setPriceRange(200000);
                      setSelectedDuration(null);
                      setSelectedStar(null);
                    }}
                    className="mt-4 text-primary font-bold hover:underline"
                  >
                    {isBn ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us for Umrah */}
      <section className="max-w-7xl mx-auto px-4 mt-20 md:mt-32 mb-20">
        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full -mr-16 -mt-16 md:-mr-32 md:-mt-32" />
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-accent/5 rounded-full -ml-16 -mb-16 md:-ml-32 -mb-32" />
          
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 md:mb-12 tracking-tight relative z-10">
            {isBn ? 'কেন আমাদের সাথে ওমরাহ করবেন?' : 'Why Perform Umrah with Us?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 relative z-10">
            <div className="space-y-6 group">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Star className="h-12 w-12 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black">{isBn ? 'অভিজ্ঞ গাইড' : 'Experienced Guides'}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {isBn ? 'আমাদের রয়েছে দীর্ঘ বছরের অভিজ্ঞ গাইড যারা আপনাকে প্রতিটি ধাপে সাহায্য করবে।' : 'Our guides have extensive knowledge and experience to assist you throughout your Umrah.'}
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Calendar className="h-12 w-12 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black">{isBn ? 'নিশ্চিত ভিসা' : 'Guaranteed Visa'}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {isBn ? 'আমরা শতভাগ নিশ্চয়তার সাথে ওমরাহ ভিসার কাজ সম্পন্ন করি।' : 'We handle the entire Umrah visa process with speed and 100% success rate.'}
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Phone className="h-12 w-12 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black">{isBn ? '২৪/৭ সাপোর্ট' : '24/7 Support'}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {isBn ? 'মক্কা ও মদিনায় আমাদের টিম সবসময় আপনার সেবায় নিয়োজিত।' : 'Our support team is available around the clock to ensure your comfort in the holy cities.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
