"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Mail, Edit, Trash, Send } from "lucide-react";
import { EmailTemplate } from "@/types";

export default function CommunicationsPage() {
  const [selectedTab, setSelectedTab] = useState("templates");
  
  // Mock data for email templates
  const emailTemplates: EmailTemplate[] = [
    {
      id: "1",
      name: "Invitation à l'entretien",
      subject: "Invitation à un entretien pour le poste de [Poste]",
      body: "Bonjour [Prénom] [Nom],\n\nNous avons le plaisir de vous inviter à un entretien pour le poste de [Poste] le [Date] à [Heure].\n\nMerci de confirmer votre disponibilité en répondant à cet e-mail.\n\nCordialement,\nL'équipe RH",
      createdAt: new Date("2025-01-10"),
    },
    {
      id: "2",
      name: "Confirmation de candidature",
      subject: "Confirmation de réception de votre candidature",
      body: "Bonjour [Prénom] [Nom],\n\nNous vous confirmons la bonne réception de votre candidature pour le poste de [Poste].\n\nVotre dossier est en cours d'examen et nous reviendrons vers vous dans les plus brefs délais.\n\nCordialement,\nL'équipe RH",
      createdAt: new Date("2025-01-15"),
    },
    {
      id: "3",
      name: "Refus de candidature",
      subject: "Réponse concernant votre candidature",
      body: "Bonjour [Prénom] [Nom],\n\nNous vous remercions de l'intérêt que vous avez porté à notre entreprise.\n\nMalgré la qualité de votre profil, nous sommes au regret de vous informer que votre candidature n'a pas été retenue pour le poste de [Poste].\n\nNous vous souhaitons bonne chance dans vos recherches professionnelles.\n\nCordialement,\nL'équipe RH",
      createdAt: new Date("2025-01-20"),
    },
  ];

  // Mock data for sent communications
  const sentCommunications = [
    {
      id: "1",
      subject: "Invitation à un entretien pour le poste de Développeur Full Stack",
      recipients: ["jean.dupont@example.com", "marie.kouam@example.com"],
      sentAt: new Date("2025-02-10T14:30:00Z"),
      sentBy: "admin@example.com",
    },
    {
      id: "2",
      subject: "Confirmation de réception de votre candidature",
      recipients: ["paul.biya@example.com", "sophie.mbarga@example.com", "robert.essama@example.com"],
      sentAt: new Date("2025-02-08T09:15:00Z"),
      sentBy: "admin@example.com",
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos modèles d&apos;emails et envoyez des communications aux candidats
          </p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="templates">Modèles d&apos;emails</TabsTrigger>
          <TabsTrigger value="sent">Communications envoyées</TabsTrigger>
        </TabsList>

        {/* Email Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="pl-8 w-[250px]" />
            </div>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nouveau modèle
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>
                    Créé le {formatDate(template.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Objet: </span>
                      <span className="text-sm">{template.subject}</span>
                    </div>
                    <div>
                      <span className="font-medium">Contenu: </span>
                      <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-line">
                        {template.body}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <div className="flex justify-between p-4 pt-0">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    Modifier
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-destructive">
                    <Trash className="h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sent Communications Tab */}
        <TabsContent value="sent" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="pl-8 w-[250px]" />
            </div>
            <Button className="flex items-center gap-1">
              <Send className="h-4 w-4" />
              Envoyer un email
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Nouvelle communication</CardTitle>
              <CardDescription>
                Envoyez un email à un ou plusieurs candidats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Modèle</Label>
                <Select>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Sélectionner un modèle" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Destinataires</Label>
                <Select>
                  <SelectTrigger id="recipients">
                    <SelectValue placeholder="Sélectionner des candidats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shortlisted">Candidats présélectionnés</SelectItem>
                    <SelectItem value="all">Tous les candidats</SelectItem>
                    <SelectItem value="campaign1">Candidats - Responsable Comptable</SelectItem>
                    <SelectItem value="campaign2">Candidats - Développeur Full Stack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Objet</Label>
                <Input id="subject" placeholder="Objet de l'email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Contenu de l'email"
                  className="min-h-[200px]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button className="flex items-center gap-1">
                  <Send className="h-4 w-4" />
                  Envoyer
                </Button>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-medium mt-6">Historique des envois</h3>
          <div className="space-y-4">
            {sentCommunications.map((comm) => (
              <Card key={comm.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="space-y-1">
                      <h4 className="font-medium">{comm.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        Envoyé le {formatDate(comm.sentAt)} par {comm.sentBy}
                      </p>
                    </div>
                    <Badge variant="outline" className="w-fit flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {comm.recipients.length} destinataire(s)
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}