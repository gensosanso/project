"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Calendar, Users, FileText } from "lucide-react";
import { Campaign } from "@/types";

export default function CampaignDetails({ id }: { id: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    // Mock data for campaign details
    const mockCampaign: Campaign = {
      id,
      title: "Responsable Comptable",
      description: "Nous recherchons un responsable comptable expérimenté pour rejoindre notre équipe financière.",
      department: "Finance",
      location: "Douala",
      status: "active",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-03-15"),
      criteria: {
        minEducationLevel: "bac+5",
        minYearsExperience: 5,
        specializations: ["Comptabilité", "Finance"],
      },
      form: {
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
      },
      createdAt: new Date("2025-01-15"),
    };

    setCampaign(mockCampaign);
  }, [id]);

  if (!campaign) {
    return <div>Chargement...</div>;
  }

  // Function to format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
            Active
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
            Clôturée
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="text-amber-800 border-amber-300 dark:text-amber-300 dark:border-amber-800">
            Brouillon
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{campaign.title}</CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {campaign.location}
                </CardDescription>
              </div>
              {getStatusBadge(campaign.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Département</h3>
                  <p className="text-muted-foreground">{campaign.department}</p>
                </div>
                <div>
                  <h3 className="font-medium">Période</h3>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(campaign.startDate)} - {campaign.endDate ? formatDate(campaign.endDate) : "Non définie"}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground mt-1">{campaign.description}</p>
              </div>
            </div>

            {/* Criteria */}
            <div>
              <h3 className="font-medium mb-3">Critères</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Niveau d&apos;études minimum:</span>{" "}
                    {campaign.criteria.minEducationLevel}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Expérience minimum:</span>{" "}
                    {campaign.criteria.minYearsExperience} ans
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Spécialisations:</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {campaign.criteria.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={`/campaigns/${campaign.id}/candidates`} className="flex-1">
                <Button className="w-full flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Gérer les candidats
                </Button>
              </Link>
              {campaign.status === "active" && (
                <Link href={`/apply/${campaign.id}`} className="flex-1">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Voir le formulaire
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}