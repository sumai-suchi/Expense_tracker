import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { token, loading } = useAuth();

  // যদি AuthContext এখনও localStorage চেক করতে থাকে, তবে একটা Loading দেখাবে
  if (loading) {
    return <div className="p-8 text-center">Loading session...</div>;
  }

  // যদি টোকেন না থাকে, তবে ইউজারকে সরাসরি লগইন পেজে পাঠিয়ে দেবে
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // আর যদি টোকেন থাকে, তবে ভেতরের সিকিউর পেজগুলো (যেমন: Dashboard) রেন্ডার করবে
  return <Outlet />;
};