import { Card, CardContent } from "@/components/ui/card";
import CandidateTable from "@/components/candidate-table";

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

export default function CampaignCandidatesPage({ params }: { params: { id: string } }) {
  // Mock data for candidates
  const candidates = [
    {
      id: "1",
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      phone: "+237 691234567",
      educationLevel: "bac+5",
      specialization: "Finance",
      yearsOfExperience: 8,
      recruitmentStage: "interview",
      status: "shortlisted",
      createdAt: "2025-02-10T14:30:00Z",
    },
    {
      id: "2",
      firstName: "Marie",
      lastName: "Kouam",
      email: "marie.kouam@example.com",
      phone: "+237 692345678",
      educationLevel: "bac+3",
      specialization: "Marketing",
      yearsOfExperience: 3,
      recruitmentStage: "applied",
      status: "pending",
      createdAt: "2025-02-08T09:15:00Z",
    },
    {
      id: "3",
      firstName: "Paul",
      lastName: "Biya",
      email: "paul.biya@example.com",
      phone: "+237 693456789",
      educationLevel: "bac+4",
      specialization: "Informatique",
      yearsOfExperience: 5,
      recruitmentStage: "technical_test",
      status: "reviewed",
      createdAt: "2025-02-05T11:45:00Z",
    },
    {
      id: "4",
      firstName: "Sophie",
      lastName: "Mbarga",
      email: "sophie.mbarga@example.com",
      phone: "+237 694567890",
      educationLevel: "bac+5",
      specialization: "Ressources Humaines",
      yearsOfExperience: 7,
      recruitmentStage: "offer",
      status: "shortlisted",
      createdAt: "2025-01-20T10:00:00Z",
    },
    {
      id: "5",
      firstName: "Robert",
      lastName: "Essama",
      email: "robert.essama@example.com",
      phone: "+237 695678901",
      educationLevel: "bac+2",
      specialization: "Informatique",
      yearsOfExperience: 2,
      recruitmentStage: "rejected",
      status: "rejected",
      createdAt: "2025-02-09T16:20:00Z",
    },
  ];

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidats de la campagne</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les candidats et leur progression dans le processus de recrutement
          </p>
        </div>
      </div>

      <CandidateTable candidates={candidates} />
    </div>
  );
}