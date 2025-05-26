import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocumentById } from '../../firebase/database';
import { useServices } from '../../contexts/ServiceContext';
import ServiceForm from '../../components/common/ServiceForm';
import { ServiceType } from '../../types';

export const NewServicePage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  if (!type) {
    navigate('/');
    return null;
  }
  
  return (
    <ServiceForm type={type as ServiceType} />
  );
};

export const EditServicePage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { getServiceCollection } = useServices();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!type || !id) {
        navigate('/');
        return;
      }
      
      try {
        const collectionName = getServiceCollection(type as ServiceType);
        const { document, error } = await getDocumentById(collectionName, id);
        
        if (error || !document) {
          console.error('Error fetching document:', error);
          navigate(`/services/${type}`);
          return;
        }
        
        setData(document);
      } catch (error) {
        console.error('Error:', error);
        navigate(`/services/${type}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [type, id, navigate, getServiceCollection]);
  
  if (!type || !id) {
    return null;
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <ServiceForm type={type as ServiceType} data={data} isEditing={true} />
  );
};