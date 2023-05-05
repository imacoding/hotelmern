import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import authService from '../../../services/auth-service';

export default function ProtectedRoute() {
  const isAuthenticated = authService.isAuthenticated();

  return (
   
        isAuthenticated ? 
         <Outlet />
         : 
          <Navigate to="/login" replace />
        
  
  );
}

