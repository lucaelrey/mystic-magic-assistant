import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Package, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 hover:bg-accent transition-colors cursor-pointer" onClick={() => navigate('/admin/orders')}>
              <h2 className="text-lg font-semibold mb-2">Bestellungen</h2>
              <p className="text-muted-foreground mb-4">Verwalte und überprüfe alle eingegangenen Bestellungen.</p>
              <Button variant="outline" className="w-full">
                Zu den Bestellungen
              </Button>
            </Card>

            <Card className="p-6 hover:bg-accent transition-colors cursor-pointer" onClick={() => navigate('/admin/cms')}>
              <h2 className="text-lg font-semibold mb-2">CMS</h2>
              <p className="text-muted-foreground mb-4">Verwalte Inhalte wie Karten, Regeln und Produkte.</p>
              <Button variant="outline" className="w-full">
                Zum CMS
              </Button>
            </Card>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;