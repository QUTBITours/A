import React, { useState, FormEvent } from 'react';

interface ServiceFormData {
  flightBooking: number;
  carBooking: number;
  tourManagerPayment: number;
  customerQuote: number;
  totalPackageCost: number;
  startDate: string;
  endDate: string;
  sector: string;
  bookingSource: string;
}

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    flightBooking: 0,
    carBooking: 0,
    tourManagerPayment: 0,
    customerQuote: 0,
    totalPackageCost: 0,
    startDate: '',
    endDate: '',
    sector: '',
    bookingSource: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dates */}
        <div className="space-y-4">
          <div className="input-group">
            <label htmlFor="startDate" className="input-label">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="endDate" className="input-label">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Text Fields */}
        <div className="space-y-4">
          <div className="input-group">
            <label htmlFor="sector" className="input-label">Sector</label>
            <input
              type="text"
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="Enter sector"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="bookingSource" className="input-label">Booking Source</label>
            <input
              type="text"
              id="bookingSource"
              name="bookingSource"
              value={formData.bookingSource}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="Enter booking source"
            />
          </div>
        </div>
      </div>

      {/* Costs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="input-group">
          <label htmlFor="flightBooking" className="input-label">Flight Booking Cost</label>
          <input
            type="number"
            id="flightBooking"
            name="flightBooking"
            value={formData.flightBooking}
            onChange={handleChange}
            className="input-field"
            required
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="carBooking" className="input-label">Car Booking Cost</label>
          <input
            type="number"
            id="carBooking"
            name="carBooking"
            value={formData.carBooking}
            onChange={handleChange}
            className="input-field"
            required
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="tourManagerPayment" className="input-label">Tour Manager Payment</label>
          <input
            type="number"
            id="tourManagerPayment"
            name="tourManagerPayment"
            value={formData.tourManagerPayment}
            onChange={handleChange}
            className="input-field"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="input-group">
          <label htmlFor="customerQuote" className="input-label">Customer Quote</label>
          <input
            type="number"
            id="customerQuote"
            name="customerQuote"
            value={formData.customerQuote}
            onChange={handleChange}
            className="input-field"
            required
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="totalPackageCost" className="input-label">Total Package Cost</label>
          <input
            type="number"
            id="totalPackageCost"
            name="totalPackageCost"
            value={formData.totalPackageCost}
            onChange={handleChange}
            className="input-field"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;