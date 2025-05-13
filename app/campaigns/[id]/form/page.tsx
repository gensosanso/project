import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Link as LinkIcon, PencilIcon } from "lucide-react";
import FormEditor from "./form-editor";
import { Campaign } from "@/types";

// Add generateStaticParams function
export async function generateStaticParams() {
  // Mock campaign IDs - in production, these would come from your data source
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" }
  ];
}

export default function CampaignFormPage({ params }: { params: { id: string } }) {
  // Mock data for form configuration
  const formConfig: Campaign["form"] & { formUrl: string } = {
    title: "Candidature - Responsable Comptable",
    description: "Merci de remplir ce formulaire pour postuler au poste de Responsable Comptable",
    questions: [
      {
        question: "Combien d'années d'expérience avez-vous en tant que responsable comptable ?",
        required: true,
      },
      {
        question: "Avez-vous déjà géré une équipe ? Si oui, de quelle taille ?",
        required: true,
      },
      {
        question: "Quels logiciels comptables maîtrisez-vous ?",
        required: true,
      },
    ],
    requireCV: true,
    requireCoverLetter: true,
    formUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/apply/${params.id}`,
  };

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configuration du formulaire</h1>
            <p className="text-muted-foreground mt-2">
              Gérez le formulaire de candidature pour cette campagne
            </p>
          </div>
        </div>

        <FormEditor formConfig={formConfig} />
      </div>
    </div>
  );
}