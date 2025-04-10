import campaigns from '../data/campaigns.json'
import Generator from "../components/generator"

export default async function Page(props) {
  const params = await props.params;
  const campaign = campaigns.find((c) => c.slug === params.slug)

  return <Generator campaign={campaign} />
}
