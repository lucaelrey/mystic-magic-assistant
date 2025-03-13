
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const RulesOverview = () => {
  const { language, t } = useLanguage();
  
  // Sections from our translations
  const sections = [
    { 
      id: "general", 
      key: "rules.overview.general" 
    },
    { 
      id: "preparation", 
      key: "rules.overview.preparation" 
    },
    { 
      id: "gameplay", 
      key: "rules.overview.gameplay" 
    },
    { 
      id: "endGame", 
      key: "rules.overview.endGame" 
    },
    { 
      id: "scoring", 
      key: "rules.overview.scoring" 
    }
  ];

  const renderSectionContent = (sectionKey: string) => {
    if (sectionKey === "rules.overview.general") {
      return (
        <div>
          <p>{t(`${sectionKey}.description`)}</p>
        </div>
      );
    }
    
    if (sectionKey === "rules.overview.preparation") {
      return (
        <div>
          <ol className="list-decimal list-inside space-y-2">
            {(t(`${sectionKey}.steps`) as string[]).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      );
    }
    
    if (sectionKey === "rules.overview.gameplay") {
      return (
        <div className="space-y-4">
          <p>{t(`${sectionKey}.description`)}</p>
          
          <div>
            <h3 className="font-semibold mb-2">
              {t(`${sectionKey}.drawCard.title`)}
            </h3>
            <ul className="list-disc list-inside pl-4">
              {(t(`${sectionKey}.drawCard.options`) as string[]).map((option, index) => (
                <li key={index} className="mb-1">{option}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {t(`${sectionKey}.takeDiscard.title`)}
            </h3>
            <ul className="list-disc list-inside pl-4">
              {(t(`${sectionKey}.takeDiscard.rules`) as string[]).map((rule, index) => (
                <li key={index} className="mb-1">{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    
    if (sectionKey === "rules.overview.endGame" || sectionKey === "rules.overview.scoring") {
      return (
        <div>
          <p>{t(`${sectionKey}.description`)}</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="glass bg-black/40 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <Accordion type="multiple" className="space-y-4">
            {sections.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                className="border border-white/10 rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col items-start text-left">
                    <h2 className="text-2xl font-semibold">{t(`${section.key}.title`)}</h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
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
                    {renderSectionContent(section.key)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default RulesOverview;
