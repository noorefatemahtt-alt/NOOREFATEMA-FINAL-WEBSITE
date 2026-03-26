import React, { useState, useEffect } from 'react';
import FlightSearch from '../components/FlightSearch';
import { useTranslation } from 'react-i18next';
import { Plane, Calendar, Clock, ArrowRight, ShieldCheck, Star, Share2, Loader2, Facebook, MessageCircle, Copy, X, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Flights() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'bn';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sharingDeal, setSharingDeal] = useState<any>(null);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const bestDeals = [
    {
      id: 1,
      airline: 'Emirates',
      logo: 'https://www.logo.wine/a/logo/Emirates_(airline)/Emirates_(airline)-Logo.wine.svg',
      from: 'Dhaka (DAC)',
      to: 'Dubai (DXB)',
      date: '2026-05-10',
      departureTime: '10:30 AM',
      arrivalTime: '02:00 PM',
      price: 52000,
      type: 'One Way',
      duration: '5h 30m'
    },
    {
      id: 2,
      airline: 'Qatar Airways',
      logo: 'https://www.logo.wine/a/logo/Qatar_Airways/Qatar_Airways-Logo.wine.svg',
      from: 'Dhaka (DAC)',
      to: 'London (LHR)',
      date: '2026-06-15',
      departureTime: '03:45 AM',
      arrivalTime: '10:30 AM',
      price: 85000,
      type: 'One Way',
      duration: '12h 45m'
    },
    {
      id: 3,
      airline: 'Turkish Airlines',
      logo: 'https://www.logo.wine/a/logo/Turkish_Airlines/Turkish_Airlines-Logo.wine.svg',
      from: 'Dhaka (DAC)',
      to: 'Istanbul (IST)',
      date: '2026-05-20',
      departureTime: '11:15 PM',
      arrivalTime: '05:30 AM',
      price: 68000,
      type: 'One Way',
      duration: '8h 15m'
    },
    {
      id: 4,
      airline: 'Biman Bangladesh',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Biman_Bangladesh_Airlines_logo.svg/1200px-Biman_Bangladesh_Airlines_logo.svg.png',
      from: 'Dhaka (DAC)',
      to: 'Jeddah (JED)',
      date: '2026-04-25',
      departureTime: '08:00 PM',
      arrivalTime: '12:30 AM',
      price: 45000,
      type: 'One Way',
      duration: '6h 30m'
    }
  ];

  const handleBooking = (deal: any) => {
    navigate('/booking', { 
      state: { 
        flight: {
          airline: deal.airline,
          route: `${deal.from} → ${deal.to}`,
          date: deal.date,
          price: deal.price,
          departureTime: deal.departureTime,
          arrivalTime: deal.arrivalTime
        } 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative min-h-[350px] md:h-[450px] w-full overflow-hidden flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=2000" 
          alt="Flights"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4 py-12 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              {isBn ? 'ফ্লাইট বুকিং' : 'Flight Booking'}
            </h1>
            <div className="h-2 w-32 bg-accent mx-auto rounded-full mb-8" />
            <p className="text-lg md:text-2xl text-white/95 font-medium drop-shadow-lg leading-relaxed">
              {isBn ? 'আপনার পরবর্তী ভ্রমণের জন্য সেরা ফ্লাইটটি খুঁজে নিন' : 'Find the best flights for your next journey with ease and confidence.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 md:-mt-20 relative z-20">
        <FlightSearch initialTab="Flights" hideTabs={true} />
      </div>

      {/* Best Deals Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20 md:mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
              {isBn ? 'সেরা ডিলসমূহ' : 'Best Flight Deals'}
            </h2>
            <p className="text-slate-500 font-medium">
              {isBn ? 'আজকের সেরা অফারগুলো দেখে নিন' : 'Check out today\'s top offers for your next trip'}
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-bold">{isBn ? 'নিরাপদ বুকিং গ্যারান্টি' : 'Secure Booking Guaranteed'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] shadow-sm border border-slate-100">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-slate-500 font-bold text-lg">
                {isBn ? 'সেরা ডিলগুলো লোড হচ্ছে...' : 'Fetching best deals for you...'}
              </p>
            </div>
          ) : (
            bestDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-100 group flex flex-col md:flex-row relative">
                {/* Share Button */}
                <button 
                  onClick={() => setSharingDeal(deal)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-primary hover:text-white transition-all z-10"
                  title="Share Deal"
                >
                  <Share2 className="h-4 w-4" />
                </button>

                <div className="md:w-1/3 bg-slate-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center justify-center">
                    <img 
                      src={deal.logo} 
                      alt={deal.airline}
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="font-black text-slate-800 text-center">{deal.airline}</p>
                  <div className="flex items-center mt-2 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center">
                        <p className="text-2xl font-black text-slate-900">{deal.from.split(' ')[1]}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{deal.from.split(' ')[0]}</p>
                      </div>
                      <div className="flex flex-col items-center px-4 flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{deal.duration}</p>
                        <div className="w-full h-px bg-slate-200 relative">
                          <Plane className="h-4 w-4 text-primary absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{deal.type}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-slate-900">{deal.to.split(' ')[1]}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{deal.to.split(' ')[0]}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold">{deal.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold">{deal.departureTime} - {deal.arrivalTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isBn ? 'জনপ্রতি' : 'Per Person'}</p>
                      <p className="text-2xl font-black text-primary">BDT {deal.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => handleBooking(deal)}
                      className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl font-black transition-all flex items-center space-x-2 shadow-lg shadow-primary/20"
                    >
                      <span>{isBn ? 'বুকিং করুন' : 'Book Now'}</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Share Modal */}
        {sharingDeal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-300">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black text-slate-900">{isBn ? 'শেয়ার করুন' : 'Share Deal'}</h3>
                  <button 
                    onClick={() => setSharingDeal(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-slate-400" />
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl mb-8 border border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-sm">
                      <img src={sharingDeal.logo} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{sharingDeal.airline}</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{sharingDeal.from} → {sharingDeal.to}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {(() => {
                    const shareUrl = `${window.location.origin}/booking?airline=${encodeURIComponent(sharingDeal.airline)}&route=${encodeURIComponent(`${sharingDeal.from} → ${sharingDeal.to}`)}&date=${encodeURIComponent(sharingDeal.date)}&price=${sharingDeal.price}&departureTime=${encodeURIComponent(sharingDeal.departureTime)}&arrivalTime=${encodeURIComponent(sharingDeal.arrivalTime)}`;
                    const shareText = `Check out this flight deal: ${sharingDeal.airline} from ${sharingDeal.from} to ${sharingDeal.to} for BDT ${sharingDeal.price.toLocaleString()}!`;

                    return (
                      <>
                        <button 
                          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')}
                          className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-3xl border border-green-100 hover:bg-green-100 transition-colors group"
                        >
                          <MessageCircle className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-bold text-green-700">WhatsApp</span>
                        </button>

                        <button 
                          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                          className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-3xl border border-blue-100 hover:bg-blue-100 transition-colors group"
                        >
                          <Facebook className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-bold text-blue-700">Facebook</span>
                        </button>

                        <button 
                          onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                          className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl border border-slate-800 hover:bg-black transition-colors group"
                        >
                          <Twitter className="h-8 w-8 text-white mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-bold text-white">X / Twitter</span>
                        </button>

                        <button 
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: `Flight Deal: ${sharingDeal.airline}`,
                                text: shareText,
                                url: shareUrl,
                              });
                            } else {
                              navigator.clipboard.writeText(shareUrl);
                              alert(isBn ? 'লিঙ্ক কপি করা হয়েছে!' : 'Link copied to clipboard!');
                            }
                          }}
                          className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-slate-100 transition-colors group"
                        >
                          <Share2 className="h-8 w-8 text-slate-600 mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-bold text-slate-700">{isBn ? 'অন্যান্য' : 'More'}</span>
                        </button>

                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(shareUrl);
                            alert(isBn ? 'লিঙ্ক কপি করা হয়েছে!' : 'Link copied to clipboard!');
                          }}
                          className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-slate-100 transition-colors group col-span-2"
                        >
                          <div className="flex items-center space-x-2">
                            <Copy className="h-5 w-5 text-slate-600" />
                            <span className="text-sm font-bold text-slate-700">{isBn ? 'লিঙ্ক কপি করুন' : 'Copy Link'}</span>
                          </div>
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Why Book With Us */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: isBn ? 'সেরা দামের নিশ্চয়তা' : 'Best Price Guarantee',
              desc: isBn ? 'আমরা আপনাকে দিচ্ছি বাজারের সেরা দামের নিশ্চয়তা।' : 'We offer the most competitive prices in the market.',
              icon: ShieldCheck
            },
            {
              title: isBn ? '২৪/৭ সাপোর্ট' : '24/7 Support',
              desc: isBn ? 'যেকোনো প্রয়োজনে আমরা আছি আপনার পাশে সবসময়।' : 'Our dedicated team is available 24/7 to assist you.',
              icon: Clock
            },
            {
              title: isBn ? 'সহজ বুকিং' : 'Easy Booking',
              desc: isBn ? 'মাত্র কয়েক ক্লিকেই সম্পন্ন করুন আপনার বুকিং।' : 'Complete your flight booking in just a few simple steps.',
              icon: Plane
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
