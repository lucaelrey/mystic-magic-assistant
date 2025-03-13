
import React from "react";
import { useNavigate } from "react-router-dom";

interface AdminGuardProps {
  children: React.ReactNode;
}

// Simplified version that doesn't rely on backend
const AdminGuard = ({ children }: AdminGuardProps) => {
  const navigate = useNavigate();
  
  // Since we've removed the backend, we'll just redirect to the homepage
  React.useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default AdminGuard;
