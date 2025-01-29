import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Translation = Database["public"]["Tables"]["cms_translations"]["Row"] & {
  language: string;
  title: string | null;
  description: string | null;
  content: any;
};

interface Section {
  id: string;
  key: string;
  metadata: {
    sort: number;
  } | null;
  translations: Translation[];
}

const RulesOverview = () => {
  const { language } = useLanguage();
  
  const { data: sections, isLoading } = useQuery({
    queryKey: ['rule-sections', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cms_content')
        .select(`
          id,
          key,
          metadata,
          cms_translations (
            language,
            title,
            description,
            content
          )
        `)
        .eq('type', 'rules_overview')
        .eq('published', true)
        .order('metadata->sort');

      if (error) throw error;
      
      return (data as any[]).map(section => ({
        ...section,
        metadata: section.metadata as { sort: number } | null,
        translations: section.cms_translations || []
      })) as Section[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass bg-black/40 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <Accordion type="multiple" className="space-y-4">
            {sections?.map((section) => {
              const translation = section.translations.find(t => t.language === language);
              if (!translation) return null;

              return (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="border border-white/10 rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start text-left">
                      <h2 className="text-2xl font-semibold">{translation.title}</h2>
                      {translation.description && (
                        <p className="text-sm text-gray-400 mt-1">{translation.description}</p>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {translation.content && typeof translation.content === 'object' && (
                      <div className="prose prose-invert max-w-none">
                        {Object.entries(translation.content).map(([key, value]) => (
                          <div key={key} className="mb-4">
                            {typeof value === 'string' && (
                              <p>{value}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default RulesOverview;