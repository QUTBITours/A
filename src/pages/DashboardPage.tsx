import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane, 
  Building, 
  Car, 
  Stamp, 
  Banknote, 
  Globe, 
  Train, 
  Receipt,
  TrendingUp
} from 'lucide-react';
import { useServices } from '../contexts/ServiceContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import SummaryCard from '../components/dashboard/SummaryCard';

const DashboardPage: React.FC = () => {
  const { services, summary } = useServices();
  const navigate = useNavigate();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const serviceCards = [
    {
      title: 'Flight Bookings',
      value: services.flight.length,
      icon: Plane,
      color: 'bg-blue-500',
      path: '/services/flight'
    },
    {
      title: 'Hotel Reservations',
      value: services.hotel.length,
      icon: Building,
      color: 'bg-amber-500',
      path: '/services/hotel'
    },
    {
      title: 'Car Rentals',
      value: services.car.length,
      icon: Car,
      color: 'bg-emerald-500',
      path: '/services/car'
    },
    {
      title: 'Visa Applications',
      value: services.visa.length,
      icon: Stamp,
      color: 'bg-red-500',
      path: '/services/visa'
    },
    {
      title: 'Foreign Exchange',
      value: services.foreignExchange.length,
      icon: Banknote,
      color: 'bg-purple-500',
      path: '/services/foreign-exchange'
    },
    {
      title: 'Tour Packages',
      value: services.tourPackage.length,
      icon: Globe,
      color: 'bg-teal-500',
      path: '/services/tour-package'
    },
    {
      title: 'Train Bookings',
      value: services.train.length,
      icon: Train,
      color: 'bg-indigo-500',
      path: '/services/train'
    },
    {
      title: 'Vajabhat',
      value: services.vajabhat.length,
      icon: Receipt,
      color: 'bg-pink-500',
      path: '/services/vajabhat'
    }
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome to QT Holidays Management System</p>
      </div>
      
      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Services (This Month)"
          value={summary?.totalServices || 0}
        />
        <SummaryCard
          title="Revenue"
          value={formatCurrency(summary?.totalCustomerAmount || 0)}
        />
        <SummaryCard
          title="Expenses"
          value={formatCurrency(summary?.totalSupplierAmount || 0)}
        />
        <SummaryCard
          title="Profit"
          value={formatCurrency(summary?.totalProfit || 0)}
          positive={true}
        />
      </div>
      
      {/* Services cards */}
      <div>
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-slate-700 mr-2" />
          <h2 className="text-xl font-semibold text-slate-800">Services</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceCards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              onClick={() => navigate(card.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;