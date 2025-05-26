import React, { useState } from 'react';
import { 
  Download, 
  PieChart, 
  Calendar, 
  TrendingUp, 
  BarChart, 
  ArrowUpRight,
  DollarSign
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { useServices } from '../contexts/ServiceContext';
import SummaryCard from '../components/dashboard/SummaryCard';

const SummaryPage: React.FC = () => {
  const { services, summary } = useServices();
  const [dateRange, setDateRange] = useState('month');
  
  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const handleExportData = () => {
    // Prepare data for export
    const exportData: any[] = [];
    
    // Add flight bookings
    services.flight.forEach(item => {
      exportData.push({
        'Service Type': 'Flight Booking',
        'From': item.fromLocation,
        'To': item.toLocation,
        'Date': item.flightDate instanceof Date ? item.flightDate : item.flightDate?.toDate(),
        'Sector': item.sector,
        'Customer Amount': item.customerAmount,
        'Supplier Amount': item.supplierAmount,
        'Tour Manager Amount': item.tourManagerAmount,
        'Car Amount': item.carAmount,
        'Profit': item.customerAmount - item.supplierAmount,
      });
    });
    
    // Add hotel reservations
    services.hotel.forEach(item => {
      exportData.push({
        'Service Type': 'Hotel Reservation',
        'Hotel Name': item.hotelName,
        'Check-in Date': item.checkInDate instanceof Date ? item.checkInDate : item.checkInDate?.toDate(),
        'Check-out Date': item.checkOutDate instanceof Date ? item.checkOutDate : item.checkOutDate?.toDate(),
        'Customer Amount': item.customerAmount,
        'Supplier Amount': item.supplierAmount,
        'Profit': item.customerAmount - item.supplierAmount,
      });
    });
    
    // Add car rentals
    services.car.forEach(item => {
      exportData.push({
        'Service Type': 'Car Rental',
        'Destination': item.destination,
        'Date': item.rentalDate instanceof Date ? item.rentalDate : item.rentalDate?.toDate(),
        'Seaters': item.seaters,
        'Customer Amount': item.customerAmount,
        'Supplier Amount': item.supplierAmount,
        'Profit': item.customerAmount - item.supplierAmount,
      });
    });
    
    // Add visa applications
    services.visa.forEach(item => {
      exportData.push({
        'Service Type': 'Visa',
        'Country': item.country,
        'Application Date': item.applicationDate instanceof Date ? item.applicationDate : item.applicationDate?.toDate(),
        'Customer Amount': item.customerAmount,
        'Supplier Amount': item.supplierAmount,
        'Profit': item.customerAmount - item.supplierAmount,
      });
    });
    
    // Add foreign exchanges
    services.foreignExchange.forEach(item => {
      exportData.push({
        'Service Type': 'Foreign Exchange',
        'Currency': item.currency,
        'Rate': item.rate,
        'Customer Amount': item.customerAmount,
        'Supplier Amount': item.supplierAmount,
        'Profit': item.customerAmount - item.supplierAmount,
      });
    });
    
    // Add tour packages
    services.tourPackage.forEach(item => {
      exportData.push({
        'Service Type': 'Tour Package',
        'Destination': item.destination,
        'Start Date': item.startDate instanceof Date ? item.startDate : item.startDate?.toDate(),
        'End Date': item.endDate instanceof Date ? item.endDate : item.endDate?.toDate(),
        'Flight Amount': item.flightAmount,
        'Car Amount': item.carAmount,
        'Tour Manager Amount': item.tourManagerAmount,
        'Customer Amount': item.customerAmount,
        'Total Cost': item.totalCost,
        'Supplier Amount': item.supplierAmount,
        'Profit': item.customerAmount - item.supplierAmount,
      });
    });
    
    // Add train bookings
    services.train.forEach(item => {
      exportData.push({
        'Service Type': 'Train Booking',
        'From': item.fromLocation,
        'To': item.toLocation,
        'Date': item.trainDate instanceof Date ? item.trainDate : item.trainDate?.toDate(),
        'Customer Amount': item.customerAmount,
        'Supplier Amount': item.supplierAmount,
        'Profit': item.customerAmount - item.supplierAmount,
      });
    });
    
    // Add vajabhat
    services.vajabhat.forEach(item => {
      exportData.push({
        'Service Type': 'Vajabhat',
        'Amount': item.amount,
        'Payment Date': item.paymentDate instanceof Date ? item.paymentDate : item.paymentDate?.toDate(),
        'Customer Amount': item.customerAmount,
        'Supplier Amount': item.supplierAmount,
        'Profit': item.customerAmount - item.supplierAmount,
      });
    });
    
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Services');
    
    // Generate Excel file
    XLSX.writeFile(workbook, 'QT_Holidays_Summary.xlsx');
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financial Summary</h1>
          <p className="text-slate-500 mt-1">Overview of your business performance</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setDateRange('month')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                dateRange === 'month'
                  ? 'bg-blue-50 text-blue-600 border border-blue-300'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              This Month
            </button>
            <button
              type="button"
              onClick={() => setDateRange('quarter')}
              className={`px-4 py-2 text-sm font-medium ${
                dateRange === 'quarter'
                  ? 'bg-blue-50 text-blue-600 border border-blue-300'
                  : 'bg-white text-slate-700 border-t border-b border-slate-300 hover:bg-slate-50'
              }`}
            >
              This Quarter
            </button>
            <button
              type="button"
              onClick={() => setDateRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                dateRange === 'year'
                  ? 'bg-blue-50 text-blue-600 border border-blue-300'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              This Year
            </button>
          </div>
          
          <button
            onClick={handleExportData}
            className="btn btn-secondary"
          >
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>
      
      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Services"
          value={summary?.totalServices || 0}
        />
        <SummaryCard
          title="Total Revenue"
          value={formatCurrency(summary?.totalCustomerAmount || 0)}
        />
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(summary?.totalSupplierAmount || 0)}
        />
        <SummaryCard
          title="Total Profit"
          value={formatCurrency(summary?.totalProfit || 0)}
          positive={summary?.totalProfit && summary.totalProfit > 0}
        />
      </div>
      
      {/* Services breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center mb-4">
            <PieChart className="h-5 w-5 text-slate-700 mr-2" />
            <h2 className="text-xl font-semibold text-slate-800">Services Breakdown</h2>
          </div>
          
          <div className="space-y-4">
            {summary && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Flight Bookings</span>
                  <span className="text-sm font-medium">{summary.serviceBreakdown.flight}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${summary.totalServices ? (summary.serviceBreakdown.flight / summary.totalServices) * 100 : 0}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Hotel Reservations</span>
                  <span className="text-sm font-medium">{summary.serviceBreakdown.hotel}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${summary.totalServices ? (summary.serviceBreakdown.hotel / summary.totalServices) * 100 : 0}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Car Rentals</span>
                  <span className="text-sm font-medium">{summary.serviceBreakdown.car}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${summary.totalServices ? (summary.serviceBreakdown.car / summary.totalServices) * 100 : 0}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Visa Applications</span>
                  <span className="text-sm font-medium">{summary.serviceBreakdown.visa}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${summary.totalServices ? (summary.serviceBreakdown.visa / summary.totalServices) * 100 : 0}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Foreign Exchange</span>
                  <span className="text-sm font-medium">{summary.serviceBreakdown.foreignExchange}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${summary.totalServices ? (summary.serviceBreakdown.foreignExchange / summary.totalServices) * 100 : 0}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Tour Packages</span>
                  <span className="text-sm font-medium">{summary.serviceBreakdown.tourPackage}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-teal-500 h-2 rounded-full" 
                    style={{ width: `${summary.totalServices ? (summary.serviceBreakdown.tourPackage / summary.totalServices) * 100 : 0}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Train Bookings</span>
                  <span className="text-sm font-medium">{summary.serviceBreakdown.train}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full" 
                    style={{ width: `${summary.totalServices ? (summary.serviceBreakdown.train / summary.totalServices) * 100 : 0}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Vajabhat</span>
                  <span className="text-sm font-medium">{summary.serviceBreakdown.vajabhat}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full" 
                    style={{ width: `${summary.totalServices ? (summary.serviceBreakdown.vajabhat / summary.totalServices) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center mb-4">
            <BarChart className="h-5 w-5 text-slate-700 mr-2" />
            <h2 className="text-xl font-semibold text-slate-800">Revenue vs Expenses</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">Revenue</span>
                <span className="text-sm font-medium">{formatCurrency(summary?.totalCustomerAmount || 0)}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">Expenses</span>
                <span className="text-sm font-medium">{formatCurrency(summary?.totalSupplierAmount || 0)}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full" 
                  style={{ 
                    width: `${
                      summary?.totalCustomerAmount 
                        ? (summary.totalSupplierAmount / summary.totalCustomerAmount) * 100 
                        : 0
                    }%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Profit</span>
                <span className="text-sm font-medium">{formatCurrency(summary?.totalProfit || 0)}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full" 
                  style={{ 
                    width: `${
                      summary?.totalCustomerAmount 
                        ? (summary.totalProfit / summary.totalCustomerAmount) * 100 
                        : 0
                    }%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <DollarSign className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Profit Margin</h3>
                  <p className="text-sm text-blue-600 mt-1">
                    {summary?.totalCustomerAmount 
                      ? `${((summary.totalProfit / summary.totalCustomerAmount) * 100).toFixed(2)}%`
                      : '0%'
                    } of your revenue is profit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data table */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-slate-700 mr-2" />
          <h2 className="text-xl font-semibold text-slate-800">Recent Services</h2>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Service</th>
                <th className="table-header-cell">Date</th>
                <th className="table-header-cell">Revenue</th>
                <th className="table-header-cell">Expense</th>
                <th className="table-header-cell">Profit</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {/* Get most recent 10 services across all service types */}
              {[...services.flight, ...services.hotel, ...services.car, 
                ...services.visa, ...services.foreignExchange, ...services.tourPackage,
                ...services.train, ...services.vajabhat]
                .sort((a, b) => {
                  const dateA = a.createdAt?.toDate?.() || new Date();
                  const dateB = b.createdAt?.toDate?.() || new Date();
                  return dateB.getTime() - dateA.getTime();
                })
                .slice(0, 10)
                .map((service, index) => {
                  // Determine service type and date field
                  let serviceType = '';
                  let dateField = null;
                  
                  if ('flightDate' in service) {
                    serviceType = 'Flight Booking';
                    dateField = service.flightDate;
                  } else if ('checkInDate' in service) {
                    serviceType = 'Hotel Reservation';
                    dateField = service.checkInDate;
                  } else if ('rentalDate' in service) {
                    serviceType = 'Car Rental';
                    dateField = service.rentalDate;
                  } else if ('applicationDate' in service) {
                    serviceType = 'Visa';
                    dateField = service.applicationDate;
                  } else if ('currency' in service) {
                    serviceType = 'Foreign Exchange';
                    dateField = service.createdAt;
                  } else if ('startDate' in service) {
                    serviceType = 'Tour Package';
                    dateField = service.startDate;
                  } else if ('trainDate' in service) {
                    serviceType = 'Train Booking';
                    dateField = service.trainDate;
                  } else if ('paymentDate' in service) {
                    serviceType = 'Vajabhat';
                    dateField = service.paymentDate;
                  }
                  
                  const date = dateField instanceof Date 
                    ? dateField 
                    : dateField?.toDate?.() || new Date();
                  
                  const formattedDate = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }).format(date);
                  
                  const profit = service.customerAmount - service.supplierAmount;
                  
                  return (
                    <tr key={index} className="table-row">
                      <td className="table-cell font-medium">{serviceType}</td>
                      <td className="table-cell">{formattedDate}</td>
                      <td className="table-cell text-blue-600">{formatCurrency(service.customerAmount)}</td>
                      <td className="table-cell text-red-600">{formatCurrency(service.supplierAmount)}</td>
                      <td className="table-cell">
                        <div className="flex items-center">
                          <span className={profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatCurrency(profit)}
                          </span>
                          {profit > 0 && <ArrowUpRight className="h-3 w-3 text-green-600 ml-1" />}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              
              {/* Show empty state if no services */}
              {[...services.flight, ...services.hotel, ...services.car, 
                ...services.visa, ...services.foreignExchange, ...services.tourPackage,
                ...services.train, ...services.vajabhat].length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No services found. Start by adding a new service.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;