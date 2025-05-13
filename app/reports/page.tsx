"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ReportsPage() {
  // Mock data for gender distribution
  const genderData = [
    { name: "Hommes", value: 65 },
    { name: "Femmes", value: 35 },
  ];

  // Mock data for age distribution
  const ageData = [
    { name: "18-25", count: 15 },
    { name: "26-35", count: 40 },
    { name: "36-45", count: 30 },
    { name: "46-55", count: 10 },
    { name: "56+", count: 5 },
  ];

  // Mock data for education level distribution
  const educationData = [
    { name: "Bac", count: 10 },
    { name: "Bac+2", count: 25 },
    { name: "Bac+3", count: 30 },
    { name: "Bac+4", count: 15 },
    { name: "Bac+5", count: 18 },
    { name: "Doctorat", count: 2 },
  ];

  // Mock data for application status
  const statusData = [
    { name: "En attente", count: 42 },
    { name: "Examinés", count: 27 },
    { name: "Présélectionnés", count: 36 },
    { name: "Rejetés", count: 35 },
    { name: "Embauchés", count: 8 },
  ];

  // Mock data for campaign performance
  const campaignData = [
    { 
      name: "Responsable Comptable", 
      applications: 24, 
      qualifiedCandidates: 15, 
      hiredCandidates: 2 
    },
    { 
      name: "Développeur Full Stack", 
      applications: 37, 
      qualifiedCandidates: 20, 
      hiredCandidates: 3 
    },
    { 
      name: "Chargé de Communication", 
      applications: 42, 
      qualifiedCandidates: 18, 
      hiredCandidates: 2 
    },
    { 
      name: "Responsable RH", 
      applications: 28, 
      qualifiedCandidates: 10, 
      hiredCandidates: 1 
    },
  ];

  // Colors for pie chart
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rapports et Analyses</h1>
          <p className="text-muted-foreground mt-2">
            Visualisez et analysez les données de recrutement
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les périodes</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="demographics" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="demographics">Démographie</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender Distribution Card */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par genre</CardTitle>
                <CardDescription>
                  Distribution des candidats par genre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Age Distribution Card */}
            <Card>
              <CardHeader>
                <CardTitle>Distribution par âge</CardTitle>
                <CardDescription>
                  Répartition des candidats par tranche d&apos;âge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={ageData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Nombre de candidats" fill="hsl(var(--chart-1))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Education Distribution Card */}
            <Card>
              <CardHeader>
                <CardTitle>Niveau d&apos;éducation</CardTitle>
                <CardDescription>
                  Distribution des candidats par niveau d&apos;études
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={educationData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Nombre de candidats" fill="hsl(var(--chart-2))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Application Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Statut des candidatures</CardTitle>
                <CardDescription>
                  Répartition des candidatures par statut
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance des campagnes</CardTitle>
              <CardDescription>
                Comparaison des campagnes de recrutement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaignData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" name="Candidatures reçues" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="qualifiedCandidates" name="Candidats qualifiés" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="hiredCandidates" name="Candidats embauchés" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Taux de conversion</CardTitle>
                <CardDescription>
                  Pourcentage de candidats qui passent à chaque étape
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Candidature -> Examen", rate: 75 },
                        { name: "Examen -> Présélection", rate: 45 },
                        { name: "Présélection -> Entretien", rate: 60 },
                        { name: "Entretien -> Embauche", rate: 25 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis label={{ value: '%', position: 'insideLeft', angle: -90 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rate" name="Taux de conversion (%)" fill="hsl(var(--chart-4))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temps moyen de recrutement</CardTitle>
                <CardDescription>
                  Durée moyenne pour compléter chaque étape (en jours)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Réception -> Examen", days: 5 },
                        { name: "Examen -> Présélection", days: 3 },
                        { name: "Présélection -> Entretien", days: 7 },
                        { name: "Entretien -> Décision", days: 4 },
                        { name: "Décision -> Embauche", days: 10 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis label={{ value: 'Jours', position: 'insideLeft', angle: -90 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="days" name="Temps moyen (jours)" fill="hsl(var(--chart-5))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}