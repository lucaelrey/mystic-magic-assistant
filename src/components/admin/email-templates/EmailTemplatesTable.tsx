import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmailTemplateActions } from "./EmailTemplateActions";

interface EmailTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  created_at: string;
}

interface EmailTemplatesTableProps {
  templates: EmailTemplate[];
}

export const EmailTemplatesTable = ({ templates }: EmailTemplatesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Typ</TableHead>
          <TableHead>Betreff</TableHead>
          <TableHead>Erstellt am</TableHead>
          <TableHead>Aktionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates?.map((template) => (
          <TableRow key={template.id}>
            <TableCell>{template.name}</TableCell>
            <TableCell>{template.type}</TableCell>
            <TableCell>{template.subject}</TableCell>
            <TableCell>
              {new Date(template.created_at).toLocaleDateString("de-DE")}
            </TableCell>
            <TableCell>
              <EmailTemplateActions templateId={template.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};