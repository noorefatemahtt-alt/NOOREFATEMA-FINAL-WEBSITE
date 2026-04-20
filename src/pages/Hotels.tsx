import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlightSearch from '../components/FlightSearch';
import { useTranslation } from 'react-i18next';

export default function Hotels() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isBn = i18n.language === 'bn';

  const handleBookHotel = (hotel: any) => {
    navigate('/hotel-booking', { 
      state: { 
        hotel: {
          name: hotel.name,
          location: hotel.location,
          price: hotel.price,
          rating: hotel.rating,
          image: hotel.image
        },
        searchParams: {
          checkIn: new Date().toISOString().split('T')[0],
          checkOut: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          guests: '2'
        }
      } 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000" 
          alt="Hotels"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4 py-12 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              {isBn ? 'সেরা হোটেল খুঁজুন' : 'Find Your Perfect Stay'}
            </h1>
            <div className="h-2 w-32 bg-accent mx-auto rounded-full mb-8" />
            <p className="text-lg md:text-2xl text-white/95 font-medium drop-shadow-lg leading-relaxed">
              {isBn ? 'বিশ্বজুড়ে হাজারো হোটেলের মধ্য থেকে আপনার পছন্দেরটি বেছে নিন' : 'Choose from thousands of hotels worldwide for your next journey.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
        <FlightSearch initialTab="Hotels" hideTabs={true} />
      </div>

      {/* Featured Hotels Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20 md:mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
              {isBn ? 'জনপ্রিয় হোটেলসমূহ' : 'Popular Hotels'}
            </h2>
            <p className="text-slate-500 font-medium">
              {isBn ? 'আমাদের গ্রাহকদের পছন্দের শীর্ষে থাকা হোটেলগুলো' : 'Top-rated hotels loved by our customers'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              id: 1,
              name: 'Makkah Clock Royal Tower',
              location: 'Makkah, Saudi Arabia',
              image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&q=80&w=800',
              rating: 5,
              price: 250
            },
            {
              id: 2,
              name: 'Pullman ZamZam Madinah',
              location: 'Madinah, Saudi Arabia',
              image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
              rating: 5,
              price: 200
            },
            {
              id: 3,
              name: 'Burj Al Arab',
              location: 'Dubai, UAE',
              image: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=800',
              rating: 5,
              price: 1500
            }
          ].map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-100 group flex flex-col">
              <div className="relative h-60 md:h-64 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-primary font-bold text-sm shadow-lg">
                  ★ {hotel.rating}.0
                </div>
                <div className="absolute bottom-4 left-4 bg-accent text-primary px-4 py-1.5 rounded-xl font-black shadow-xl text-base">
                  ${hotel.price} / {isBn ? 'রাত' : 'night'}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{hotel.name}</h3>
                <p className="text-slate-500 flex items-center text-sm font-medium mb-6">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                  {hotel.location}
                </p>
                <div className="mt-auto">
                  <button 
                    onClick={() => handleBookHotel(hotel)}
                    className="w-full py-3 md:py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                  >
                    {isBn ? 'বুকিং করুন' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
