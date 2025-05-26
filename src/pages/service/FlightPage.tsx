import React from 'react';
import { useServices } from '../../contexts/ServiceContext';
import ServiceTable from '../../components/common/ServiceTable';

const FlightPage: React.FC = () => {
  const { services } = useServices();
  
  return (
    <div>
      <ServiceTable 
        type="flight" 
        data={services.flight} 
        title="Flight Bookings" 
      />
    </div>
  );
};

export default FlightPage;