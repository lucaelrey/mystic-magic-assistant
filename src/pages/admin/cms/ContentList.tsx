import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ContentList = () => {
  const navigate = useNavigate();

  const { data: contents, isLoading } = useQuery({
    queryKey: ["cms-contents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_content")
        .select(`
          *,
          translations: cms_translations (
            language,
            title
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">CMS Inhalte</h1>
            </div>
            <Button onClick={() => navigate("/admin/cms/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Neuer Inhalt
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Lädt...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Typ</TableHead>
                  <TableHead>Titel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Erstellt am</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contents?.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell className="font-medium">{content.type}</TableCell>
                    <TableCell>
                      {content.translations?.[0]?.title || "Kein Titel"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={content.published ? "default" : "secondary"}>
                        {content.published ? "Veröffentlicht" : "Entwurf"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(content.created_at).toLocaleDateString("de-DE")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/cms/${content.id}`)}
                      >
                        Bearbeiten
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </main>
    </div>
  );
};

export default ContentList;