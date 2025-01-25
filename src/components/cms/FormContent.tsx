import React from "react";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ContentTypeSelect } from "./ContentTypeSelect";
import { ContentKeyField } from "./ContentKeyField";
import { TranslationFields } from "./TranslationFields";

interface FormContentProps {
  form: UseFormReturn<any>;
  isLoading: boolean;
}

export const FormContent = ({ form, isLoading }: FormContentProps) => {
  if (isLoading) {
    return <div className="text-center py-4">Lädt...</div>;
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <ContentTypeSelect form={form} />
        <ContentKeyField form={form} />

        <div className="grid md:grid-cols-2 gap-6">
          <TranslationFields 
            form={form} 
            language="de" 
            title="Deutsch" 
          />
          <TranslationFields 
            form={form} 
            language="en" 
            title="English" 
          />
        </div>
      </div>
    </Form>
  );
};