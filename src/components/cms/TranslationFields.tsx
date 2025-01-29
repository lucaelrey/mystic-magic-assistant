import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "./RichTextEditor";
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
              <Input {...field} placeholder={language === "de" ? "Geben Sie einen Titel ein" : "Enter a title"} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`translations.${language}.content`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{language === "de" ? "Inhalt" : "Content"}</FormLabel>
            <FormControl>
              <RichTextEditor value={field.value || ""} onChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};