import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Hotel, MapPin, Calendar, Users, Star, Wifi, Coffee, Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HotelResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const searchParams = location.state || {};

  // Mock hotel data
  const hotels = [
    {
      id: 1,
      name: 'Grand Royal Palace',
      location: searchParams.destination || 'Dhaka, Bangladesh',
      price: 120,
      rating: 4.8,
      reviews: 1240,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      amenities: ['Free Wifi', 'Breakfast', 'Parking']
    },
    {
      id: 2,
      name: 'Ocean View Resort',
      location: searchParams.destination || 'Cox\'s Bazar, Bangladesh',
      price: 85,
      rating: 4.5,
      reviews: 850,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
      amenities: ['Pool', 'Beach Access', 'Free Wifi']
    },
    {
      id: 3,
      name: 'City Center Inn',
      location: searchParams.destination || 'Chittagong, Bangladesh',
      price: 45,
      rating: 4.2,
      reviews: 420,
      image: 'https://images.unsplash.com/photo-1551882547-ff43c63e8c24?auto=format&fit=crop&q=80&w=800',
      amenities: ['Free Wifi', 'Gym']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('nav.home')}
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Hotel className="h-6 w-6 mr-2" />
                {t('hotel_booking.hotels_in')} {searchParams.destination || t('hotel_booking.any_date')}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-white/70 text-sm">
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {searchParams.checkIn || t('hotel_booking.any_date')} - {searchParams.checkOut || t('hotel_booking.any_date')}</span>
                <span className="flex items-center"><Users className="h-4 w-4 mr-1" /> {searchParams.guests || '1'} {t('hotel_booking.guests_count')}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              {t('hotel_booking.modify_search')}
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto relative">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-primary" />
                  {hotel.rating}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{hotel.name}</h3>
                      <p className="text-slate-500 text-sm flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {hotel.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {hotel.amenities.includes('Free Wifi') && <span className="flex items-center text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded"><Wifi className="h-3 w-3 mr-1" /> Wifi</span>}
                    {hotel.amenities.includes('Breakfast') && <span className="flex items-center text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded"><Coffee className="h-3 w-3 mr-1" /> Breakfast</span>}
                    {hotel.amenities.includes('Parking') && <span className="flex items-center text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded"><Car className="h-3 w-3 mr-1" /> Parking</span>}
                  </div>
                </div>
                
                <div className="mt-6 flex items-end justify-between border-t border-slate-50 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">{t('hotel_booking.price_per_night')}</p>
                    <p className="text-2xl font-bold text-primary">${hotel.price}</p>
                  </div>
                  <button 
                    onClick={() => navigate('/hotel-booking', { state: { hotel, searchParams } })}
                    className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-bold transition-colors"
                  >
                    {t('hotel_booking.book_now')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
