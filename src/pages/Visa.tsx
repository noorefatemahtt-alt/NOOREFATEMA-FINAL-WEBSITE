import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  User, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Loader2, 
  ArrowLeft,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Visa() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    applicantName: '',
    passportNumber: '',
    visaType: 'Tourist',
    expiryDate: ''
  });

  const visaTypes = [
    'Tourist',
    'Business',
    'Student',
    'Work',
    'Transit',
    'Family Visit'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        serviceType: 'Visa Application',
        timestamp: new Date().toISOString()
      };

      // Simulating Google Sheets POST (using the same placeholder as before)
      await fetch('https://docs.google.com/spreadsheets/d/1N0Mh3B7zSHthFLRS4mWdWOeWetbY-kCA0RsIPSkXYm4/edit?usp=sharing', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // WhatsApp Redirection for Visa
      const message = `*New Visa Application - Noore Fatema Travels*\n\n` +
        `*Applicant:* ${formData.applicantName}\n` +
        `*Passport:* ${formData.passportNumber}\n` +
        `*Visa Type:* ${formData.visaType}\n` +
        `*Passport Expiry:* ${formData.expiryDate}\n\n` +
        `_Please process my visa application._`;

      const whatsappUrl = `https://wa.me/01842705790?text=${encodeURIComponent(message)}`;
      
      setSubmitted(true);
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);

    } catch (error) {
      console.error('Visa application error:', error);
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('visa.success_title')}</h2>
          <p className="text-slate-600 mb-8">
            {t('visa.success_msg')}
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
            {t('nav.home')}
          </button>
          <h1 className="text-3xl font-bold">{t('visa.title')}</h1>
          <p className="text-white/70">{t('visa.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-lg text-slate-900">{t('visa.form_title')}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('visa.name')}</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    required
                    value={formData.applicantName}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicantName: e.target.value }))}
                    placeholder="e.g. John Doe (As per passport)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('visa.passport')}</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    required
                    value={formData.passportNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value }))}
                    placeholder="e.g. A01234567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('visa.type')}</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <select
                    required
                    value={formData.visaType}
                    onChange={(e) => setFormData(prev => ({ ...prev, visaType: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-semibold outline-none focus:border-primary transition-colors appearance-none"
                  >
                    {visaTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">{t('visa.expiry')}</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-white py-5 rounded-2xl font-bold text-xl mt-12 shadow-xl shadow-primary/20 transition-all flex items-center justify-center space-x-3 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>{t('visa.processing')}</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-6 w-6" />
                  <span>{t('visa.submit')}</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                <span className="text-sm text-slate-600">99% Visa Approval Success Rate</span>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                <span className="text-sm text-slate-600">Fast & Secure Processing</span>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                <span className="text-sm text-slate-600">Document Verification Support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
