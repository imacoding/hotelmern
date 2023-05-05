import React from 'react';
import { Route, Navigate, Outlet} from 'react-router-dom';
import authService from '../../../services/auth-service';

export default function LoggedInRoute() {
  const isAuthenticated = authService.isAuthenticated();

  return (
  
        isAuthenticated ? 
         <Navigate to='/rentals' replace />
         : 
         <Outlet />
    
  );
}


