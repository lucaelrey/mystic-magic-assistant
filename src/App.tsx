import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Rules from "@/pages/Rules";
import Shop from "@/pages/Shop";
import Cart from "@/pages/shop/Cart";
import Payment from "@/pages/shop/Payment";
import Confirmation from "@/pages/shop/Confirmation";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/admin/Orders";
import OrderDetail from "@/pages/admin/OrderDetail";
import EmailTemplates from "@/pages/admin/EmailTemplates";
import EmailTemplateForm from "@/pages/admin/EmailTemplateForm";
import ContentList from "@/pages/admin/cms/ContentList";
import ContentForm from "@/pages/admin/cms/ContentForm";
import Dashboard from "@/pages/admin/Dashboard";
import AdminGuard from "@/components/auth/AdminGuard";
import Auth from "@/pages/Auth";
import { Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/rules",
    element: <Rules />,
    children: [
      {
        index: true,
        element: <Rules.Overview />,
      },
      {
        path: "number-cards",
        element: <Rules.NumberCards />,
      },
      {
        path: "action-cards",
        element: <Rules.ActionCards />,
      },
    ],
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/cart",
    element: <Cart />,
  },
  {
    path: "/shop/payment",
    element: <Payment />,
  },
  {
    path: "/shop/confirmation",
    element: <Confirmation />,
  },
  {
    path: "/admin",
    element: <AdminGuard><Outlet /></AdminGuard>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <OrderDetail />,
      },
      {
        path: "email-templates",
        element: <EmailTemplates />,
      },
      {
        path: "email-templates/new",
        element: <EmailTemplateForm />,
      },
      {
        path: "email-templates/:id",
        element: <EmailTemplateForm />,
      },
      {
        path: "cms",
        element: <ContentList />,
      },
      {
        path: "cms/new",
        element: <ContentForm />,
      },
      {
        path: "cms/:id",
        element: <ContentForm />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default router;