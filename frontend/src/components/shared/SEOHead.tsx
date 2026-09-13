import React from "react";

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  keywords?: string[];
  eventSchema?: Record<string, any>;
  personSchema?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "The Voice of Oneness 2026 — UK's Largest National Qur'an Recitation Competition | TV One UK",
  description = "Join The Voice of Oneness Season 6, Europe & the UK's largest national Qur'an recitation competition for kids and youth. Register for auditions in London, Birmingham, Manchester, and online.",
  canonicalUrl = "https://thevoiceofoneness.tvoneuk.com",
  ogImage = "https://thevoiceofoneness.tvoneuk.com/images/og-default.jpg", // Must always be an absolute URL for social/AI crawlers
  ogType = "website",
  keywords = [
    "Quran competition London",
    "Kids Quran competition UK",
    "Children Quran recitation competition",
    "National Quran competition UK",
    "Largest Quran competition in Europe",
    "Quran Tilawat competition",
    "Tajweed competition for youth",
    "Islamic competitions in London",
    "The Voice of Oneness",
    "TV One UK Sky 781",
  ],
  eventSchema,
  personSchema,
}) => {
  // 1. Comprehensive Event Schema
  const defaultEventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "The Voice of Oneness Season 6 — National Qur'an Competition",
    alternateName: [
      "Voice of Oneness Quran Competition",
      "UK National Kids Quran Competition",
      "TV One UK Quran Tilawat Contest",
    ],
    description:
      "The UK's flagship and largest annual Qur'an recitation (Tilawat) and Tajweed competition for children and youth, broadcast nationally across Europe and the UK by TV One UK.",
    startDate: "2026-04-01T18:00:00+00:00",
    endDate: "2026-05-01T21:00:00+00:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    typicalAgeRange: "5-25",
    inLanguage: ["en", "ar"],
    location: [
      {
        "@type": "Place",
        name: "The Royal Regency London",
        address: {
          "@type": "PostalAddress",
          streetAddress: "501 High St N, Manor Park",
          addressLocality: "London",
          postalCode: "E12 6TH",
          addressCountry: "GB",
        },
      },
      {
        "@type": "VirtualLocation",
        url: canonicalUrl,
      },
    ],
    organizer: {
      "@type": "Organization",
      name: "TV One UK",
      url: "https://www.tvoneuk.tv",
      logo: "https://www.tvoneuk.tv/logo.png",
      sameAs: [
        "https://www.youtube.com/@tvoneuk",
        "https://www.facebook.com/tvoneuk",
        "https://www.instagram.com/tvoneuk",
      ],
    },
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Kids, Youth, Qur'an Reciters, Families",
      geographicArea: {
        "@type": "Country",
        name: "United Kingdom",
      },
    },
    offers: {
      "@type": "Offer",
      name: "Competitor Registration",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: `${canonicalUrl}/register`,
      validFrom: "2026-01-01",
    },
  };

  // 2. FAQ Schema — Core accelerator for Google Rich Snippets & AI answers
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the largest Qur'an competition in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Voice of Oneness, organised annually by TV One UK (Sky 781), is the UK and Europe's premier and largest national Qur'an recitation competition, drawing thousands of young reciters across London and nationwide.",
        },
      },
      {
        "@type": "Question",
        name: "Can kids and teenagers participate in The Voice of Oneness?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, The Voice of Oneness features dedicated categories for children and youth, judging participants on correct Tajweed, vocal melody (Husan-e-Sawt), memorisation, and short Islamic presentations.",
        },
      },
      {
        "@type": "Question",
        name: "Where do the Qur'an competition auditions take place in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Auditions take place regionally across major UK hubs including London, Birmingham, and Manchester, with physical finals hosted at venues like The Royal Regency in London, along with remote audition options.",
        },
      },
    ],
  };

  // 3. Organization & Breadcrumbs Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Voice of Oneness",
    url: canonicalUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${canonicalUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const activeEventSchema = eventSchema || defaultEventSchema;

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* Geotargeting & Language for Local UK Search */}
      <meta name="geo.region" content="GB-LND" />
      <meta name="geo.placename" content="London" />
      <meta name="language" content="English" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta
        property="og:site_name"
        content="The Voice of Oneness — TV One UK"
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta
        property="og:image:alt"
        content="The Voice of Oneness National Quran Competition UK"
      />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tvoneuk" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data: Event */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activeEventSchema) }}
      />

      {/* Structured Data: FAQPage (LLM / AI Overview Target) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Structured Data: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Structured Data: Person / Judges / Finalists (Optional) */}
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
    </>
  );
};

export default SEOHead;
