import React from "react";
import { Button } from "@/components/ui/button";
import { Package, Save, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormHeaderProps {
  id?: string;
  isLoading: boolean;
  isPending: boolean;
  onSubmit: () => void;
}

export const FormHeader = ({ id, isLoading, isPending, onSubmit }: FormHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Package className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">
          {id ? "Inhalt bearbeiten" : "Neuer Inhalt"}
        </h1>
      </div>
      <Button 
        onClick={onSubmit}
        disabled={isLoading || isPending}
      >
        <Save className="mr-2 h-4 w-4" />
        Speichern
      </Button>
    </div>
  );
};