import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'bn';
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send this to a server
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border border-slate-100 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {isBn ? 'বার্তা পাঠানো হয়েছে!' : 'Message Sent!'}
          </h2>
          <p className="text-slate-600 mb-8">
            {isBn ? 'আপনার বার্তার জন্য ধন্যবাদ। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।' : 'Thank you for your message. We will get back to you soon.'}
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-colors"
          >
            {isBn ? 'আবার পাঠান' : 'Send Another'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative min-h-[350px] md:h-[450px] w-full overflow-hidden flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=2000" 
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4 py-12 md:py-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              {isBn ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact Us'}
            </h1>
            <div className="h-2 w-32 bg-accent mx-auto rounded-full mb-8" />
            <p className="text-lg md:text-2xl text-white/95 font-medium drop-shadow-lg leading-relaxed">
              {isBn ? 'আপনার যেকোনো প্রশ্ন বা জিজ্ঞাসার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা আপনাকে সাহায্য করতে প্রস্তুত।' : 'Get in touch with us for any questions or inquiries. We are ready to help you.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 md:-mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-slate-100 h-full">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-8 md:mb-10 flex items-center">
                <span className="w-2 h-6 bg-accent rounded-full mr-3" />
                {isBn ? 'যোগাযোগের তথ্য' : 'Contact Information'}
              </h3>
              
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start space-x-4 md:space-x-5 group">
                  <div className="bg-primary/10 p-3 md:p-4 rounded-2xl group-hover:bg-primary group-hover:rotate-12 transition-all duration-300 shadow-lg shrink-0">
                    <Phone className="h-6 w-6 md:h-7 md:h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{isBn ? 'ফোন' : 'Phone'}</p>
                    <p className="text-lg md:text-xl font-black text-slate-800 break-words">01842705790</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 md:space-x-5 group">
                  <div className="bg-primary/10 p-3 md:p-4 rounded-2xl group-hover:bg-primary group-hover:rotate-12 transition-all duration-300 shadow-lg shrink-0">
                    <Mail className="h-6 w-6 md:h-7 md:h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{isBn ? 'ইমেইল' : 'Email'}</p>
                    <p className="text-lg md:text-xl font-black text-slate-800 break-all">info@noorefatematravels.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 md:space-x-5 group">
                  <div className="bg-primary/10 p-3 md:p-4 rounded-2xl group-hover:bg-primary group-hover:rotate-12 transition-all duration-300 shadow-lg shrink-0">
                    <MapPin className="h-6 w-6 md:h-7 md:h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{isBn ? 'ঠিকানা' : 'Address'}</p>
                    <p className="text-lg md:text-xl font-black text-slate-800">
                      {isBn ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 md:space-x-5 group">
                  <div className="bg-primary/10 p-3 md:p-4 rounded-2xl group-hover:bg-primary group-hover:rotate-12 transition-all duration-300 shadow-lg shrink-0">
                    <Clock className="h-6 w-6 md:h-7 md:h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{isBn ? 'অফিস সময়' : 'Office Hours'}</p>
                    <p className="text-lg md:text-xl font-black text-slate-800">
                      {isBn ? 'শনি - বৃহস্পতি: সকাল ১০টা - রাত ৮টা' : 'Sat - Thu: 10 AM - 8 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 shadow-2xl border border-slate-100">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-8 md:mb-10 flex items-center">
                <span className="w-2 h-6 bg-accent rounded-full mr-3" />
                {isBn ? 'আমাদের বার্তা পাঠান' : 'Send Us a Message'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider ml-1">{isBn ? 'আপনার নাম' : 'Your Name'}</label>
                    <input
                      required
                      type="text"
                      placeholder={isBn ? 'যেমন: জন ডো' : 'e.g. John Doe'}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 md:p-5 font-bold outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider ml-1">{isBn ? 'ইমেইল ঠিকানা' : 'Email Address'}</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 md:p-5 font-bold outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider ml-1">{isBn ? 'বিষয়' : 'Subject'}</label>
                  <input
                    required
                    type="text"
                    placeholder={isBn ? 'কি বিষয়ে জানতে চান?' : 'What is this about?'}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 md:p-5 font-bold outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-wider ml-1">{isBn ? 'বার্তা' : 'Message'}</label>
                  <textarea
                    required
                    placeholder={isBn ? 'আপনার বার্তা এখানে লিখুন...' : 'Write your message here...'}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 md:p-5 font-bold outline-none focus:border-primary focus:bg-white transition-all h-40 md:h-48 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-5 md:py-6 rounded-[1.5rem] font-black text-lg md:text-xl transition-all flex items-center justify-center space-x-4 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01]"
                >
                  <Send className="h-6 w-6 md:h-7 md:h-7" />
                  <span>{isBn ? 'বার্তা পাঠান' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
