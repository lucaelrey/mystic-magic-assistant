import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface ContentTypeSelectProps {
  form: UseFormReturn<any>;
}

export const ContentTypeSelect = ({ form }: ContentTypeSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Typ</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Wähle einen Typ" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="action_card">Aktionskarte</SelectItem>
              <SelectItem value="number_card">Zahlenkarte</SelectItem>
              <SelectItem value="rule">Regel</SelectItem>
              <SelectItem value="product">Produkt</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};