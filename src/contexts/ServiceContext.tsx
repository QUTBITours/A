import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getDocuments, 
  getCurrentMonthDocuments 
} from '../firebase/database';
import { 
  ServiceType, 
  ServiceCollections,
  SummaryData,
  FlightBooking,
  HotelReservation,
  CarRental,
  Visa,
  ForeignExchange,
  TourPackage,
  TrainBooking,
  Vajabhat
} from '../types';
import { useAuth } from './AuthContext';

// Define the collection names
const SERVICE_COLLECTIONS: ServiceCollections = {
  flight: 'flightBookings',
  hotel: 'hotelReservations',
  car: 'carRentals',
  visa: 'visaApplications',
  foreignExchange: 'foreignExchanges',
  tourPackage: 'tourPackages',
  train: 'trainBookings',
  vajabhat: 'vajabhats'
};

interface ServiceContextType {
  services: {
    [key in ServiceType]: any[];
  };
  loading: boolean;
  refreshServices: () => Promise<void>;
  summary: SummaryData | null;
  getServiceCollection: (type: ServiceType) => string;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [services, setServices] = useState<{ [key in ServiceType]: any[] }>({
    flight: [],
    hotel: [],
    car: [],
    visa: [],
    foreignExchange: [],
    tourPackage: [],
    train: [],
    vajabhat: []
  });

  const getServiceCollection = (type: ServiceType): string => {
    return SERVICE_COLLECTIONS[type];
  };

  const refreshServices = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Fetch all service data
      const promises = Object.entries(SERVICE_COLLECTIONS).map(async ([type, collection]) => {
        const { documents } = await getDocuments(collection);
        return { type, documents };
      });
      
      const results = await Promise.all(promises);
      
      const newServices = { ...services };
      
      results.forEach(({ type, documents }) => {
        newServices[type as ServiceType] = documents;
      });
      
      setServices(newServices);
      
      // Calculate summary data
      calculateSummary(newServices);
    } catch (error) {
      console.error('Error refreshing services:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const calculateSummary = (serviceData: { [key in ServiceType]: any[] }) => {
    let totalServices = 0;
    let totalCustomerAmount = 0;
    let totalSupplierAmount = 0;
    
    const serviceBreakdown = {
      flight: 0,
      hotel: 0,
      car: 0,
      visa: 0,
      foreignExchange: 0,
      tourPackage: 0,
      train: 0,
      vajabhat: 0
    };
    
    Object.entries(serviceData).forEach(([type, documents]) => {
      const serviceType = type as ServiceType;
      
      serviceBreakdown[serviceType] = documents.length;
      totalServices += documents.length;
      
      documents.forEach((doc) => {
        totalCustomerAmount += Number(doc.customerAmount) || 0;
        totalSupplierAmount += Number(doc.supplierAmount) || 0;
      });
    });
    
    const summaryData: SummaryData = {
      totalServices,
      totalCustomerAmount,
      totalSupplierAmount,
      totalProfit: totalCustomerAmount - totalSupplierAmount,
      serviceBreakdown
    };
    
    setSummary(summaryData);
  };
  
  useEffect(() => {
    if (user) {
      refreshServices();
    }
  }, [user]);

  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        refreshServices,
        summary,
        getServiceCollection
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};