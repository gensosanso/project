"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataTable } from "@/components/data-table";
import { Filter, Download, Search, User } from "lucide-react";
import CandidateFilters from "@/components/candidate-filters";
import { FilterCriteria } from "@/types";

// Import the column definition in the client component
import { candidateColumns } from "@/components/columns/candidate-columns";

export default function CandidatesPage() {
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    educationLevel: [],
    ageRange: { min: 18, max: 60 },
    specialization: [],
    yearsOfExperience: 0,
  });

  // Mock data for candidates with age information
  const allCandidates = [
    {
      id: "1",
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      educationLevel: "bac+5",
      specialization: "Finance",
      yearsOfExperience: 8,
      status: "shortlisted",
      campaignTitle: "Responsable Comptable",
      createdAt: "2025-02-10T14:30:00Z",
      dateOfBirth: "1990-05-15", // Added date of birth
    },
    {
      id: "2",
      firstName: "Marie",
      lastName: "Kouam",
      email: "marie.kouam@example.com",
      educationLevel: "bac+3",
      specialization: "Marketing",
      yearsOfExperience: 3,
      status: "pending",
      campaignTitle: "Chargé de Communication",
      createdAt: "2025-02-08T09:15:00Z",
      dateOfBirth: "1995-08-22",
    },
    {
      id: "3",
      firstName: "Paul",
      lastName: "Biya",
      email: "paul.biya@example.com",
      educationLevel: "bac+4",
      specialization: "Informatique",
      yearsOfExperience: 5,
      status: "rejected",
      campaignTitle: "Développeur Full Stack",
      createdAt: "2025-02-05T11:45:00Z",
      dateOfBirth: "1992-03-10",
    },
    {
      id: "4",
      firstName: "Sophie",
      lastName: "Mbarga",
      email: "sophie.mbarga@example.com",
      educationLevel: "bac+5",
      specialization: "Ressources Humaines",
      yearsOfExperience: 7,
      status: "hired",
      campaignTitle: "Responsable RH",
      createdAt: "2025-01-20T10:00:00Z",
      dateOfBirth: "1988-11-30",
    },
    {
      id: "5",
      firstName: "Robert",
      lastName: "Essama",
      email: "robert.essama@example.com",
      educationLevel: "bac+2",
      specialization: "Informatique",
      yearsOfExperience: 2,
      status: "reviewed",
      campaignTitle: "Développeur Full Stack",
      createdAt: "2025-02-09T16:20:00Z",
      dateOfBirth: "1997-01-25",
    },
  ];

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Filter candidates based on criteria
  const filteredCandidates = allCandidates.filter(candidate => {
    const age = calculateAge(candidate.dateOfBirth);
    
    // Check education level
    if (filterCriteria.educationLevel?.length > 0 && 
        !filterCriteria.educationLevel.includes(candidate.educationLevel)) {
      return false;
    }

    // Check age range
    if (age < filterCriteria.ageRange.min || age > filterCriteria.ageRange.max) {
      return false;
    }

    // Check specialization
    if (filterCriteria.specialization?.length > 0 && 
        !filterCriteria.specialization.includes(candidate.specialization.toLowerCase())) {
      return false;
    }

    // Check years of experience
    if (candidate.yearsOfExperience < filterCriteria.yearsOfExperience) {
      return false;
    }

    return true;
  });

  // Stats counters based on filtered candidates
  const stats = [
    { label: "Total", value: filteredCandidates.length },
    { label: "En attente", value: filteredCandidates.filter(c => c.status === "pending").length },
    { label: "Examinés", value: filteredCandidates.filter(c => c.status === "reviewed").length },
    { label: "Présélectionnés", value: filteredCandidates.filter(c => c.status === "shortlisted").length },
    { label: "Rejetés", value: filteredCandidates.filter(c => c.status === "rejected").length },
    { label: "Embauchés", value: filteredCandidates.filter(c => c.status === "hired").length },
  ];

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des candidats</h1>
          <p className="text-muted-foreground mt-2">
            Consultez et gérez tous les candidats à vos offres d&apos;emploi
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Stats Cards */}
        <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex flex-col">
                <span className="text-muted-foreground text-sm">{stat.label}</span>
                <span className="text-2xl font-bold">{stat.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <CandidateFilters onFilterChange={setFilterCriteria} />
        </div>

        {/* Candidate List */}
        <div className="lg:col-span-5">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="all" className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                  <TabsList>
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="pending">En attente</TabsTrigger>
                    <TabsTrigger value="reviewed">Examinés</TabsTrigger>
                    <TabsTrigger value="shortlisted">Présélectionnés</TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Rechercher..." 
                        className="pl-8 w-[200px] md:w-[260px]"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Campagne" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les campagnes</SelectItem>
                        <SelectItem value="1">Responsable Comptable</SelectItem>
                        <SelectItem value="2">Développeur Full Stack</SelectItem>
                        <SelectItem value="3">Chargé de Communication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="all" className="m-0">
                  <DataTable columns={candidateColumns} data={filteredCandidates} />
                </TabsContent>
                <TabsContent value="pending" className="m-0">
                  <DataTable 
                    columns={candidateColumns} 
                    data={filteredCandidates.filter(c => c.status === "pending")} 
                  />
                </TabsContent>
                <TabsContent value="reviewed" className="m-0">
                  <DataTable 
                    columns={candidateColumns} 
                    data={filteredCandidates.filter(c => c.status === "reviewed")} 
                  />
                </TabsContent>
                <TabsContent value="shortlisted" className="m-0">
                  <DataTable 
                    columns={candidateColumns} 
                    data={filteredCandidates.filter(c => c.status === "shortlisted")} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}