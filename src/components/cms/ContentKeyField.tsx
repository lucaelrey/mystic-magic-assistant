import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface ContentKeyFieldProps {
  form: UseFormReturn<any>;
}

export const ContentKeyField = ({ form }: ContentKeyFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="key"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Schlüssel</FormLabel>
          <FormControl>
            <Input placeholder="z.B. card-1" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};