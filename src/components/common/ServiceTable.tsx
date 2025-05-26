import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { deleteDocument } from '../../firebase/database';
import { useServices } from '../../contexts/ServiceContext';
import { ServiceType } from '../../types';

interface ServiceTableProps {
  type: ServiceType;
  data: any[];
  title: string;
}

const ServiceTable: React.FC<ServiceTableProps> = ({ type, data, title }) => {
  const navigate = useNavigate();
  const { refreshServices, getServiceCollection } = useServices();
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Format date from Timestamp
  const formatDate = (timestamp: Timestamp | Date) => {
    if (!timestamp) return 'N/A';
    
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  
  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      try {
        const collectionName = getServiceCollection(type);
        const result = await deleteDocument(collectionName, id);
        
        if (result.success) {
          toast.success('Service deleted successfully');
          await refreshServices();
        } else {
          toast.error('Failed to delete service');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('An error occurred');
      } finally {
        setConfirmDelete(null);
      }
    } else {
      setConfirmDelete(id);
      
      // Reset confirmation after 5 seconds
      setTimeout(() => {
        setConfirmDelete(null);
      }, 5000);
    }
  };
  
  // Filter data based on search query
  const filteredData = data.filter(item => {
    const searchIn = JSON.stringify(item).toLowerCase();
    return searchIn.includes(searchQuery.toLowerCase());
  });
  
  // Get table headers and row data based on service type
  const getTableHeaders = () => {
    switch (type) {
      case 'flight':
        return ['From', 'To', 'Date', 'Sector', 'Customer Amount', 'Supplier Amount', 'Actions'];
      case 'hotel':
        return ['Hotel Name', 'Check-in', 'Check-out', 'Customer Amount', 'Supplier Amount', 'Actions'];
      case 'car':
        return ['Destination', 'Date', 'Seaters', 'Customer Amount', 'Supplier Amount', 'Actions'];
      case 'visa':
        return ['Country', 'Application Date', 'Customer Amount', 'Supplier Amount', 'Actions'];
      case 'foreignExchange':
        return ['Currency', 'Rate', 'Customer Amount', 'Supplier Amount', 'Actions'];
      case 'tourPackage':
        return ['Destination', 'Start Date', 'End Date', 'Customer Amount', 'Total Cost', 'Actions'];
      case 'train':
        return ['From', 'To', 'Date', 'Customer Amount', 'Supplier Amount', 'Actions'];
      case 'vajabhat':
        return ['Amount', 'Date', 'Customer Amount', 'Supplier Amount', 'Actions'];
      default:
        return ['ID', 'Created', 'Actions'];
    }
  };
  
  const getRowData = (item: any) => {
    switch (type) {
      case 'flight':
        return [
          <span key="from">{item.fromLocation}</span>,
          <span key="to">{item.toLocation}</span>,
          <span key="date">{formatDate(item.flightDate)}</span>,
          <span key="sector">{item.sector}</span>,
          <span key="customerAmount">{formatCurrency(item.customerAmount)}</span>,
          <span key="supplierAmount">{formatCurrency(item.supplierAmount)}</span>,
        ];
      case 'hotel':
        return [
          <span key="hotelName">{item.hotelName}</span>,
          <span key="checkIn">{formatDate(item.checkInDate)}</span>,
          <span key="checkOut">{formatDate(item.checkOutDate)}</span>,
          <span key="customerAmount">{formatCurrency(item.customerAmount)}</span>,
          <span key="supplierAmount">{formatCurrency(item.supplierAmount)}</span>,
        ];
      case 'car':
        return [
          <span key="destination">{item.destination}</span>,
          <span key="date">{formatDate(item.rentalDate)}</span>,
          <span key="seaters">{item.seaters}</span>,
          <span key="customerAmount">{formatCurrency(item.customerAmount)}</span>,
          <span key="supplierAmount">{formatCurrency(item.supplierAmount)}</span>,
        ];
      case 'visa':
        return [
          <span key="country">{item.country}</span>,
          <span key="date">{formatDate(item.applicationDate)}</span>,
          <span key="customerAmount">{formatCurrency(item.customerAmount)}</span>,
          <span key="supplierAmount">{formatCurrency(item.supplierAmount)}</span>,
        ];
      case 'foreignExchange':
        return [
          <span key="currency">{item.currency}</span>,
          <span key="rate">{item.rate}</span>,
          <span key="customerAmount">{formatCurrency(item.customerAmount)}</span>,
          <span key="supplierAmount">{formatCurrency(item.supplierAmount)}</span>,
        ];
      case 'tourPackage':
        return [
          <span key="destination">{item.destination}</span>,
          <span key="startDate">{formatDate(item.startDate)}</span>,
          <span key="endDate">{formatDate(item.endDate)}</span>,
          <span key="customerAmount">{formatCurrency(item.customerAmount)}</span>,
          <span key="totalCost">{formatCurrency(item.totalCost)}</span>,
        ];
      case 'train':
        return [
          <span key="from">{item.fromLocation}</span>,
          <span key="to">{item.toLocation}</span>,
          <span key="date">{formatDate(item.trainDate)}</span>,
          <span key="customerAmount">{formatCurrency(item.customerAmount)}</span>,
          <span key="supplierAmount">{formatCurrency(item.supplierAmount)}</span>,
        ];
      case 'vajabhat':
        return [
          <span key="amount">{formatCurrency(item.amount)}</span>,
          <span key="date">{formatDate(item.paymentDate)}</span>,
          <span key="customerAmount">{formatCurrency(item.customerAmount)}</span>,
          <span key="supplierAmount">{formatCurrency(item.supplierAmount)}</span>,
        ];
      default:
        return [
          <span key="id">{item.id}</span>,
          <span key="created">{formatDate(item.createdAt)}</span>,
        ];
    }
  };
  
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">{title}</h2>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
          
          <button
            onClick={() => navigate(`/services/${type}/new`)}
            className="btn btn-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Add New</span>
          </button>
        </div>
      </div>
      
      {filteredData.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-slate-600">No {title.toLowerCase()} found. Add your first one!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                {getTableHeaders().map((header, index) => (
                  <th key={index} className="table-header-cell">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredData.map((item) => (
                <tr key={item.id} className="table-row">
                  {getRowData(item).map((cell, cellIndex) => (
                    <td key={cellIndex} className="table-cell">
                      {cell}
                    </td>
                  ))}
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/services/${type}/edit/${item.id}`)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(item.id)}
                        className={`p-1.5 ${
                          confirmDelete === item.id
                            ? 'bg-red-50 text-red-600'
                            : 'text-red-500 hover:bg-red-50'
                        } rounded-md`}
                        title={confirmDelete === item.id ? 'Confirm Delete' : 'Delete'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;