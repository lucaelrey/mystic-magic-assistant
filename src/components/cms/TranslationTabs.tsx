import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "./RichTextEditor";

interface TranslationTabsProps {
  form: UseFormReturn<any>;
}

const renderContentPreview = (content: any) => {
  if (!content) return null;

  if (Array.isArray(content)) {
    return (
      <ul className="list-disc list-inside space-y-2">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  if (typeof content === 'object') {
    return (
      <div className="space-y-4">
        {Object.entries(content).map(([key, value]: [string, any]) => {
          if (typeof value === 'object') {
            return (
              <div key={key} className="space-y-2">
                <h4 className="font-semibold">{value.title}</h4>
                {value.options && (
                  <ul className="list-disc list-inside pl-4">
                    {value.options.map((option: string, index: number) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                )}
                {value.rules && (
                  <ul className="list-disc list-inside pl-4">
                    {value.rules.map((rule: string, index: number) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return <p>{content}</p>;
};

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
                <FormLabel>{lang === 'de' ? 'Inhalt' : 'Content'}</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value || ''}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`translations.${lang}.content`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{lang === 'de' ? 'Strukturierter Inhalt' : 'Structured Content'}</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={typeof field.value === 'string' ? field.value : JSON.stringify(field.value, null, 2)}
                    onChange={(value) => {
                      try {
                        // Versuche den String als JSON zu parsen
                        const parsedValue = JSON.parse(value);
                        field.onChange(parsedValue);
                      } catch {
                        // Wenn es kein gültiges JSON ist, speichere es als String
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                <div className="mt-2 p-4 border rounded-md bg-muted/50">
                  {renderContentPreview(field.value)}
                </div>
              </FormItem>
            )}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};