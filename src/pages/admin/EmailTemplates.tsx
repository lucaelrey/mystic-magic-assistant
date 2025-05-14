
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Plus, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { EmailTemplatesTable } from "@/components/admin/email-templates/EmailTemplatesTable";

const EmailTemplates = () => {
  const navigate = useNavigate();

  const { data: templates, isLoading } = useQuery({
    queryKey: ["email-templates"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("email_templates")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching email templates:", error);
        return [];
      }
    },
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin")}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">E-Mail-Vorlagen</h1>
            </div>
            <Button onClick={() => navigate("/admin/email-templates/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Neue Vorlage
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Lädt...</div>
          ) : (
            <EmailTemplatesTable templates={templates || []} />
          )}
        </Card>
      </main>
    </div>
  );
};

export default EmailTemplates;
