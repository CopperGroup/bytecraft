import { Store } from "@/constants/store";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let filtredProducts: any[] = [];

    try {
        const response = await fetch(`${Store.domain}/api/catalog`, { cache: 'no-store' });
        if (response.ok) {
          const result  = await response.json();

          filtredProducts = result.data
        } else {
        console.error("Failed to fetch catalog for sitemap.");
        }
    } catch (error) {
        console.error("Error fetching catalog:", error);
    }
    
  const productEntries: MetadataRoute.Sitemap = filtredProducts.map(({ _id }) => ({
    url: `${Store.domain}/catalog/${_id}`,
  }));

  return [
    {
      url: `${Store.domain}/`,
    },
    {
      url: `${Store.domain}/contact`,
    },
    {
      url: `${Store.domain}/warranty`,
    },
    {
      url: `${Store.domain}/shipping`,
    },
    ...productEntries,
  ];
}
