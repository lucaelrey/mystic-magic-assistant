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
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {typeof translation.content === 'string' ? (
                      <div 
                        className="prose prose-invert max-w-none
                          prose-headings:text-white prose-headings:mt-6 prose-headings:mb-4 
                          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                          prose-p:text-gray-300 prose-p:my-4 
                          prose-strong:text-white 
                          prose-ul:text-gray-300 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-5
                          prose-ol:text-gray-300 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-5
                          prose-li:text-gray-300 prose-li:my-2 prose-li:pl-2
                          prose-a:text-[#e2c361] prose-a:no-underline hover:prose-a:text-[#e2c361]/80
                          [&_ul]:list-disc [&_ul]:pl-5 
                          [&_ol]:list-decimal [&_ol]:pl-5
                          [&_li]:my-1 [&_li]:pl-2
                          [&_a]:text-[#e2c361] [&_a]:no-underline hover:[&_a]:text-[#e2c361]/80"
                        dangerouslySetInnerHTML={{ __html: translation.content }}
                      />
                    ) : (
                      <div 
                        className="prose prose-invert max-w-none
                          prose-headings:text-white prose-headings:mt-6 prose-headings:mb-4 
                          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                          prose-p:text-gray-300 prose-p:my-4 
                          prose-strong:text-white 
                          prose-ul:text-gray-300 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-5
                          prose-ol:text-gray-300 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-5
                          prose-li:text-gray-300 prose-li:my-2 prose-li:pl-2
                          prose-a:text-[#e2c361] prose-a:no-underline hover:prose-a:text-[#e2c361]/80
                          [&_ul]:list-disc [&_ul]:pl-5 
                          [&_ol]:list-decimal [&_ol]:pl-5
                          [&_li]:my-1 [&_li]:pl-2
                          [&_a]:text-[#e2c361] [&_a]:no-underline hover:[&_a]:text-[#e2c361]/80"
                      >
                        {/* Render structured content */}
                        {translation.content.steps && (
                          <ol className="list-decimal list-inside space-y-2">
                            {translation.content.steps.map((step: string, index: number) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        )}
                        {translation.content.description && (
                          <p>{translation.content.description}</p>
                        )}
                        {translation.content.drawCard && (
                          <div>
                            <h3 className="font-semibold mb-2">
                              {translation.content.drawCard.title}
                            </h3>
                            <ul className="list-disc list-inside pl-4">
                              {translation.content.drawCard.options?.map((option: string, index: number) => (
                                <li key={index} className="mb-1">{option}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {translation.content.takeDiscard && (
                          <div>
                            <h3 className="font-semibold mb-2">
                              {translation.content.takeDiscard.title}
                            </h3>
                            <ul className="list-disc list-inside pl-4">
                              {translation.content.takeDiscard.rules?.map((rule: string, index: number) => (
                                <li key={index} className="mb-1">{rule}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {translation.content.endGame && (
                          <div>
                            <h3 className="font-semibold mb-2">
                              {translation.content.endGame.title}
                            </h3>
                            <p className="pl-4">
                              {translation.content.endGame.description}
                            </p>
                          </div>
                        )}
                        {translation.content.scoring && (
                          <div>
                            <h3 className="font-semibold mb-2">
                              {translation.content.scoring.title}
                            </h3>
                            <p className="pl-4">
                              {translation.content.scoring.description}
                            </p>
                          </div>
                        )}
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