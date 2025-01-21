import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Game from "./pages/Game";
import Rules from "./pages/Rules";
import Shop from "./pages/Shop";
import Cart from "./pages/shop/Cart";
import Payment from "./pages/shop/Payment";
import Confirmation from "./pages/shop/Confirmation";
import Orders from "./pages/admin/Orders";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rules" element={<Rules />}>
            <Route index element={<Rules.Overview />} />
            <Route path="number-cards" element={<Rules.NumberCards />} />
            <Route path="action-cards" element={<Rules.ActionCards />} />
          </Route>
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/confirmation" element={<Confirmation />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;