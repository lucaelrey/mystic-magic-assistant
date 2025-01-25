import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Package, Plus, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ContentList = () => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const { data: contents, isLoading } = useQuery({
    queryKey: ["cms-contents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_content")
        .select(`
          *,
          translations: cms_translations (
            language,
            title,
            description,
            content
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const toggleRow = (id: string) => {
    setExpandedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const getTranslation = (translations: any[], language: string) => {
    return translations?.find(t => t.language === language) || null;
  };

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
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>DE Titel</TableHead>
                  <TableHead>EN Titel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Erstellt am</TableHead>
                  <TableHead>Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contents?.map((content) => {
                  const deTranslation = getTranslation(content.translations, 'de');
                  const enTranslation = getTranslation(content.translations, 'en');
                  const isExpanded = expandedRows.includes(content.id);

                  return (
                    <React.Fragment key={content.id}>
                      <TableRow className="cursor-pointer" onClick={() => toggleRow(content.id)}>
                        <TableCell>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{content.type}</TableCell>
                        <TableCell>{content.key}</TableCell>
                        <TableCell>{deTranslation?.title || "Kein Titel"}</TableCell>
                        <TableCell>{enTranslation?.title || "No Title"}</TableCell>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/cms/${content.id}`);
                            }}
                          >
                            Bearbeiten
                          </Button>
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={8}>
                            <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-2">Deutsch</h3>
                                  <div className="space-y-2">
                                    <p><span className="font-medium">Beschreibung:</span> {deTranslation?.description || "Keine Beschreibung"}</p>
                                    <p><span className="font-medium">Inhalt:</span></p>
                                    <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                                      {JSON.stringify(deTranslation?.content, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">English</h3>
                                  <div className="space-y-2">
                                    <p><span className="font-medium">Description:</span> {enTranslation?.description || "No description"}</p>
                                    <p><span className="font-medium">Content:</span></p>
                                    <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                                      {JSON.stringify(enTranslation?.content, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card>
      </main>
    </div>
  );
};

export default ContentList;