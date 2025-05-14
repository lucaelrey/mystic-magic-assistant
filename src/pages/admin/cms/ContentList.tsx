import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Content } from "@/types/cms";

interface Translation {
  language: string;
  title: string | null;
}

interface ContentWithTranslations extends Content {
  translations: Translation[];
}

const ContentList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [contentToDelete, setContentToDelete] = useState<Content | null>(null);

  const { data: contents, isLoading } = useQuery({
    queryKey: ["cms-contents"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("cms_content")
          .select("*, translations:cms_translations(language, title)")
          .order("updated_at", { ascending: false });

        if (error) throw error;
        return data as Content[];
      } catch (error) {
        console.error("Error fetching content:", error);
        return [];
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (contentId: string) => {
      const { error } = await supabase
        .from("cms_content")
        .delete()
        .eq("id", contentId);

      if (error) throw error;
      return contentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-contents"] });
      toast({
        title: "Success",
        description: "Content was deleted successfully",
      });
      setContentToDelete(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete content: ${error}`,
        variant: "destructive",
      });
    },
  });

  const handleDelete = (content: Content) => {
    setContentToDelete(content);
  };

  const confirmDelete = () => {
    if (contentToDelete?.id) {
      deleteMutation.mutate(contentToDelete.id);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">CMS Inhalte</h2>
          <Button onClick={() => navigate("/admin/cms/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Neu erstellen
          </Button>
        </div>
        <Card className="mt-4">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Typ</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Titel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contents?.map((content) => {
                    const translation = content.translations?.[0];
                    return (
                      <TableRow key={content.id}>
                        <TableCell className="font-medium">{content.type}</TableCell>
                        <TableCell>{content.key}</TableCell>
                        <TableCell>{translation?.title || "Kein Titel"}</TableCell>
                        <TableCell>
                          <Badge variant={content.published ? "default" : "secondary"}>
                            {content.published ? "Veröffentlicht" : "Entwurf"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Menü öffnen</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/admin/cms/${content.id}`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Bearbeiten
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/admin/cms/${content.id}/preview`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Vorschau
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(content)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Löschen
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {contents?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Keine Inhalte gefunden.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </main>
      <AlertDialog open={contentToDelete !== null} onOpenChange={(open) => !open && setContentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Inhalt löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Bist du sicher, dass du diesen Inhalt löschen möchtest? Diese Aktion kann nicht
              rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Löschen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContentList;
