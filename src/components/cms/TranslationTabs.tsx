import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "./RichTextEditor";

interface TranslationTabsProps {
  form: UseFormReturn<any>;
}

export const TranslationTabs = ({ form }: TranslationTabsProps) => {
  return (
    <Tabs defaultValue="de" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="de">Deutsch</TabsTrigger>
        <TabsTrigger value="en">English</TabsTrigger>
      </TabsList>

      {(['de', 'en'] as const).map((lang) => (
        <TabsContent key={lang} value={lang} className="space-y-4">
          <FormField
            control={form.control}
            name={`translations.${lang}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{lang === 'de' ? 'Titel' : 'Title'}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`translations.${lang}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {lang === 'de' ? 'Beschreibung' : 'Description'}
                </FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ''}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};