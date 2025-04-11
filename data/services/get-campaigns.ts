import { Campaign } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";

export async function getCampaigns(): Promise<Campaign[]> {
    const url =
        getStrapiURL() + "/api/campaigns?populate=image&sort[0]=id:desc";

    const response = await fetch(url);
    const data = await response.json();

    return data.data;
}
