import { Helmet } from "react-helmet-async";

export type SEOProps = {
  title?: string;
  description?: string;
  type?: "website" | "article" | "faq";
  image?: string;
  url?: string;
  author?: {
    name: string;
    url?: string;
  };
  datePublished?: string;
  dateModified?: string;
  faqData?: { question: string; answer: string }[];
  organization?: boolean;
};

export default function SEO({
  title = "UNCHAIN | Unchain The World",
  description = "UNCHAIN株式会社 — 組織型AI（A.O.I）の力で世界をUNCHAINする",
  type = "website",
  image = "https://unchain.co.jp/logo-black.webp",
  url = typeof window !== "undefined" ? window.location.href : "https://unchain.co.jp",
  author,
  datePublished,
  dateModified,
  faqData,
  organization = false,
}: SEOProps) {
  // Schema generation
  const schemas = [];

  if (organization) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "UNCHAIN Co., Ltd.",
      url: "https://unchain.co.jp",
      logo: "https://unchain.co.jp/logo-black.webp",
      description: "組織型AI（A.O.I）の力で世界をUNCHAINする",
    });
  }

  if (type === "website") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "UNCHAIN",
      url: "https://unchain.co.jp",
    });
  } else if (type === "article") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: image,
      author: author
        ? { "@type": "Person", name: author.name, url: author.url }
        : { "@type": "Organization", name: "UNCHAIN" },
      publisher: {
        "@type": "Organization",
        name: "UNCHAIN",
        logo: {
          "@type": "ImageObject",
          url: "https://unchain.co.jp/logo-black.webp",
        },
      },
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
    });
  } else if (type === "faq" && faqData && faqData.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type === "article" ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="UNCHAIN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
