import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Rules from "@/pages/Rules";
import CardDetail from "@/pages/CardDetail";
import Shop from "@/pages/Shop";
import Cart from "@/pages/shop/Cart";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/admin/Dashboard";
import Orders from "@/pages/admin/Orders";
import OrderDetail from "@/pages/admin/OrderDetail";
import ContentList from "@/pages/admin/cms/ContentList";
import ContentForm from "@/pages/admin/cms/ContentForm";
import AdminGuard from "@/components/auth/AdminGuard";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rules" element={<Rules />}>
              <Route index element={<Rules.Overview />} />
              <Route path="number-cards" element={<Rules.NumberCards />} />
              <Route path="action-cards" element={<Rules.ActionCards />} />
            </Route>
            <Route path="/cards/:id" element={<CardDetail />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/admin"
              element={
                <AdminGuard>
                  <Dashboard />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminGuard>
                  <Orders />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/orders/:id"
              element={
                <AdminGuard>
                  <OrderDetail />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/cms"
              element={
                <AdminGuard>
                  <ContentList />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/cms/new"
              element={
                <AdminGuard>
                  <ContentForm />
                </AdminGuard>
              }
            />
            <Route
              path="/admin/cms/:id"
              element={
                <AdminGuard>
                  <ContentForm />
                </AdminGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;