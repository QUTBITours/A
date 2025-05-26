import React from 'react';
import { useServices } from '../../contexts/ServiceContext';
import ServiceTable from '../../components/common/ServiceTable';

const VajabhatPage: React.FC = () => {
  const { services } = useServices();
  
  return (
    <div>
      <ServiceTable 
        type="vajabhat" 
        data={services.vajabhat} 
        title="Vajabhat" 
      />
    </div>
  );
};

export default VajabhatPage;