import React from 'react';
import { useServices } from '../../contexts/ServiceContext';
import ServiceTable from '../../components/common/ServiceTable';

const ForeignExchangePage: React.FC = () => {
  const { services } = useServices();
  
  return (
    <div>
      <ServiceTable 
        type="foreignExchange" 
        data={services.foreignExchange} 
        title="Foreign Exchange" 
      />
    </div>
  );
};

export default ForeignExchangePage;