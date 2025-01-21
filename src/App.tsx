import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Rules from "./pages/Rules";
import Shop from "./pages/Shop";
import Cart from "./pages/shop/Cart";
import Payment from "./pages/shop/Payment";
import Confirmation from "./pages/shop/Confirmation";
import Orders from "./pages/admin/Orders";
import Dashboard from "./pages/admin/Dashboard";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

// Create a client
const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rules" element={<Rules />}>
            <Route index element={<Rules.Overview />} />
            <Route path="number-cards" element={<Rules.NumberCards />} />
            <Route path="action-cards" element={<Rules.ActionCards />} />
          </Route>
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/confirmation" element={<Confirmation />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;