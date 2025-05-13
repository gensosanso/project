"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Link as LinkIcon, PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CampaignFormGenerator from "./form-generator";
import { Campaign } from "@/types";
import { toast } from "sonner";

interface FormEditorProps {
  formConfig: Campaign["form"] & { formUrl: string };
}

export default function FormEditor({ formConfig: initialFormConfig }: FormEditorProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formConfig, setFormConfig] = useState(initialFormConfig);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("URL copiée dans le presse-papier");
    } catch (err) {
      toast.error("Erreur lors de la copie de l'URL");
    }
  };

  const handleFormUpdate = (formData: Omit<typeof formConfig, "formUrl">, newFormUrl: string) => {
    setFormConfig({ ...formData, formUrl: newFormUrl });
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Form URL Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">URL du formulaire</CardTitle>
          <CardDescription>
            Partagez ce lien pour permettre aux candidats de postuler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <code className="flex-1 p-3 bg-muted rounded-md text-sm break-all">
              {formConfig.formUrl}
            </code>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => copyToClipboard(formConfig.formUrl)}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Configuration Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{formConfig.title}</CardTitle>
              <CardDescription>{formConfig.description}</CardDescription>
            </div>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <PencilIcon className="h-4 w-4" />
              Modifier le formulaire
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Questions Section */}
          <div className="space-y-4">
            <h3 className="font-medium">Questions spécifiques</h3>
            <div className="space-y-3">
              {formConfig.questions.map((question, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">Question {index + 1}</p>
                      <p className="text-muted-foreground mt-1">{question.question}</p>
                    </div>
                    {question.required && (
                      <Badge variant="secondary">Obligatoire</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Section */}
          <div className="space-y-4">
            <h3 className="font-medium">Documents requis</h3>
            <div className="flex gap-4">
              {formConfig.requireCV && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>CV</span>
                  <Badge variant="secondary">Obligatoire</Badge>
                </div>
              )}
              {formConfig.requireCoverLetter && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Lettre de motivation</span>
                  <Badge variant="secondary">Obligatoire</Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Button */}
      <div className="flex justify-center">
        <Link href={`/apply/${formConfig.formUrl.split('/').pop()}`}>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Prévisualiser le formulaire
          </Button>
        </Link>
      </div>

      {/* Edit Form Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le formulaire</DialogTitle>
            <DialogDescription>
              Personnalisez le formulaire de candidature selon vos besoins
            </DialogDescription>
          </DialogHeader>
          <CampaignFormGenerator
            initialData={formConfig}
            onFormUpdate={handleFormUpdate}
            onClose={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}