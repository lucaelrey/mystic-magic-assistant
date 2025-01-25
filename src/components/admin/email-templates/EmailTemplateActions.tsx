import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailTemplateActionsProps {
  templateId: string;
}

export const EmailTemplateActions = ({ templateId }: EmailTemplateActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("email_templates")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates"] });
      toast({
        title: "Erfolg",
        description: "E-Mail-Vorlage wurde gelöscht",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "E-Mail-Vorlage konnte nicht gelöscht werden",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/admin/email-templates/${templateId}`)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/admin/email-templates/${templateId}/preview`)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => deleteMutation.mutate(templateId)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};