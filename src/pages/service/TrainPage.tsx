import React from 'react';
import { useServices } from '../../contexts/ServiceContext';
import ServiceTable from '../../components/common/ServiceTable';

const TrainPage: React.FC = () => {
  const { services } = useServices();
  
  return (
    <div>
      <ServiceTable 
        type="train" 
        data={services.train} 
        title="Train Bookings" 
      />
    </div>
  );
};

export default TrainPage;