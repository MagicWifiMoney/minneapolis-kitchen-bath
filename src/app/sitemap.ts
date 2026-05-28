import { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://minneapoliskitchenandbath.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/service-areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${BASE_URL}/service-areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const serviceCityPages: MetadataRoute.Sitemap = [];
  for (const s of services.filter((s) => s.isCityPageEnabled)) {
    for (const c of cities) {
      serviceCityPages.push({
        url: `${BASE_URL}/${s.urlSegment}/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updated ? new Date(p.updated) : new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...serviceCityPages,
    ...blogPages,
  ];
}
