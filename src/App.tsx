import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import AdminGuard from "@/components/auth/AdminGuard";
import { Outlet } from "react-router-dom";

// Lazy load components
const Index = lazy(() => import("@/pages/Index"));
const Shop = lazy(() => import("@/pages/Shop"));
const Cart = lazy(() => import("@/pages/shop/Cart"));
const Payment = lazy(() => import("@/pages/shop/Payment"));
const Confirmation = lazy(() => import("@/pages/shop/Confirmation"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Orders = lazy(() => import("@/pages/admin/Orders"));
const OrderDetail = lazy(() => import("@/pages/admin/OrderDetail"));
const EmailTemplates = lazy(() => import("@/pages/admin/EmailTemplates"));
const EmailTemplateForm = lazy(() => import("@/pages/admin/EmailTemplateForm"));
const ContentList = lazy(() => import("@/pages/admin/cms/ContentList"));
const ContentForm = lazy(() => import("@/pages/admin/cms/ContentForm"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Auth = lazy(() => import("@/pages/Auth"));
const Impressum = lazy(() => import("@/pages/Impressum"));

// Load Rules and its subcomponents separately
const RulesPage = lazy(() => import("@/pages/Rules"));
const RulesOverview = lazy(() => import("@/components/rules/RulesOverview"));
const NumberCardsRoute = lazy(() => import("@/components/rules/NumberCardsRoute"));
const ActionCardsView = lazy(() => import("@/components/cards/ActionCardsView"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

// Wrap component with Suspense
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(Index),
    errorElement: withSuspense(NotFound),
  },
  {
    path: "/rules",
    element: withSuspense(RulesPage),
    children: [
      {
        index: true,
        element: withSuspense(RulesOverview),
      },
      {
        path: "number-cards",
        element: withSuspense(NumberCardsRoute),
      },
      {
        path: "action-cards",
        element: withSuspense(ActionCardsView),
      },
    ],
  },
  {
    path: "/shop",
    element: withSuspense(Shop),
  },
  {
    path: "/shop/cart",
    element: withSuspense(Cart),
  },
  {
    path: "/shop/payment",
    element: withSuspense(Payment),
  },
  {
    path: "/shop/confirmation",
    element: withSuspense(Confirmation),
  },
  {
    path: "/impressum",
    element: withSuspense(Impressum),
  },
  {
    path: "/admin",
    element: <AdminGuard><Outlet /></AdminGuard>,
    children: [
      {
        index: true,
        element: withSuspense(Dashboard),
      },
      {
        path: "orders",
        element: withSuspense(Orders),
      },
      {
        path: "orders/:id",
        element: withSuspense(OrderDetail),
      },
      {
        path: "email-templates",
        element: withSuspense(EmailTemplates),
      },
      {
        path: "email-templates/new",
        element: withSuspense(EmailTemplateForm),
      },
      {
        path: "email-templates/:id",
        element: withSuspense(EmailTemplateForm),
      },
      {
        path: "cms",
        element: withSuspense(ContentList),
      },
      {
        path: "cms/new",
        element: withSuspense(ContentForm),
      },
      {
        path: "cms/:id",
        element: withSuspense(ContentForm),
      },
    ],
  },
  {
    path: "/auth",
    element: withSuspense(Auth),
  },
]);

export default router;