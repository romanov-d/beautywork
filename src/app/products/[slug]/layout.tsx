import type { Metadata } from "next";
import { getProductById } from "@/data/products";
import { SITE_URL } from "@/app/layout";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    return {
      title: "Товар не найден",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.name} — ${product.category}`;
  const description = product.description.length > 300
    ? product.description.slice(0, 297).trimEnd() + "…"
    : product.description;

  return {
    title,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${slug}`,
      type: "article",
      images: product.image ? [product.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    return <>{children}</>;
  }

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    category: product.category,
    brand: { "@type": "Brand", name: "Красивое Дело" },
    sku: product.id,
    url: `${SITE_URL}/products/${slug}`,
  };

  if (product.price > 0) {
    ld.offers = {
      "@type": "Offer",
      url: `${SITE_URL}/products/${slug}`,
      priceCurrency: "RUB",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Красивое Дело" },
    };
  } else {
    ld.offers = {
      "@type": "Offer",
      url: `${SITE_URL}/products/${slug}`,
      priceCurrency: "RUB",
      availability: "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: "Красивое Дело" },
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      {children}
    </>
  );
}
