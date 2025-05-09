import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import Head from "next/head"; // ✅ Add Head for fallback <meta>

import { getProducts } from "lib/api";
import { Gallery } from "components/product/Gallery";
import { ProductDescription } from "components/product/product-description";
import { Image, Product } from "lib/types/entities";

type Props = {
  params: Promise<{ handle: string }>;
};

async function getProductByHandle(
  handle: string,
): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.handle === handle);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const decodedHandle = decodeURIComponent(handle);
  const product: Product = (await getProductByHandle(decodedHandle)) as Product;

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
      robots: "noindex",
    };
  }

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `https://yourdomain.com/product/${decodedHandle}`,
    },
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.featuredImage.url,
          width: 1200,
          height: 630,
          alt: product.featuredImage.altText || product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.featuredImage.url],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const decodedHandle = decodeURIComponent(handle);
  const product: Product = (await getProductByHandle(decodedHandle)) as Product;

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "ILS",
      price: product.price,
    },
  };

  return (
    <>
      {/* ✅ Fallback SEO tags for older bots / preview */}
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.featuredImage.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.featuredImage.url} />
      </Head>

      {/* ✅ Structured product data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col gap-6 rounded-lg border border-theme bg-theme p-8 md:p-12 lg:flex-row lg:gap-8 ">
          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
