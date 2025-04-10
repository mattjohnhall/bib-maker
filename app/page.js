import campaigns from './data/campaigns.json';
import Generator from "./components/generator"

export default function Home() {
  const defaultCampaign = campaigns[0];

  if (defaultCampaign) {
    return <Generator campaign={defaultCampaign} />
  }

  return <p>No campaigns found</p>;
}