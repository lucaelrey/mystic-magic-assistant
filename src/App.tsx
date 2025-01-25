import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Rules from "@/pages/Rules";
import CardDetail from "@/pages/CardDetail";
import Shop from "@/pages/Shop";
import Cart from "@/pages/shop/Cart";
import Payment from "@/pages/shop/Payment";
import Confirmation from "@/pages/shop/Confirmation";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/admin/Dashboard";
import Orders from "@/pages/admin/Orders";
import OrderDetail from "@/pages/admin/OrderDetail";
import ContentList from "@/pages/admin/cms/ContentList";
import ContentForm from "@/pages/admin/cms/ContentForm";
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
            <Route path="/shop/cart" element={<Cart />} />
            <Route path="/shop/payment" element={<Payment />} />
            <Route path="/shop/confirmation" element={<Confirmation />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/:id" element={<OrderDetail />} />
            <Route path="/admin/cms" element={<ContentList />} />
            <Route path="/admin/cms/new" element={<ContentForm />} />
            <Route path="/admin/cms/:id" element={<ContentForm />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;