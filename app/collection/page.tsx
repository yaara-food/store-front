import { Metadata } from "next";
import { getProducts } from "lib/api";
import {
  metadata_category_title,
  metadata_category_description,
  metadata_keywords,
} from "lib/i18n/seo_heb";
import { baseUrl } from "lib/utils";
import { H1SeoTitle } from "components/messages";
import ClientProduct from "components/product/client-product";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: metadata_category_title,
    description: metadata_category_description,
    keywords: metadata_keywords,
  };
}

export default async function CollectionPage() {
  const products = await getProducts();

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
    <>
      <H1SeoTitle />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientProduct products={products} />
    </>
  );
}
