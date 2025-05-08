import { baseUrl } from "lib/utils";
import { getCollections, getProducts } from "lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/product`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/collection`, lastModified: new Date().toISOString() },
  ];

  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts(),
  ]);

  const dynamicRoutes = [
    ...collections.map((collection) => ({
      url: `${baseUrl}/collection/${collection.handle}`,
      lastModified: collection.updatedAt,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt,
    })),
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `<url>
  <loc>${route.url}</loc>
  <lastmod>${route.lastModified}</lastmod>
</url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
