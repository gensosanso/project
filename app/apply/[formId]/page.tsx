import ApplicationForm from './application-form';
import { Campaign } from '@/types';

// Mock campaign IDs - in production, these would come from your data source
const campaignIds = ["1", "2", "3", "4", "5"];

export async function generateStaticParams() {
  return campaignIds.map((id) => ({
    formId: id,
  }));
}

// This is a Server Component that passes data to the Client Component
export default function ApplicationPage({ params }: { params: { formId: string } }) {
  // Mock data for campaign - in production, this would come from your database
  const mockCampaign: Campaign = {
    id: params.formId,
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

  return <ApplicationForm campaign={mockCampaign} />;
}