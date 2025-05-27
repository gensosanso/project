import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Calendar, Filter, Plus, Users, FileText } from "lucide-react";

export default function CampaignsPage() {
  // Mock data for campaigns
  const campaigns = [
    {
      id: "1",
      title: "Responsable Comptable",
      department: "Finance",
      location: "Douala",
      status: "active",
      startDate: "2025-02-01",
      endDate: "2025-03-15",
      applicants: 24,
    },
    {
      id: "2",
      title: "Développeur Full Stack",
      department: "Informatique",
      location: "Yaoundé",
      status: "active",
      startDate: "2025-01-15",
      endDate: "2025-02-28",
      applicants: 37,
    },
    {
      id: "3",
      title: "Chargé de Communication",
      department: "Marketing",
      location: "Douala",
      status: "closed",
      startDate: "2024-12-01",
      endDate: "2025-01-10",
      applicants: 42,
    },
    {
      id: "4",
      title: "Responsable RH",
      department: "Ressources Humaines",
      location: "Yaoundé",
      status: "draft",
      startDate: "2025-03-01",
      endDate: "2025-04-15",
      applicants: 0,
    },
  ];

  // Function to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          // <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
          //   Active
          // </Badge>
          <></>
        );
      case "closed":
        return (
          // <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-100">
          //   Clôturée
          // </Badge>
          <></>
        );
      case "draft":
        return (<></>
          // <Badge variant="outline" className="text-amber-800 border-amber-300 dark:text-amber-300 dark:border-amber-800">
          //   Brouillon
          // </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campagnes de recrutement</h1>
          <p className="text-muted-foreground mt-2">
            Gérez toutes vos campagnes de recrutement en cours et à venir
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Link href="/campaigns/new">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nouvelle campagne
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                {campaign.location}
              </CardDescription>
              <div className="absolute top-4 right-4">
                {getStatusBadge(campaign.status)}
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid gap-2">
                <div className="text-sm">
                  <span className="font-medium">Département:</span> {campaign.department}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>
                    {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                  </span>
                </div>
                {campaign.status !== "draft" && (
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{campaign.applicants} candidats</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex gap-2">
                <Link href={`/campaigns/${campaign.id}`}>
                  <Button variant="ghost" size="sm">
                    Détails
                  </Button>
                </Link>
                {campaign.status === "active" && (
                  <Link href={`/campaigns/${campaign.id}/form`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Formulaire
                    </Button>
                  </Link>
                )}
              </div>
              <Link href={`/campaigns/${campaign.id}/candidates`}>
                <Button variant="default" size="sm">
                  Gérer les candidats
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}