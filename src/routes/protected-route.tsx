import { useState, useEffect, type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
};

const ProtectedRoutes: FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If authenticated, render the child routes (Outlet)
  // If not, redirect to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;