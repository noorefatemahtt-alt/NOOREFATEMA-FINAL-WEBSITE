import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, Clock, ArrowRight, Filter, ChevronDown, Loader2 } from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  logo: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = React.useState<Flight[]>([]);
  const [loading, setLoading] = React.useState(true);
  const searchParams = location.state || {};

  React.useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        // Simulating fetching from Google Sheets
        // In a real scenario, we'd fetch from the published CSV or a proxy API
        const response = await fetch('https://docs.google.com/spreadsheets/d/1N0Mh3B7zSHthFLRS4mWdWOeWetbY-kCA0RsIPSkXYm4/edit?usp=sharing');
        
        // Mocking data for demonstration since the actual sheet might not be accessible via direct fetch
        const mockFlights: Flight[] = [
          {
            id: '1',
            airline: 'Emirates',
            logo: 'https://www.vectorlogo.zone/logos/emirates/emirates-icon.svg',
            from: searchParams.from || 'DAC',
            to: searchParams.to || 'DXB',
            departure: '10:30 AM',
            arrival: '02:45 PM',
            duration: '4h 15m',
            price: 55000
          },
          {
            id: '2',
            airline: 'Qatar Airways',
            logo: 'https://www.vectorlogo.zone/logos/qatarairways/qatarairways-icon.svg',
            from: searchParams.from || 'DAC',
            to: searchParams.to || 'DOH',
            departure: '08:15 PM',
            arrival: '11:30 PM',
            duration: '5h 15m',
            price: 62000
          },
          {
            id: '3',
            airline: 'Biman Bangladesh',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Biman_Bangladesh_Airlines_logo.svg/1200px-Biman_Bangladesh_Airlines_logo.svg.png',
            from: searchParams.from || 'DAC',
            to: searchParams.to || 'LHR',
            departure: '11:00 AM',
            arrival: '05:30 PM',
            duration: '11h 30m',
            price: 85000
          },
          {
            id: '4',
            airline: 'Turkish Airlines',
            logo: 'https://www.vectorlogo.zone/logos/turkishairlines/turkishairlines-icon.svg',
            from: searchParams.from || 'DAC',
            to: searchParams.to || 'IST',
            departure: '06:45 AM',
            arrival: '12:15 PM',
            duration: '8h 30m',
            price: 72000
          }
        ];

        // Artificial delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFlights(mockFlights);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams.from, searchParams.to]);

  const handleBookNow = (flight: Flight) => {
    navigate('/booking', { 
      state: { 
        flight: {
          airline: flight.airline,
          route: `${flight.from} → ${flight.to}`,
          date: searchParams.depart || '2026-04-15',
          price: flight.price
        }
      } 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Search Summary Header */}
      <div className="bg-primary text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="bg-white/10 p-3 rounded-full">
              <Plane className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-3 text-xl font-bold">
                <span>{searchParams.from || 'Dhaka'}</span>
                <ArrowRight className="h-5 w-5 text-accent" />
                <span>{searchParams.to || 'Dubai'}</span>
              </div>
              <div className="text-sm text-white/70 font-medium">
                {searchParams.depart || '15 Apr 2026'} • {searchParams.passengers?.adults || 1} Adult • {searchParams.cabinClass || 'Economy'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-accent hover:text-white transition-colors"
          >
            Modify Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h3>
              <button className="text-xs text-primary font-bold">Reset All</button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Stops</label>
                <div className="space-y-2">
                  {['Non-stop', '1 Stop', '2+ Stops'].map(stop => (
                    <label key={stop} className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-600 group-hover:text-primary">{stop}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-3 block">Airlines</label>
                <div className="space-y-2">
                  {['Emirates', 'Qatar Airways', 'Biman Bangladesh', 'Turkish Airlines'].map(airline => (
                    <label key={airline} className="flex items-center space-x-2 cursor-pointer group">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-600 group-hover:text-primary">{airline}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-500 font-medium">Showing {flights.length} flights found</p>
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 cursor-pointer hover:text-primary">
              <span>Sort by: Cheapest</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm p-20 flex flex-col items-center justify-center space-y-4 border border-slate-100">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">Searching for the best fares...</p>
            </div>
          ) : (
            flights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                  {/* Airline Info */}
                  <div className="flex items-center space-x-4 w-full md:w-48">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg p-2 flex items-center justify-center">
                      <img src={flight.logo} alt={flight.airline} className="max-h-full max-w-full" referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-bold text-slate-800">{flight.airline}</span>
                  </div>

                  {/* Flight Times */}
                  <div className="flex-1 flex items-center justify-between w-full">
                    <div className="text-center md:text-left">
                      <div className="text-xl font-bold text-slate-900">{flight.departure}</div>
                      <div className="text-sm text-slate-500 font-bold">{flight.from}</div>
                    </div>

                    <div className="flex flex-col items-center px-4 flex-1 max-w-[200px]">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{flight.duration}</div>
                      <div className="relative w-full h-[2px] bg-slate-200 flex items-center justify-center">
                        <div className="absolute w-2 h-2 rounded-full bg-slate-300 left-0" />
                        <Plane className="h-4 w-4 text-primary bg-white px-1 z-10" />
                        <div className="absolute w-2 h-2 rounded-full bg-slate-300 right-0" />
                      </div>
                      <div className="text-[10px] font-bold text-primary mt-1">Non-stop</div>
                    </div>

                    <div className="text-center md:text-right">
                      <div className="text-xl font-bold text-slate-900">{flight.arrival}</div>
                      <div className="text-sm text-slate-500 font-bold">{flight.to}</div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="w-full md:w-48 flex flex-col items-center md:items-end space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    <div className="text-2xl font-extrabold text-primary">
                      <span className="text-sm font-bold mr-1">BDT</span>
                      {flight.price.toLocaleString()}
                    </div>
                    <button 
                      onClick={() => handleBookNow(flight)}
                      className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-primary/10"
                    >
                      Book Now
                    </button>
                    <p className="text-[10px] text-slate-400 font-bold">Partial payment available</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
