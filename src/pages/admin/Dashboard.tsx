import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Package, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Fehler beim Abmelden",
        description: error.message,
      });
    } else {
      toast({
        title: "Erfolgreich abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet.",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Abmelden
            </Button>
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