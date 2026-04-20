import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hajj from './pages/Hajj';
import Umrah from './pages/Umrah';
import Hotels from './pages/Hotels';
import Contact from './pages/Contact';
import Results from './pages/Results';
import HotelResults from './pages/HotelResults';
import HotelBooking from './pages/HotelBooking';
import Booking from './pages/Booking';
import Visa from './pages/Visa';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import PackageBooking from './pages/PackageBooking';
import { AuthProvider } from './contexts/AuthContext';

// Helper component to handle scrolling to hash
function ScrollToHash() {
  const { hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      let element = document.getElementById(targetId);
      
      // If the hash is a search tab, scroll to the search section
      const searchTabs = ['flights', 'hotels', 'tours', 'explore', 'esim'];
      if (!element && searchTabs.includes(targetId)) {
        element = document.getElementById('search-section');
      }

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToHash />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/hajj" element={<Hajj />} />
              <Route path="/umrah" element={<Umrah />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/results" element={<Results />} />
              <Route path="/hotel-results" element={<HotelResults />} />
              <Route path="/hotel-booking" element={<HotelBooking />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/visa" element={<Visa />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/package-booking" element={<PackageBooking />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
