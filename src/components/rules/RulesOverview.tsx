import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

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
          translations (
            title,
            description,
            content
          )
        `)
        .eq('type', 'rule_section')
        .eq('published', true)
        .order('metadata->sort');

      if (error) throw error;
      return data;
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
          <Accordion type="single" defaultValue="overview" collapsible>
            {sections?.map((section) => {
              const translation = section.translations.find(t => t.language === language);
              if (!translation) return null;

              return (
                <div key={section.key} className="mb-4">
                  <h2 className="text-2xl font-semibold mb-2">{translation.title}</h2>
                  <p className="text-gray-300">{translation.description}</p>
                </div>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default RulesOverview;