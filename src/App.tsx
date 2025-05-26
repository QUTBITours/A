import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ServiceProvider } from './contexts/ServiceContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SummaryPage from './pages/SummaryPage';

// Service pages
import FlightPage from './pages/service/FlightPage';
import HotelPage from './pages/service/HotelPage';
import CarPage from './pages/service/CarPage';
import VisaPage from './pages/service/VisaPage';
import ForeignExchangePage from './pages/service/ForeignExchangePage';
import TourPackagePage from './pages/service/TourPackagePage';
import TrainPage from './pages/service/TrainPage';
import VajabhatPage from './pages/service/VajabhatPage';
import { NewServicePage, EditServicePage } from './pages/service/ServiceFormPages';

function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <Router basename="/">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="summary" element={<SummaryPage />} />
              
              {/* Service Routes */}
              <Route path="services/flight" element={<FlightPage />} />
              <Route path="services/flight/new" element={<NewServicePage />} />
              <Route path="services/flight/edit/:id" element={<EditServicePage />} />
              
              <Route path="services/hotel" element={<HotelPage />} />
              <Route path="services/hotel/new" element={<NewServicePage />} />
              <Route path="services/hotel/edit/:id" element={<EditServicePage />} />
              
              <Route path="services/car" element={<CarPage />} />
              <Route path="services/car/new" element={<NewServicePage />} />
              <Route path="services/car/edit/:id" element={<EditServicePage />} />
              
              <Route path="services/visa" element={<VisaPage />} />
              <Route path="services/visa/new" element={<NewServicePage />} />
              <Route path="services/visa/edit/:id" element={<EditServicePage />} />
              
              <Route path="services/foreign-exchange" element={<ForeignExchangePage />} />
              <Route path="services/foreign-exchange/new" element={<NewServicePage />} />
              <Route path="services/foreign-exchange/edit/:id" element={<EditServicePage />} />
              
              <Route path="services/tour-package" element={<TourPackagePage />} />
              <Route path="services/tour-package/new" element={<NewServicePage />} />
              <Route path="services/tour-package/edit/:id" element={<EditServicePage />} />
              
              <Route path="services/train" element={<TrainPage />} />
              <Route path="services/train/new" element={<NewServicePage />} />
              <Route path="services/train/edit/:id" element={<EditServicePage />} />
              
              <Route path="services/vajabhat" element={<VajabhatPage />} />
              <Route path="services/vajabhat/new" element={<NewServicePage />} />
              <Route path="services/vajabhat/edit/:id" element={<EditServicePage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;