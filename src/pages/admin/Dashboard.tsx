import React from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Package, Mail, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/admin/orders">
            <Card className="p-6 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold">Bestellungen</h2>
                  <p className="text-sm text-muted-foreground">
                    Bestellungen verwalten
                  </p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/admin/cms">
            <Card className="p-6 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold">CMS</h2>
                  <p className="text-sm text-muted-foreground">
                    Inhalte verwalten
                  </p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/admin/email-templates">
            <Card className="p-6 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold">E-Mail-Vorlagen</h2>
                  <p className="text-sm text-muted-foreground">
                    E-Mail-Vorlagen verwalten
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;