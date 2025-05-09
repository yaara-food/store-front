import { Suspense } from "react";
import { Metadata } from "next";
import { getProducts } from "lib/api";
import SearchLayout from "../components/layout/SearchLayout";
import ClientProduct from "components/product/ClientProduct";
import LoadingProduct from "../components/shared/LoadingProduct";
import { H1SeoTitle } from "components/shared/messages";
import {
  metadata_site_description,
  metadata_site_title,
} from "../lib/i18n/seo_heb";
import { baseUrl, ICON_IMAGE_URL } from "../lib/const";

export const metadata: Metadata = {
  title: metadata_site_title,
  description: metadata_site_description,
  openGraph: {
    title: metadata_site_title,
    description: metadata_site_description,
    images: [ICON_IMAGE_URL],
    url: baseUrl,
    type: "website",
  },
};

export default async function HomePage() {
  const products = await getProducts();

  return (
    <SearchLayout>
      <H1SeoTitle />
      <Suspense fallback={<LoadingProduct />}>
        <ClientProduct products={products} />
      </Suspense>
    </SearchLayout>
  );
}
