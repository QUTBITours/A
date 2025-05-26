import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, Home, PieChart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const AppLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleServicesMenu = () => {
    setServicesMenuOpen(!servicesMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const serviceLinks = [
    { name: 'Flight Booking', path: '/services/flight' },
    { name: 'Hotel Reservation', path: '/services/hotel' },
    { name: 'Car Rental', path: '/services/car' },
    { name: 'Visa', path: '/services/visa' },
    { name: 'Foreign Exchange', path: '/services/foreign-exchange' },
    { name: 'Tour Packages', path: '/services/tour-package' },
    { name: 'Train Booking', path: '/services/train' },
    { name: 'Vajabhat', path: '/services/vajabhat' },
  ];

  const isServiceRoute = serviceLinks.some(link => location.pathname === link.path);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="QT Holidays" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-blue-600">QT Holidays</h1>
            </div>
            
            {user && (
              <div className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => navigate('/')}
                  className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
                >
                  <Home className="h-4 w-4 mr-1 inline" />
                  Dashboard
                </button>
                
                <div className="relative">
                  <button
                    onClick={toggleServicesMenu}
                    className={`nav-link flex items-center ${isServiceRoute ? 'nav-link-active' : ''}`}
                  >
                    Services
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {servicesMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-slate-200 z-10 animate-fade-in">
                      {serviceLinks.map((link) => (
                        <button
                          key={link.path}
                          onClick={() => {
                            navigate(link.path);
                            setServicesMenuOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${
                            isActive(link.path) ? 'text-blue-600 bg-blue-50' : 'text-slate-700'
                          }`}
                        >
                          {link.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => navigate('/summary')}
                  className={`nav-link ${isActive('/summary') ? 'nav-link-active' : ''}`}
                >
                  <PieChart className="h-4 w-4 mr-1 inline" />
                  Summary
                </button>
                
                <button onClick={handleSignOut} className="btn btn-outline ml-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {mobileMenuOpen && user && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-slide-down">
          <div className="py-2 px-4 space-y-1">
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg ${
                isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
              }`}
            >
              <Home className="h-4 w-4 mr-2 inline" />
              Dashboard
            </button>
            
            <div className="py-2">
              <button
                onClick={toggleServicesMenu}
                className="w-full flex items-center justify-between px-3 py-2 text-slate-700 rounded-lg"
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesMenuOpen && (
                <div className="mt-1 pl-4 border-l-2 border-slate-200 ml-3 space-y-1">
                  {serviceLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => {
                        navigate(link.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 rounded-lg ${
                        isActive(link.path) ? 'text-blue-600' : 'text-slate-600'
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => {
                navigate('/summary');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg ${
                isActive('/summary') ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
              }`}
            >
              <PieChart className="h-4 w-4 mr-2 inline" />
              Summary
            </button>
            
            <button
              onClick={handleSignOut}
              className="w-full text-left py-2 px-3 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2 inline" />
              Sign Out
            </button>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 py-6">
        <div className="container-custom">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="container-custom">
          <div className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} QT Holidays. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;