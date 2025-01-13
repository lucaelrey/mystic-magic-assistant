import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rules from "./pages/Rules";
import Game from "./pages/Game";
import CardDetail from "./pages/CardDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/shop/Cart";
import Address from "./pages/shop/Address";
import Payment from "./pages/shop/Payment";
import Confirmation from "./pages/shop/Confirmation";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rules" element={<Rules />}>
            <Route index element={<Rules.Overview />} />
            <Route path="number-cards" element={<Rules.NumberCards />} />
            <Route path="action-cards" element={<Rules.ActionCards />} />
          </Route>
          <Route path="/game" element={<Game />} />
          <Route path="/card/:id" element={<CardDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout/address" element={<Address />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;