import React from 'react';
import { useServices } from '../../contexts/ServiceContext';
import ServiceTable from '../../components/common/ServiceTable';

const TourPackagePage: React.FC = () => {
  const { services } = useServices();
  
  return (
    <div>
      <ServiceTable 
        type="tourPackage" 
        data={services.tourPackage} 
        title="Tour Packages" 
      />
    </div>
  );
};

export default TourPackagePage;