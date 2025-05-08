import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection, getCollectionProducts } from "lib/api";
import { baseUrl, ICON_IMAGE_URL, SITE_NAME } from "lib/utils";
import { getCollectionTitle, getCollectionDescription } from "lib/i18n/seo_heb";
import { Product } from "lib/types";
import ClientProduct from "components/product/client-product";

// merge duplicate
function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

type Props = {
  params: { collection: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = params;
  const decoded = safeDecodeURIComponent(collection);
  const collectionData = await getCollection(decoded);
  if (!collectionData) return notFound();

  const title = getCollectionTitle(collectionData.title);
  const description = getCollectionDescription(collectionData.title);

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/collection/${decoded}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/collection/${decoded}`,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: ICON_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "he_IL",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ICON_IMAGE_URL],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { collection } = params;
  const decoded = safeDecodeURIComponent(collection);
  const collectionData = await getCollection(decoded);
  if (!collectionData) return notFound();

  const products: Product[] = await getCollectionProducts({
    collection: decoded,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${baseUrl}/product/${product.handle}`,
      name: product.title,
    })),
  };

  return (
    <section>
      <h1 className="sr-only">{collectionData.title}</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientProduct products={products} />
    </section>
  );
}
