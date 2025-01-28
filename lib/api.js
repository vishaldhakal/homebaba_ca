import { preconCityList } from '@/data/preconCityList';
import axios from 'axios';

const API_BASE_URL = 'https://api.homebaba.ca/api';

// Clean text for XML
function cleanText(text) {
  if (!text) return '';
  return text.toString()
    .replace(/&/g, 'and')
    .replace(/[<>"']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\/]/g, '')
    .trim();
}

// Clean slug for URL
function cleanSlug(slug) {
  if (!slug) return '';
  return slug.toString()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim();
}

// Static pages configuration
export async function getAllStaticPages() {
  const staticPages = [
    { path: '', priority: 1.0 },
    { path: 'about-us', priority: 0.8 },
    { path: 'contact-us', priority: 0.8 },
    { path: 'privacy', priority: 0.6 },
    { path: 'maldives-vacation-projects', priority: 0.7 },
    { path: 'top-10-gta-projects', priority: 0.7 },
    { path: 'pre-construction-homes', priority: 0.8 },
  ];

  return staticPages.map(page => ({
    path: cleanSlug(page.path),
    priority: page.priority,
    changefreq: page.priority >= 0.8 ? 'daily' : 'weekly'
  }));
}

// Get all cities from the preconCityList
export async function getAllCities() {
  return preconCityList.map(city => ({
    name: cleanText(city.city_name_cap),
    slug: cleanSlug(city.city_name),
    priority: 0.8,
    changefreq: 'daily'
  }));
}

// Helper function for API calls with retry
async function fetchWithRetry(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await axios.get(url, { 
        timeout: 10000,
        validateStatus: status => status === 200
      });
      return response.data;
    } catch (error) {
      if (i === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
}

function generateListingUrl(citySlug, listingSlug, type) {
  const safeCity = cleanSlug(citySlug);
  const safeListing = cleanSlug(listingSlug);

  switch(type) {
    case 'pre-construction':
      return `/${safeCity}/${safeListing}`;
    case 'resale':
      return `/resale/${safeCity}/${safeListing}`;
    default:
      return `/${safeCity}/${safeListing}`;
  }
}

async function fetchListingsForCity(city, type = 'pre-construction') {
  try {
    let endpoint = '';
    let perPage = 100;
    
    const citySlug = cleanSlug(city.slug);
    
    switch(type) {
      case 'pre-construction':
        endpoint = `${API_BASE_URL}/pre-constructions-city/${citySlug}/?perpage=${perPage}&page=1`;
        break;
      case 'resale':
        endpoint = `${API_BASE_URL}/resale-city/${citySlug}/?page=1&perpage=${perPage}`;
        break;
      default:
        return [];
    }

    const data = await fetchWithRetry(endpoint);
    
    if (!data?.data?.results || !Array.isArray(data.data.results)) {
      console.warn(`No ${type} listings found for ${city.name}`);
      return [];
    }

    return data.data.results
      .filter(listing => listing && (listing.slug || listing.id))
      .map(listing => {
        const listingSlug = cleanSlug(listing.slug || listing.id.toString());
        return {
          slug: listingSlug,
          city: {
            name: cleanText(city.name),
            slug: citySlug
          },
          type,
          updatedAt: listing.updated_at || new Date().toISOString(),
          priority: type === 'pre-construction' ? 0.64 : 0.6,
          changefreq: 'daily',
          url: generateListingUrl(citySlug, listingSlug, type)
        };
      });
  } catch (error) {
    if (error.response?.status === 502) {
      console.warn(`No ${type} listings available for ${city.name}`);
    } else {
      console.error(`Error fetching ${type} listings for ${city.name}:`, error.message);
    }
    return [];
  }
}

// Get all listings including pre-construction and resale
export async function getAllListings() {
  try {
    const cities = await getAllCities();
    
    // Process cities in smaller batches
    const batchSize = 5;
    const listings = [];
    
    for (let i = 0; i < cities.length; i += batchSize) {
      const cityBatch = cities.slice(i, i + batchSize);
      const batchPromises = cityBatch.flatMap(city => [
        fetchListingsForCity(city, 'pre-construction'),
        fetchListingsForCity(city, 'resale')
      ]);

      const batchResults = await Promise.all(batchPromises);
      listings.push(...batchResults.flat());
      
      if (i + batchSize < cities.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return listings.filter(listing => listing.slug);
  } catch (error) {
    console.error('Error fetching all listings:', error.message);
    return [];
  }
}

// Get additional routes including city-specific pages
export async function getAdditionalRoutes() {
  return [
    // City-specific routes
    ...preconCityList.map(city => ({
      path: cleanSlug(city.city_name),
      priority: 0.8,
      changefreq: 'daily',
      subpages: ['pre-construction', 'condos']
    })),
    // Pre-construction homes
    {
      path: 'pre-construction-homes',
      priority: 0.8,
      changefreq: 'daily',
      subpages: preconCityList.map(city => cleanSlug(city.city_name))
    },
    // Blog pages
    {
      path: 'blog',
      priority: 0.6,
      changefreq: 'daily',
      subpages: ['pre-construction', 'resale']
    },
    // Resale pages
    {
      path: 'resale',
      priority: 0.7,
      changefreq: 'daily',
      subpages: preconCityList.map(city => cleanSlug(city.city_name))
    },
    // Other sections
    {
      path: 'portal',
      priority: 0.5,
      changefreq: 'weekly'
    },
    {
      path: 'developer',
      priority: 0.6,
      changefreq: 'weekly'
    },
    {
      path: 'agent',
      priority: 0.6,
      changefreq: 'weekly'
    }
  ];
}
