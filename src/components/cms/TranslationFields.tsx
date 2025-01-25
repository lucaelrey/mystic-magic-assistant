import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface TranslationFieldsProps {
  form: UseFormReturn<any>;
  language: "de" | "en";
  title: string;
}

export const TranslationFields = ({ form, language, title }: TranslationFieldsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{title}</h3>
      <FormField
        control={form.control}
        name={`translations.${language}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{language === "de" ? "Titel" : "Title"}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`translations.${language}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{language === "de" ? "Beschreibung" : "Description"}</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};