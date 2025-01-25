import { createBrowserRouter } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Package, Mail, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import EmailTemplates from "./pages/admin/EmailTemplates";
import EmailTemplateForm from "./pages/admin/EmailTemplateForm";

const router = createBrowserRouter([
  {
    path: "/admin/email-templates",
    element: <EmailTemplates />,
  },
  {
    path: "/admin/email-templates/new",
    element: <EmailTemplateForm />,
  },
  {
    path: "/admin/email-templates/:id",
    element: <EmailTemplateForm />,
  },
]);

export default router;
