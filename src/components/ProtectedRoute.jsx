import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loader from './common/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const params = useParams();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    const slug = params.slug || 'default';
    
    return (
      <Navigate 
        to={`/membership/${slug}/login`} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
