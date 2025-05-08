import { Suspense } from "react";
import SearchLayout from "./collection/layout";
import CollectionPage from "./collection/page";
import { baseUrl, ICON_IMAGE_URL } from "../lib/utils";
import {
  metadata_site_description,
  metadata_site_title,
} from "../lib/i18n/seo_heb";

export const metadata = {
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

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  return (
    <SearchLayout>
      <Suspense fallback={null}>
        <CollectionPage searchParams={searchParams} />
      </Suspense>
    </SearchLayout>
  );
}
