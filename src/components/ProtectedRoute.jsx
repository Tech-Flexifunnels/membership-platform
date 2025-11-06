import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loader from './common/Loader';

/**
 * ProtectedRoute Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const params = useParams();

  // Show loader while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Try to get slug from params or default to 'default'
    const slug = params.slug || 'default';
    
    // Save the attempted location for redirect after login
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
