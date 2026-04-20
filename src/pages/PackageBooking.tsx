import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Calendar, 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Clock,
  Loader2,
  MapPin
} from 'lucide-react';
import { scanPassport } from '../lib/passportScanner';

export default function PackageBooking() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'bn';
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(1800); // 30 minutes

  const pkg = location.state?.package;
  const packageType = location.state?.type || 'Package';

  React.useEffect(() => {
    if (!pkg) {
      navigate('/');
    }
  }, [pkg, navigate]);

  React.useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, submitted]);

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
    phone: '',
    email: '',
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
        packageDetails: pkg,
        packageType,
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
      const message = `*New ${packageType} Booking Request*\n\n` +
        `*Package:* ${pkg.title}\n` +
        `*Passenger:* ${formData.title} ${formData.firstName} ${formData.lastName}\n` +
        `*Passport No:* ${formData.passportNumber}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Email:* ${formData.email}\n` +
        `*Price:* ৳${pkg.price.toLocaleString()}\n\n` +
        `_Please confirm my booking._`;

      const whatsappUrl = `https://wa.me/01842705790?text=${encodeURIComponent(message)}`;
      
      setSubmitted(true);
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);

    } catch (error) {
      console.error('Booking error:', error);
      alert(isBn ? 'কিছু ভুল হয়েছে। আবার চেষ্টা করুন।' : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!pkg) return null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">
            {isBn ? 'বুকিং রিকোয়েস্ট সফল!' : 'Booking Request Successful!'}
          </h2>
          <p className="text-slate-500 mb-8">
            {isBn 
              ? 'আপনার বুকিং রিকোয়েস্ট গ্রহণ করা হয়েছে। পেমেন্ট কনফার্মেশনের জন্য আপনাকে হোয়াটসঅ্যাপে রিডাইরেক্ট করা হচ্ছে...' 
              : 'Your booking request has been received. Redirecting to WhatsApp for payment confirmation...'}
          </p>
          <button 
            onClick={() => navigate('/')}
            className="text-primary font-bold hover:underline"
          >
            {isBn ? 'হোম পেজে ফিরে যান' : 'Return to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">{isBn ? 'ফিরে যান' : 'Go Back'}</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            {isBn ? 'প্যাকেজ বুকিং' : 'Package Booking'}
          </h1>
          <div className="flex items-center space-x-4 text-white/90 bg-white/10 w-fit px-4 py-2 rounded-lg backdrop-blur-sm">
            <Clock className="h-5 w-5" />
            <span className="font-medium">
              {isBn ? 'বুকিং সম্পন্ন করতে সময় বাকি:' : 'Time left to complete booking:'} <span className="font-bold text-accent">{formatTime(timeLeft)}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Package Summary Sidebar */}
          <div className="bg-slate-900 text-white p-6 md:p-8 md:w-1/3 flex flex-col">
            <h3 className="text-lg font-bold text-white/80 uppercase tracking-wider mb-6">
              {isBn ? 'প্যাকেজ বিবরণ' : 'Package Details'}
            </h3>
            
            <div className="space-y-6 flex-grow">
              <div>
                <p className="text-sm text-slate-400 mb-1">{isBn ? 'প্যাকেজের নাম' : 'Package Name'}</p>
                <p className="font-bold text-lg">{pkg.title}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-400 mb-1">{isBn ? 'সময়কাল' : 'Duration'}</p>
                <p className="font-bold flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-accent" />
                  {pkg.duration}
                </p>
              </div>

              {pkg.hotelMakkah && (
                <div>
                  <p className="text-sm text-slate-400 mb-1">{isBn ? 'মক্কা হোটেল' : 'Makkah Hotel'}</p>
                  <p className="font-bold flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-accent" />
                    {pkg.hotelMakkah}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-slate-400 mb-2">{isBn ? 'মোট মূল্য' : 'Total Price'}</p>
              <p className="text-3xl font-black text-accent">৳{pkg.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="p-6 md:p-8 md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Passenger Details */}
              <section>
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-primary" />
                  {isBn ? 'যাত্রীর তথ্য' : 'Passenger Details'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 flex space-x-4">
                    <div className="w-1/3">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'টাইটেল' : 'Title'}</label>
                      <select 
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </select>
                    </div>
                    <div className="w-2/3">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'নামের প্রথমাংশ' : 'First Name'}</label>
                      <input
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder={isBn ? 'পাসপোর্ট অনুযায়ী' : 'As per passport'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors uppercase"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'নামের শেষাংশ' : 'Last Name'}</label>
                    <input
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder={isBn ? 'পাসপোর্ট অনুযায়ী' : 'As per passport'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors uppercase"
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
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'ফোন নম্বর' : 'Phone Number'}</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder={isBn ? 'আপনার ফোন নম্বর দিন' : 'Enter your phone number'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'ইমেইল এড্রেস' : 'Email Address'}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={isBn ? 'আপনার ইমেইল দিন' : 'Enter your email'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                    />
                  </div>

                </div>
              </section>

              {/* Payment Section */}
              <section className="pt-8 border-t border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                  <ShieldCheck className="h-6 w-6 mr-3 text-primary" />
                  {isBn ? 'পেমেন্ট' : 'Payment'}
                </h3>

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
                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                          formData.paymentMethod === method.id 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-slate-200 hover:border-primary/50 bg-white'
                        }`}
                      >
                        <img src={method.logo} alt={method.name} className="h-8 object-contain mb-2" />
                        <span className={`text-sm font-bold ${
                          formData.paymentMethod === method.id ? 'text-primary' : 'text-slate-600'
                        }`}>
                          {method.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'কার্ড নম্বর' : 'Card Number'}</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{isBn ? 'মেয়াদ' : 'Expiry'}</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-semibold outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <button
                type="submit"
                disabled={loading || timeLeft === 0 || isScanning}
                className="w-full bg-primary hover:bg-secondary text-white py-5 rounded-xl font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                    <span>{isBn ? 'প্রসেস হচ্ছে...' : 'Processing...'}</span>
                  </div>
                ) : (
                  <span>{isBn ? 'বুকিং নিশ্চিত করুন' : 'Confirm Booking'}</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
