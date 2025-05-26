import React from 'react';
import { useServices } from '../../contexts/ServiceContext';
import ServiceTable from '../../components/common/ServiceTable';

const CarPage: React.FC = () => {
  const { services } = useServices();
  
  return (
    <div>
      <ServiceTable 
        type="car" 
        data={services.car} 
        title="Car Rentals" 
      />
    </div>
  );
};

export default CarPage;