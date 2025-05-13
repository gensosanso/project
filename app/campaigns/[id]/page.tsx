import CampaignDetails from "./campaign-details";

// Mock campaign IDs - in production, these would come from your data source
const campaignIds = ["1", "2", "3", "4", "5"];

export async function generateStaticParams() {
  return campaignIds.map((id) => ({
    id,
  }));
}

export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  return <CampaignDetails id={params.id} />;
}