import React from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  eventSchema?: Record<string, any>;
  personSchema?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "The Voice of Oneness — National Qur'an Recitation Competition | TV One UK",
  description = "The Voice of Oneness is the UK's premier national Qur'an recitation competition organized by TV One UK. The largest Quran competition in London & Europe since 2021.",
  canonicalUrl = "https://thevoiceofoneness.tvoneuk.com",
  ogImage = "/images/og-default.jpg",
  ogType = "website",
  eventSchema,
  personSchema
}) => {
  const defaultEventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "The Voice of Oneness Season 6",
    "description": "National Qur'an recitation competition organized by TV One UK",
    "startDate": "2026-04-01T18:00:00+00:00",
    "endDate": "2026-05-01T21:00:00+00:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "TV One UK Studios",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "UK"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "TV One UK",
      "url": "https://tvoneuk.com"
    }
  };

  const activeEventSchema = eventSchema || defaultEventSchema;

  return (
    <>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="Quran competition London, national Quran competition, largest Quran competition in Europe, The Voice of Oneness, TV One UK" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activeEventSchema) }}
      />

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
