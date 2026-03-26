import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Hotel, 
  User, 
  Calendar, 
  CheckCircle, 
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Loader2,
  MapPin,
  Star,
  Users,
  Mail,
  Phone
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HotelBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  
  const hotel = location.state?.hotel || {
    name: 'Grand Royal Palace',
    location: 'Dhaka, Bangladesh',
    price: 120,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
  };

  const searchParams = location.state?.searchParams || {
    checkIn: '2026-04-15',
    checkOut: '2026-04-20',
    guests: '2'
  };

  const [formData, setFormData] = React.useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        // Mask card number for security even in simulation
        cardNumber: formData.cardNumber ? `**** **** **** ${formData.cardNumber.slice(-4)}` : '',
        hotelDetails: hotel,
        searchParams,
        timestamp: new Date().toISOString()
      };

      // Simulating Google Sheets POST
      await fetch('https://docs.google.com/spreadsheets/d/1N0Mh3B7zSHthFLRS4mWdWOeWetbY-kCA0RsIPSkXYm4/edit?usp=sharing', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // WhatsApp Redirection
      const message = `*New Hotel Booking Request - Noore Fatema Travels*\n\n` +
        `*Guest:* ${formData.title} ${formData.firstName} ${formData.lastName}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Hotel:* ${hotel.name}\n` +
        `*Location:* ${hotel.location}\n` +
        `*Check-in:* ${searchParams.checkIn}\n` +
        `*Check-out:* ${searchParams.checkOut}\n` +
        `*Guests:* ${searchParams.guests}\n` +
        `*Total Price:* $${(hotel.price * 5).toLocaleString()}\n\n` +
        `_Please confirm my hotel booking._`;

      const whatsappUrl = `https://wa.me/01842705790?text=${encodeURIComponent(message)}`;
      
      setSubmitted(true);
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);

    } catch (error) {
      console.error('Booking error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border border-slate-100 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('hotel_booking.success_title')}</h2>
          <p className="text-slate-600 mb-8">
            {t('hotel_booking.success_msg')}
          </p>
          <button 
            onClick={() => navigate('/')}
            className="text-primary font-bold hover:underline"
          >
            {t('nav.home')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-primary text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('hotel_booking.back_to_results')}
          </button>
          <h1 className="text-3xl font-bold">{t('hotel_booking.title')}</h1>
          <p className="text-white/70">Complete your reservation for {hotel.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg text-slate-900">{t('hotel_booking.guest_info')}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.title_label')}</label>
                <div className="flex space-x-4">
                  {['Mr', 'Ms', 'Mrs'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, title: t }))}
                      className={`px-6 py-2 rounded-lg border font-bold transition-all ${
                        formData.title === t 
                          ? 'bg-primary border-primary text-white shadow-md' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-primary'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.first_name')}</label>
                <input
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="e.g. John"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.last_name')}</label>
                <input
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="e.g. Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.email')}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.phone')}</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g. +880 1XXX XXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.special_requests')}</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                  placeholder="e.g. Late check-in, high floor, etc."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors h-32 resize-none"
                />
              </div>
            </div>

            {/* Simulated Payment Section */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex items-center space-x-3 mb-8">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg text-slate-900">{t('hotel_booking.payment_info')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.card_number')}</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.expiry_date')}</label>
                  <input
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    placeholder="MM/YY"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('hotel_booking.cvv')}</label>
                  <input
                    required
                    value={formData.cvv}
                    onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                    placeholder="123"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-white py-5 rounded-2xl font-bold text-xl mt-12 shadow-xl shadow-primary/20 transition-all flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-6 w-6" />
                  <span>{t('hotel_booking.confirm')}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 sticky top-24">
            <h3 className="font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">{t('hotel_booking.booking_summary')}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 leading-tight">{hotel.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {hotel.location}
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                    <span className="text-xs font-bold text-slate-700">{hotel.rating}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-slate-50 py-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t('hotel_booking.check_in')}</p>
                  <p className="text-sm font-bold text-slate-800">{searchParams.checkIn}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t('hotel_booking.check_out')}</p>
                  <p className="text-sm font-bold text-slate-800">{searchParams.checkOut}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t('hotel_booking.guests_label')}</p>
                  <p className="text-sm font-bold text-slate-800">{searchParams.guests} Person(s)</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t('hotel_booking.duration')}</p>
                  <p className="text-sm font-bold text-slate-800">5 Nights</p>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">{t('hotel_booking.price_per_night')}</span>
                  <span className="font-bold text-slate-800">${hotel.price}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-slate-600">{t('hotel_booking.total_for_nights', { count: 5 })}</span>
                  <span className="font-bold text-slate-800">${(hotel.price * 5).toLocaleString()}</span>
                </div>
                <div className="border-t border-primary/20 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{t('hotel_booking.total_price')}</span>
                  <span className="text-2xl font-extrabold text-primary">${(hotel.price * 5).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>{t('hotel_booking.secure_ssl')}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  <span>{t('hotel_booking.verified_payment')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
