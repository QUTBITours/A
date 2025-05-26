import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface BaseServiceData {
  id?: string;
  customerAmount: number;
  supplierAmount: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface FlightBooking extends BaseServiceData {
  fromLocation: string;
  toLocation: string;
  flightDate: Timestamp | Date;
  sector: string;
  tourManagerAmount: number;
  carAmount: number;
}

export interface HotelReservation extends BaseServiceData {
  hotelName: string;
  checkInDate: Timestamp | Date;
  checkOutDate: Timestamp | Date;
}

export interface CarRental extends BaseServiceData {
  destination: string;
  rentalDate: Timestamp | Date;
  seaters: number;
}

export interface Visa extends BaseServiceData {
  country: string;
  applicationDate: Timestamp | Date;
}

export interface ForeignExchange extends BaseServiceData {
  rate: number;
  currency: string;
}

export interface TourPackage extends BaseServiceData {
  destination: string;
  startDate: Timestamp | Date;
  endDate: Timestamp | Date;
  flightAmount: number;
  carAmount: number;
  tourManagerAmount: number;
  totalCost: number;
}

export interface TrainBooking extends BaseServiceData {
  fromLocation: string;
  toLocation: string;
  trainDate: Timestamp | Date;
}

export interface Vajabhat extends BaseServiceData {
  amount: number;
  paymentDate: Timestamp | Date;
}

export type ServiceType = 
  | 'flight' 
  | 'hotel' 
  | 'car' 
  | 'visa' 
  | 'foreignExchange' 
  | 'tourPackage' 
  | 'train' 
  | 'vajabhat';

export interface ServiceCollections {
  flight: string;
  hotel: string;
  car: string;
  visa: string;
  foreignExchange: string;
  tourPackage: string;
  train: string;
  vajabhat: string;
}

export interface SummaryData {
  totalServices: number;
  totalCustomerAmount: number;
  totalSupplierAmount: number;
  totalProfit: number;
  serviceBreakdown: {
    flight: number;
    hotel: number;
    car: number;
    visa: number;
    foreignExchange: number;
    tourPackage: number;
    train: number;
    vajabhat: number;
  };
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: any }>;
  signOut: () => Promise<{ success: boolean; error: any }>;
}