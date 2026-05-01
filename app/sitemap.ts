import { MetadataRoute } from 'next'
import { getCompanies, getCities } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alkohali-bus.com'

  const [companies, cities] = await Promise.all([
    getCompanies(),
    getCities(),
  ])

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/trips`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/routes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Add all company dynamic pages
  companies.forEach((company) => {
    sitemapEntries.push({
      url: `${baseUrl}/companies/${company.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // Add all route dynamic pages (Programmatic SEO)
  const yemenCities = cities.filter((c) => c.country === "yemen")
  const saudiCities = cities.filter((c) => c.country === "saudi")

  // Yemen to Saudi
  yemenCities.forEach((y) => {
    saudiCities.forEach((s) => {
      sitemapEntries.push({
        url: `${baseUrl}/routes/${y.slug}-to-${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      })
    })
  })

  // Saudi to Yemen
  saudiCities.forEach((s) => {
    yemenCities.forEach((y) => {
      sitemapEntries.push({
        url: `${baseUrl}/routes/${s.slug}-to-${y.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      })
    })
  })

  return sitemapEntries
}
