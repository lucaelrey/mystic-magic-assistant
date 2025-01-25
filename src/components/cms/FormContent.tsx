import React from "react";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ContentTypeSelect } from "./ContentTypeSelect";
import { ContentKeyField } from "./ContentKeyField";
import { TranslationTabs } from "./TranslationTabs";

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
        <div className="grid md:grid-cols-2 gap-6">
          <ContentTypeSelect form={form} />
          <ContentKeyField form={form} />
        </div>
        <TranslationTabs form={form} />
      </div>
    </Form>
  );
};