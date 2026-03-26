import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Calendar, Clock, CheckCircle, Phone, Share2 } from 'lucide-react';

const hajjPackages = [
  {
    id: 1,
    title: 'Premium Hajj Package 2026',
    titleBn: 'প্রিমিয়াম হজ প্যাকেজ ২০২৬',
    price: '8,50,000',
    duration: '40 Days',
    durationBn: '৪০ দিন',
    hotelMakkah: '5 Star Hotel (Near Haram)',
    hotelMadinah: '5 Star Hotel (Near Masjid Nabawi)',
    features: ['Direct Flight', 'VIP Tent in Mina', 'Full Board Meals', 'Ziyarah Included'],
    featuresBn: ['সরাসরি ফ্লাইট', 'মিনায় ভিআইপি তাবু', 'তিন বেলা খাবার', 'জিয়ারত অন্তর্ভুক্ত'],
    image: 'https://images.unsplash.com/photo-1565552115943-074ed6b26231?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Standard Hajj Package 2026',
    titleBn: 'স্ট্যান্ডার্ড হজ প্যাকেজ ২০২৬',
    price: '6,50,000',
    duration: '40 Days',
    durationBn: '৪০ দিন',
    hotelMakkah: '4 Star Hotel (Walking Distance)',
    hotelMadinah: '4 Star Hotel (Walking Distance)',
    features: ['Connecting Flight', 'Standard Tent in Mina', 'Full Board Meals', 'Ziyarah Included'],
    featuresBn: ['কানেক্টিং ফ্লাইট', 'স্ট্যান্ডার্ড তাবু', 'তিন বেলা খাবার', 'জিয়ারত অন্তর্ভুক্ত'],
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Economy Hajj Package 2026',
    titleBn: 'ইকোনমি হজ প্যাকেজ ২০২৬',
    price: '5,50,000',
    duration: '40 Days',
    durationBn: '৪০ দিন',
    hotelMakkah: '3 Star Hotel (Shuttle Service)',
    hotelMadinah: '3 Star Hotel (Walking Distance)',
    features: ['Connecting Flight', 'Standard Tent', 'Full Board Meals', 'Ziyarah Included'],
    featuresBn: ['কানেক্টিং ফ্লাইট', 'স্ট্যান্ডার্ড তাবু', 'তিন বেলা খাবার', 'জিয়ারত অন্তর্ভুক্ত'],
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Hajj() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'bn';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1565552115943-074ed6b26231?auto=format&fit=crop&q=80&w=2000" 
          alt="Hajj"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4 py-12 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              {isBn ? 'হজ প্যাকেজ ২০২৬' : 'Hajj Packages 2026'}
            </h1>
            <div className="h-2 w-32 bg-accent mx-auto rounded-full mb-8" />
            <p className="text-lg md:text-2xl text-white/95 font-medium drop-shadow-lg leading-relaxed">
              {isBn ? 'আপনার পবিত্র হজ যাত্রা হোক সহজ ও আনন্দময়' : 'Make your holy Hajj journey easy and joyful with our expert guidance.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {hajjPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all border border-slate-100 group flex flex-col">
              <div className="relative h-60 md:h-72 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-accent text-primary px-4 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-2xl font-black shadow-xl text-base md:text-lg">
                  BDT {pkg.price}
                </div>
                
                {/* Share Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    const shareUrl = `${window.location.origin}/hajj?package=${pkg.id}`;
                    if (navigator.share) {
                      navigator.share({
                        title: pkg.title,
                        text: `Check out this Hajj package: ${pkg.title} for BDT ${pkg.price}!`,
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
              
              <div className="p-6 md:p-10 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6 leading-tight group-hover:text-primary transition-colors">
                  {isBn ? pkg.titleBn : pkg.title}
                </h3>
                
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl md:rounded-2xl">
                    <div className="bg-primary/10 p-2 rounded-lg md:rounded-xl mr-3">
                      <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <span className="font-bold text-sm md:text-base">{isBn ? pkg.durationBn : pkg.duration}</span>
                  </div>
                  <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl md:rounded-2xl">
                    <div className="bg-primary/10 p-2 rounded-lg md:rounded-xl mr-3 mt-0.5">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Makkah Hotel</span>
                      <span className="text-xs md:text-sm font-bold">{pkg.hotelMakkah}</span>
                    </div>
                  </div>
                  <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl md:rounded-2xl">
                    <div className="bg-primary/10 p-2 rounded-lg md:rounded-xl mr-3 mt-0.5">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Madinah Hotel</span>
                      <span className="text-xs md:text-sm font-bold">{pkg.hotelMadinah}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6 md:pt-8 mb-8 md:mb-10">
                  <h4 className="font-black text-slate-900 mb-4 md:mb-6 flex items-center">
                    <span className="w-1.5 h-5 md:w-2 md:h-6 bg-accent rounded-full mr-3" />
                    {isBn ? 'প্যাকেজ সুবিধা:' : 'Package Features:'}
                  </h4>
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {(isBn ? pkg.featuresBn : pkg.features).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-slate-600 group/item">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-3 text-green-500 group-hover/item:scale-110 transition-transform" />
                        <span className="font-medium text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <a 
                    href="tel:01842705790"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 md:py-5 rounded-xl md:rounded-[1.5rem] font-black text-base md:text-lg flex items-center justify-center space-x-3 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 group-hover:scale-[1.02]"
                  >
                    <Phone className="h-5 w-5 md:h-6 md:w-6 animate-pulse" />
                    <span>{isBn ? 'বুকিং এর জন্য কল করুন' : 'Call for Booking'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us for Hajj */}
      <section className="max-w-7xl mx-auto px-4 mt-20 md:mt-32 mb-10">
        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full -mr-16 -mt-16 md:-mr-32 md:-mt-32" />
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-accent/5 rounded-full -ml-16 -mb-16 md:-ml-32 md:-mb-32" />
          
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 md:mb-12 tracking-tight relative z-10">
            {isBn ? 'কেন আমাদের সাথে হজ করবেন?' : 'Why Perform Hajj with Us?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 relative z-10">
            <div className="space-y-6 group">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Star className="h-12 w-12 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black">{isBn ? 'অভিজ্ঞ গাইড' : 'Experienced Guides'}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {isBn ? 'আমাদের রয়েছে দীর্ঘ বছরের অভিজ্ঞ গাইড যারা আপনাকে প্রতিটি ধাপে সাহায্য করবে।' : 'We have years of experienced guides who will help you at every step of your spiritual journey.'}
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Calendar className="h-12 w-12 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black">{isBn ? 'নিশ্চিত ভিসা' : 'Guaranteed Visa'}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {isBn ? 'আমরা শতভাগ নিশ্চয়তার সাথে হজ ভিসার কাজ সম্পন্ন করি।' : 'We complete Hajj visa processing with 100% guarantee and reliability.'}
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Phone className="h-12 w-12 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black">{isBn ? '২৪/৭ সাপোর্ট' : '24/7 Support'}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {isBn ? 'মক্কা ও মদিনায় আমাদের টিম সবসময় আপনার সেবায় নিয়োজিত।' : 'Our dedicated team in Makkah and Madinah is always at your service 24/7.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Application Process Section */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 border-4 border-white/20 rounded-full animate-pulse" />
            <div className="absolute bottom-20 left-20 w-32 h-32 border-2 border-white/10 rounded-full" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                {isBn ? 'হজ ভিসা আবেদন প্রক্রিয়া' : 'Hajj Visa Application Process'}
              </h2>
              <div className="h-1.5 w-24 bg-accent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              {/* Required Documents */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-black mb-6">{isBn ? 'প্রয়োজনীয় কাগজপত্র' : 'Required Documents'}</h3>
                <ul className="space-y-4">
                  {[
                    isBn ? 'বৈধ পাসপোর্ট (অন্তত ৬ মাসের মেয়াদ)' : 'Valid Passport (at least 6 months validity)',
                    isBn ? '৪ কপি পাসপোর্ট সাইজের ছবি (সাদা ব্যাকগ্রাউন্ড)' : '4 Recent Passport Size Photos (White background)',
                    isBn ? 'জাতীয় পরিচয়পত্রের (NID) ফটোকপি' : 'National ID Card (NID) Copy',
                    isBn ? 'কোভিড-১৯ টিকাদানের সনদ' : 'COVID-19 Vaccination Certificate',
                    isBn ? 'স্বাস্থ্য পরীক্ষার সনদ' : 'Health Clearance Certificate'
                  ].map((doc, i) => (
                    <li key={i} className="flex items-start space-x-3 text-white/80">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      <span className="font-medium">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Deadlines */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-black mb-6">{isBn ? 'আবেদনের সময়সীমা' : 'Application Deadlines'}</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-accent font-bold text-sm uppercase tracking-wider mb-1">{isBn ? 'নিবন্ধন শুরু' : 'Registration Starts'}</p>
                    <p className="text-lg font-bold">{isBn ? 'হজের ৬ মাস আগে থেকে' : '6 Months Before Hajj'}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-accent font-bold text-sm uppercase tracking-wider mb-1">{isBn ? 'কাগজপত্র জমা' : 'Document Submission'}</p>
                    <p className="text-lg font-bold">{isBn ? 'হজের ৩ মাস আগে' : '3 Months Before Hajj'}</p>
                  </div>
                  <p className="text-white/60 text-sm italic">
                    {isBn ? '* সময়সীমা সৌদি হজ মন্ত্রণালয়ের সিদ্ধান্তের ওপর নির্ভরশীল।' : '* Deadlines are subject to Saudi Ministry of Hajj decisions.'}
                  </p>
                </div>
              </div>

              {/* How to Apply */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-black mb-6">{isBn ? 'যেভাবে আবেদন করবেন' : 'How to Apply'}</h3>
                <div className="space-y-4">
                  {[
                    isBn ? '১. আমাদের অফিসে আসুন বা কল করুন।' : '1. Visit our office or call us directly.',
                    isBn ? '২. প্রাথমিক আমানত দিয়ে আপনার নাম নিবন্ধন করুন।' : '2. Register your name with initial deposit.',
                    isBn ? '৩. প্রয়োজনীয় কাগজপত্র জমা দিন।' : '3. Submit all required documents.',
                    isBn ? '৪. আমরা সম্পূর্ণ ভিসা প্রসেসিং এবং প্রশিক্ষণের দায়িত্ব পালন করি।' : '4. We handle the entire visa processing and training.'
                  ].map((step, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <p className="font-bold text-white/90">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a 
                    href="tel:01842705790"
                    className="flex items-center justify-center space-x-3 bg-accent text-primary py-4 rounded-xl font-black hover:scale-[1.02] transition-transform"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{isBn ? 'এখনই যোগাযোগ করুন' : 'Contact Us Now'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
