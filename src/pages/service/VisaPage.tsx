import React from 'react';
import { useServices } from '../../contexts/ServiceContext';
import ServiceTable from '../../components/common/ServiceTable';

const VisaPage: React.FC = () => {
  const { services } = useServices();
  
  return (
    <div>
      <ServiceTable 
        type="visa" 
        data={services.visa} 
        title="Visa Applications" 
      />
    </div>
  );
};

export default VisaPage;