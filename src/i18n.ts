import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "flights": "Flights",
        "hajj": "Hajj",
        "umrah": "Umrah",
        "hotels": "Hotels",
        "visa": "Visa",
        "tours": "Tours",
        "explore": "Explore",
        "contact": "Contact",
        "login": "Login",
        "signup": "Sign Up",
        "logout": "Logout"
      },
      "hero": {
        "title": "Noor e Fatema Hajj Kafela",
        "subtitle": "Manage your Hajj and Umrah journeys seamlessly with Noor e Fatema Hajj Kafela. Plan your pilgrimage, track expenses, and stay organized.",
        "search_flights": "Search Flights"
      },
      "home": {
        "popular_destinations": "Popular Destinations",
        "popular_subtitle": "Handpicked locations for your next adventure",
        "view_all": "View All Destinations",
        "starts_from": "Starts from",
        "why_book": "Why Book With Us?",
        "why_subtitle": "We provide the best travel services with a focus on customer satisfaction, safety, and seamless pilgrimage experiences.",
        "global_reach": "Global Reach",
        "global_desc": "Access to over 500+ airlines and 1 million+ hotels worldwide for your perfect journey.",
        "safe_secure": "Safe & Secure",
        "safe_desc": "Your data and payments are protected by industry-standard encryption and secure gateways.",
        "expert_support": "Expert Support",
        "expert_desc": "Our travel experts are available 24/7 to assist with your bookings and pilgrimage needs."
      },
      "search": {
        "flights": "Flights",
        "hotels": "Hotels",
        "visa": "Visa",
        "tours": "Tours",
        "explore": "Explore",
        "esim": "E-Sim",
        "one_way": "One Way",
        "round_trip": "Round Trip",
        "multi_city": "Multi City",
        "from": "Journey From",
        "to": "Journey To",
        "depart": "Departing",
        "return": "Returning",
        "passengers": "Passengers",
        "adult": "Adult (12+)",
        "child": "Child (2-11)",
        "infant": "Infant (<2)",
        "child_dob_warning": "If the actual date of birth is not entered, the fare may change.",
        "same_route_error": "Journey From and Journey To locations cannot be the same.",
        "destination": "Destination",
        "destination_placeholder": "Where are you going?",
        "from_placeholder": "Select departure city",
        "to_placeholder": "Select destination city",
        "date_placeholder": "Select date",
        "check_in": "Check-in",
        "check_out": "Check-out",
        "guests": "Guests",
        "search_hotels": "Search Hotels"
      },
      "hotel_booking": {
        "title": "Hotel Booking",
        "guest_info": "Guest Information",
        "first_name": "First Name",
        "last_name": "Last Name",
        "email": "Email Address",
        "phone": "Phone Number",
        "special_requests": "Special Requests (Optional)",
        "payment_info": "Payment Details (Simulated)",
        "card_number": "Card Number",
        "expiry_date": "Expiry Date",
        "cvv": "CVV",
        "title_label": "Title",
        "back_to_results": "Back to Results",
        "booking_summary": "Booking Summary",
        "check_in": "Check-in",
        "check_out": "Check-out",
        "guests_label": "Guests",
        "duration": "Duration",
        "price_per_night": "Price per night",
        "total_for_nights": "Total for {{count}} nights",
        "total_price": "Total Price",
        "secure_ssl": "Secure SSL Encryption",
        "verified_payment": "Verified Payment Gateway",
        "confirm": "Confirm Reservation",
        "book_now": "Book Now",
        "modify_search": "Modify Search",
        "hotels_in": "Hotels in",
        "any_date": "Any Date",
        "guests_count": "Guest(s)",
        "success_title": "Booking Received!",
        "success_msg": "Your hotel booking details have been sent. We are redirecting you to WhatsApp for final confirmation and payment."
      },
      "footer": {
        "about": "Your trusted partner for seamless travel experiences. We provide premium flight bookings, hotel reservations, and visa assistance worldwide.",
        "quick_links": "Quick Links",
        "services": "Services",
        "contact": "Contact Us"
      },
      "visa": {
        "title": "Visa Assistance",
        "subtitle": "Expert guidance for your global travel documentation.",
        "form_title": "Visa Application Form",
        "name": "Applicant Full Name",
        "passport": "Passport Number",
        "type": "Visa Type",
        "expiry": "Passport Expiry Date",
        "submit": "Submit Application",
        "processing": "Processing...",
        "success_title": "Application Received!",
        "success_msg": "Your visa application details have been sent. We are redirecting you to WhatsApp for further documents and payment."
      }
    }
  },
  bn: {
    translation: {
      "nav": {
        "home": "হোম",
        "flights": "ফ্লাইট",
        "hajj": "হজ্ব",
        "umrah": "ওমরাহ",
        "hotels": "হোটেল",
        "visa": "ভিসা",
        "tours": "ট্যুর",
        "explore": "এক্সপ্লোর",
        "contact": "যোগাযোগ",
        "login": "লগইন",
        "signup": "সাইন আপ",
        "logout": "লগআউট"
      },
      "hero": {
        "title": "নূর এ ফাতেমা হজ কাফেলা",
        "subtitle": "নূর এ ফাতেমা হজ কাফেলার সাথে আপনার হজ এবং ওমরাহ যাত্রা নিরবিচ্ছিন্নভাবে পরিচালনা করুন। আপনার তীর্থযাত্রার পরিকল্পনা করুন এবং সংগঠিত থাকুন।",
        "search_flights": "ফ্লাইট খুঁজুন"
      },
      "home": {
        "popular_destinations": "জনপ্রিয় গন্তব্যসমূহ",
        "popular_subtitle": "আপনার পরবর্তী ভ্রমণের জন্য আমাদের সেরা পছন্দসমূহ",
        "view_all": "সবগুলো দেখুন",
        "starts_from": "শুরু হচ্ছে",
        "why_book": "কেন আমাদের সাথে বুক করবেন?",
        "why_subtitle": "আমরা গ্রাহক সন্তুষ্টি, নিরাপত্তা এবং নিরবিচ্ছিন্ন তীর্থযাত্রার অভিজ্ঞতার উপর ফোকাস করে সেরা ভ্রমণ পরিষেবা প্রদান করি।",
        "global_reach": "বিশ্বব্যাপী সেবা",
        "global_desc": "আপনার নিখুঁত ভ্রমণের জন্য ৫০০+ এয়ারলাইনস এবং ১০ লক্ষ+ হোটেলের অ্যাক্সেস।",
        "safe_secure": "নিরাপদ ও সুরক্ষিত",
        "safe_desc": "আপনার তথ্য এবং পেমেন্ট ইন্ডাস্ট্রি-স্ট্যান্ডার্ড এনক্রিপশন এবং নিরাপদ গেটওয়ে দ্বারা সুরক্ষিত।",
        "expert_support": "বিশেষজ্ঞ সাপোর্ট",
        "expert_desc": "আপনার বুকিং এবং তীর্থযাত্রার প্রয়োজনে আমাদের ভ্রমণ বিশেষজ্ঞরা ২৪/৭ উপলব্ধ।"
      },
      "search": {
        "flights": "ফ্লাইট",
        "hotels": "হোটেল",
        "visa": "ভিসা",
        "tours": "ট্যুর",
        "explore": "এক্সপ্লোর",
        "esim": "ই-সিম",
        "one_way": "ওয়ান ওয়ে",
        "round_trip": "রাউন্ড ট্রিপ",
        "multi_city": "মাল্টি সিটি",
        "from": "যাত্রা শুরু",
        "to": "গন্তব্য",
        "depart": "যাত্রার তারিখ",
        "return": "ফেরার তারিখ",
        "passengers": "যাত্রী সংখ্যা",
        "adult": "প্রাপ্তবয়স্ক (১২+)",
        "child": "শিশু (২-১১)",
        "infant": "নবজাতক (<২)",
        "child_dob_warning": "যদি সঠিক জন্ম তারিখ না দেয়া হয়, তবে ভাড়ার পরিবর্তন হতে পারে।",
        "same_route_error": "যাত্রা শুরু এবং গন্তব্য একই হতে পারে না।",
        "destination": "গন্তব্য",
        "destination_placeholder": "আপনি কোথায় যাচ্ছেন?",
        "from_placeholder": "যাত্রার শহর নির্বাচন করুন",
        "to_placeholder": "গন্তব্য শহর নির্বাচন করুন",
        "date_placeholder": "তারিখ নির্বাচন করুন",
        "check_in": "চেক-ইন",
        "check_out": "চেক-আউট",
        "guests": "অতিথি সংখ্যা",
        "search_hotels": "হোটেল খুঁজুন"
      },
      "hotel_booking": {
        "title": "হোটেল বুকিং",
        "guest_info": "অতিথির তথ্য",
        "first_name": "প্রথম নাম",
        "last_name": "শেষ নাম",
        "email": "ইমেইল ঠিকানা",
        "phone": "ফোন নম্বর",
        "special_requests": "বিশেষ অনুরোধ (ঐচ্ছিক)",
        "payment_info": "পেমেন্টের বিবরণ (সিমুলেটেড)",
        "card_number": "কার্ড নম্বর",
        "expiry_date": "মেয়াদ শেষ হওয়ার তারিখ",
        "cvv": "সিভিভি (CVV)",
        "title_label": "পদবি",
        "back_to_results": "ফলাফলে ফিরে যান",
        "booking_summary": "বুকিং সারাংশ",
        "check_in": "চেক-ইন",
        "check_out": "চেক-out",
        "guests_label": "অতিথি",
        "duration": "সময়কাল",
        "price_per_night": "প্রতি রাতের মূল্য",
        "total_for_nights": "{{count}} রাতের মোট মূল্য",
        "total_price": "মোট মূল্য",
        "secure_ssl": "নিরাপদ SSL এনক্রিপশন",
        "verified_payment": "যাচাইকৃত পেমেন্ট গেটওয়ে",
        "confirm": "রিজার্ভেশন নিশ্চিত করুন",
        "book_now": "বুক করুন",
        "modify_search": "সার্চ পরিবর্তন করুন",
        "hotels_in": "হোটেল সমূহ",
        "any_date": "যেকোনো তারিখ",
        "guests_count": "অতিথি",
        "success_title": "বুকিং গ্রহণ করা হয়েছে!",
        "success_msg": "আপনার হোটেল বুকিংয়ের বিবরণ পাঠানো হয়েছে। আমরা আপনাকে চূড়ান্ত নিশ্চিতকরণ এবং পেমেন্টের জন্য হোয়াটসঅ্যাপে রিডাইরেক্ট করছি।"
      },
      "footer": {
        "about": "আপনার ভ্রমণের অভিজ্ঞতাকে সহজ করতে আমরা আপনার বিশ্বস্ত সঙ্গী। আমরা বিশ্বব্যাপী প্রিমিয়াম ফ্লাইট বুকিং, হোটেল রিজার্ভেশন এবং ভিসা সহায়তা প্রদান করি।",
        "quick_links": "দ্রুত লিঙ্ক",
        "services": "সেবা সমূহ",
        "contact": "যোগাযোগ করুন"
      },
      "visa": {
        "title": "ভিসা সহায়তা",
        "subtitle": "আপনার বৈশ্বিক ভ্রমণ নথিপত্রের জন্য বিশেষজ্ঞ নির্দেশিকা।",
        "form_title": "ভিসা আবেদন ফর্ম",
        "name": "আবেদনকারীর পূর্ণ নাম",
        "passport": "পাসপোর্ট নম্বর",
        "type": "ভিসার ধরণ",
        "expiry": "পাসপোর্টের মেয়াদ শেষ হওয়ার তারিখ",
        "submit": "আবেদন জমা দিন",
        "processing": "প্রক্রিয়াকরণ হচ্ছে...",
        "success_title": "আবেদন গ্রহণ করা হয়েছে!",
        "success_msg": "আপনার ভিসার আবেদনের বিবরণ পাঠানো হয়েছে। আমরা আপনাকে পরবর্তী নথি এবং পেমেন্টের জন্য হোয়াটসঅ্যাপে রিডাইরেক্ট করছি।"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
