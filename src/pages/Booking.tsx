import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Plane, 
  User, 
  Calendar, 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Loader2,
  Clock
} from 'lucide-react';
import { scanPassport } from '../lib/passportScanner';

export default function Booking() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'bn';
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(1800); // 30 minutes in seconds

  const queryParams = new URLSearchParams(location.search);
  const flight = location.state?.flight || {
    airline: queryParams.get('airline') || 'Emirates',
    route: queryParams.get('route') || 'DAC → DXB',
    date: queryParams.get('date') || '2026-04-15',
    departureTime: queryParams.get('departureTime') || '10:30 AM',
    arrivalTime: queryParams.get('arrivalTime') || '02:00 PM',
    price: parseInt(queryParams.get('price') || '55000')
  };

  React.useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      alert(isBn ? 'বুকিংয়ের সময় শেষ হয়ে গেছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Booking time has expired. Please try again.');
      navigate('/flights');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, navigate, isBn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const [formData, setFormData] = React.useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    dob: '',
    passportNumber: '',
    issueDate: '',
    expiryDate: '',
    passportBase64: '',
    paymentMethod: 'bkash'
  });

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', logo: 'https://www.logo.wine/a/logo/BKash/BKash-Logo.wine.svg' },
    { id: 'nagad', name: 'Nagad', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png' },
    { id: 'card', name: 'Card', logo: 'https://www.logo.wine/a/logo/Visa_Inc./Visa_Inc.-Logo.wine.svg' }
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setIsScanning(true);
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const extractedData = await scanPassport(base64String, file.type);
          
          if (extractedData) {
            setFormData(prev => ({ 
              ...prev, 
              passportBase64: base64String,
              firstName: extractedData.firstName || prev.firstName,
              lastName: extractedData.lastName || prev.lastName,
              passportNumber: extractedData.passportNumber || prev.passportNumber,
              dob: extractedData.dob || prev.dob,
              issueDate: extractedData.issueDate || prev.issueDate,
              expiryDate: extractedData.expiryDate || prev.expiryDate
            }));
            alert(isBn ? 'পাসপোর্ট স্ক্যান সফল হয়েছে এবং তথ্য স্বয়ংক্রিয়ভাবে পূরণ করা হয়েছে।' : 'Passport scanned successfully and information auto-filled.');
          } else {
            throw new Error("No data extracted");
          }
        } catch (error) {
          console.error("Scanning failed:", error);
          setFormData(prev => ({ ...prev, passportBase64: base64String }));
          alert(isBn ? 'পাসপোর্ট স্ক্যান করতে সমস্যা হয়েছে। দয়া করে ম্যানুয়ালি তথ্য দিন।' : 'Failed to scan passport. Please enter details manually.');
        } finally {
          setIsScanning(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        flightDetails: flight,
        timestamp: new Date().toISOString()
      };

      // Simulating Google Sheets POST
      await fetch('https://docs.google.com/spreadsheets/d/1N0Mh3B7zSHthFLRS4mWdWOeWetbY-kCA0RsIPSkXYm4/edit?usp=sharing', {
        method: 'POST',
        mode: 'no-cors', // Typical for Apps Script webhooks
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // WhatsApp Redirection
      const message = `*New Booking Request - Noore Fatema Travels*\n\n` +
        `*Passenger:* ${formData.title} ${formData.firstName} ${formData.lastName}\n` +
        `*Passport No:* ${formData.passportNumber}\n` +
        `*DOB:* ${formData.dob}\n` +
        `*Passport Issue:* ${formData.issueDate}\n` +
        `*Passport Expiry:* ${formData.expiryDate}\n` +
        `*Route:* ${flight.route}\n` +
        `*Date:* ${flight.date}\n` +
        `*Price:* BDT ${flight.price.toLocaleString()}\n` +
        `*Payment Method:* ${formData.paymentMethod.toUpperCase()}\n\n` +
        `_Please confirm my booking._`;

      const whatsappUrl = `https://wa.me/01842705790?text=${encodeURIComponent(message)}`;
      
      // Show success UI first
      setSubmitted(true);
      
      // Auto-redirect after 2 seconds
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 text-center border border-slate-100 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">
            {isBn ? 'বুকিং অনুরোধ সফল!' : 'Booking Request Successful!'}
          </h2>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            {isBn 
              ? 'আপনার বুকিং অনুরোধটি গ্রহণ করা হয়েছে। পেমেন্ট এবং কনফার্মেশনের জন্য আপনাকে এখন হোয়াটসঅ্যাপে পাঠানো হচ্ছে।' 
              : 'Your booking request has been received. You are now being redirected to WhatsApp for payment and final confirmation.'}
          </p>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">{isBn ? 'যাত্রী' : 'Passenger'}</span>
                <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">{isBn ? 'মোট মূল্য' : 'Total Amount'}</span>
                <span className="font-black text-primary">BDT {flight.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
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
            Back to Results
          </button>
          <h1 className="text-3xl font-bold">{isBn ? 'যাত্রীর বিবরণ' : 'Passenger Details'}</h1>
          <div className="flex items-center justify-between mt-2">
            <p className="text-white/70">{isBn ? 'অনুগ্রহ করে আপনার পাসপোর্টে যেভাবে আছে সেভাবে তথ্য প্রদান করুন।' : 'Please enter the details exactly as shown on your passport.'}</p>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full border border-white/20">
              <Clock className="h-4 w-4 text-white animate-pulse" />
              <span className="font-mono font-bold text-white">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 space-y-8">
        {/* Summary at Top */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">{isBn ? 'এয়ারলাইন' : 'Airline'}</p>
                  <p className="font-bold text-slate-800">{flight.airline}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">{isBn ? 'রুট' : 'Route'}</p>
                  <p className="font-bold text-slate-800">{flight.route}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">{isBn ? 'ভ্রমণের তারিখ' : 'Travel Date'}</p>
                  <p className="font-bold text-slate-800">{flight.date}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">{isBn ? 'সময়' : 'Time'}</p>
                  <p className="font-bold text-slate-800 text-sm">{flight.departureTime} - {flight.arrivalTime}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 md:w-72">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600">{isBn ? 'ভাড়া' : 'Base Fare'}</span>
                <span className="font-bold text-slate-800">BDT {flight.price.toLocaleString()}</span>
              </div>
              <div className="border-t border-primary/20 pt-2 flex justify-between items-center">
                <span className="text-lg font-bold text-primary">{isBn ? 'মোট মূল্য' : 'Total Price'}</span>
                <span className="text-xl font-extrabold text-primary">BDT {flight.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-4">
            <User className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-lg text-slate-900">{isBn ? 'যাত্রী ১ (প্রাপ্তবয়স্ক)' : 'Passenger 1 (Adult)'}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'পদবী' : 'Title'}</label>
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
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'প্রথম নাম' : 'First Name'}</label>
              <input
                required
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder={isBn ? 'যেমন: জন' : 'e.g. John'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'শেষ নাম' : 'Last Name'}</label>
              <input
                required
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder={isBn ? 'যেমন: ডো' : 'e.g. Doe'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'জন্ম তারিখ' : 'Date of Birth'}</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="date"
                  required
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.dob}
                  onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'পাসপোর্ট নম্বর' : 'Passport Number'}</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  required
                  value={formData.passportNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value }))}
                  placeholder={isBn ? 'যেমন: A1234567' : 'e.g. A1234567'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'পাসপোর্ট ইস্যু তারিখ' : 'Passport Issue Date'}</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="date"
                  required
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.issueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'পাসপোর্ট মেয়াদ শেষ তারিখ' : 'Passport Expiry Date'}</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{isBn ? 'পাসপোর্ট আপলোড (ছবি/পিডিএফ)' : 'Passport Upload (Image/PDF)'}</label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary transition-colors group cursor-pointer">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  disabled={isScanning}
                  className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div className="flex flex-col items-center">
                  <div className="bg-slate-100 p-4 rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                    {isScanning ? (
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    ) : (
                      <Upload className="h-8 w-8 text-slate-400 group-hover:text-primary" />
                    )}
                  </div>
                  <p className="font-bold text-slate-700">
                    {isScanning 
                      ? (isBn ? 'পাসপোর্ট স্ক্যান করা হচ্ছে...' : 'Scanning passport...') 
                      : formData.passportBase64 
                        ? (isBn ? 'ফাইল নির্বাচন করা হয়েছে' : 'File selected') 
                        : (isBn ? 'পাসপোর্ট আপলোড করতে ক্লিক করুন বা ড্র্যাগ করুন' : 'Click or drag to upload passport')}
                  </p>
                  {!isScanning && <p className="text-xs text-slate-400 mt-1">{isBn ? 'সর্বোচ্চ ফাইল সাইজ: ৫ এমবি (আপলোড করলে তথ্য অটো-ফিলাপ হবে)' : 'Max file size: 5MB (Upload to auto-fill info)'}</p>}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">
                {isBn ? 'পেমেন্ট পদ্ধতি নির্বাচন করুন' : 'Select Payment Method'}
              </label>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                    className={`relative p-3 md:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${
                      formData.paymentMethod === method.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-slate-100 bg-slate-50 hover:border-primary/30'
                    }`}
                  >
                    <div className="h-8 md:h-12 w-full flex items-center justify-center">
                      <img 
                        src={method.logo} 
                        alt={method.name} 
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${
                      formData.paymentMethod === method.id ? 'text-primary' : 'text-slate-400'
                    }`}>
                      {method.name}
                    </span>
                    {formData.paymentMethod === method.id && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white p-1 rounded-full shadow-lg">
                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500 font-medium italic">
                {isBn 
                  ? '* বুকিং নিশ্চিত করার পর আপনাকে পেমেন্ট সম্পন্ন করার জন্য আমাদের প্রতিনিধি যোগাযোগ করবেন।' 
                  : '* Our representative will contact you to complete the payment after booking confirmation.'}
              </p>
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
                <span>{isBn ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'Processing...'}</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-6 w-6" />
                <span>{isBn ? 'বুকিং নিশ্চিত করুন' : 'Confirm Booking'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
