import React from 'react';
import { useServices } from '../../contexts/ServiceContext';
import ServiceTable from '../../components/common/ServiceTable';

const HotelPage: React.FC = () => {
  const { services } = useServices();
  
  return (
    <div>
      <ServiceTable 
        type="hotel" 
        data={services.hotel} 
        title="Hotel Reservations" 
      />
    </div>
  );
};

export default HotelPage;