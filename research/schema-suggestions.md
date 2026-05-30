# Schema Suggestions (ready to paste)

Drop these JSON-LD blocks into a `<script type="application/ld+json">` tag (or `dangerouslySetInnerHTML` with `JSON.stringify`). Replace bracket [placeholders] with real values, never fabricate ratings or review counts.

## blog/[slug]/page.tsx  (blog)

### Missing: Author

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Author Name placeholder]",
  "jobTitle": "[Title]",
  "worksFor": { "@type": "Organization", "name": "Minneapolis Kitchen & Bath" }
}
```

### Missing: FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 1]" }
    },
    {
      "@type": "Question",
      "name": "[Question 2]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 2]" }
    }
  ]
}
```

### Missing: BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mnkitchenbath.com/" },
    { "@type": "ListItem", "position": 2, "name": "[Section]", "item": "https://mnkitchenbath.com/[section]/" },
    { "@type": "ListItem", "position": 3, "name": "[Page Title]", "item": "https://mnkitchenbath.com/[section]/[slug]/" }
  ]
}
```

## blog/kitchen-remodel-cost-minneapolis/page.tsx  (blog)

### Missing: Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Post Title]",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": { "@type": "Person", "name": "[Author Name placeholder]" },
  "publisher": {
    "@type": "Organization",
    "name": "Minneapolis Kitchen & Bath",
    "url": "https://mnkitchenbath.com/"
  },
  "mainEntityOfPage": "https://mnkitchenbath.com/blog/[slug]/"
}
```

### Missing: Author

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Author Name placeholder]",
  "jobTitle": "[Title]",
  "worksFor": { "@type": "Organization", "name": "Minneapolis Kitchen & Bath" }
}
```

### Missing: BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mnkitchenbath.com/" },
    { "@type": "ListItem", "position": 2, "name": "[Section]", "item": "https://mnkitchenbath.com/[section]/" },
    { "@type": "ListItem", "position": 3, "name": "[Page Title]", "item": "https://mnkitchenbath.com/[section]/[slug]/" }
  ]
}
```

## blog/page.tsx  (blog)

### Missing: Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Post Title]",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": { "@type": "Person", "name": "[Author Name placeholder]" },
  "publisher": {
    "@type": "Organization",
    "name": "Minneapolis Kitchen & Bath",
    "url": "https://mnkitchenbath.com/"
  },
  "mainEntityOfPage": "https://mnkitchenbath.com/blog/[slug]/"
}
```

### Missing: Author

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Author Name placeholder]",
  "jobTitle": "[Title]",
  "worksFor": { "@type": "Organization", "name": "Minneapolis Kitchen & Bath" }
}
```

### Missing: FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 1]" }
    },
    {
      "@type": "Question",
      "name": "[Question 2]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 2]" }
    }
  ]
}
```

### Missing: BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mnkitchenbath.com/" },
    { "@type": "ListItem", "position": 2, "name": "[Section]", "item": "https://mnkitchenbath.com/[section]/" },
    { "@type": "ListItem", "position": 3, "name": "[Page Title]", "item": "https://mnkitchenbath.com/[section]/[slug]/" }
  ]
}
```

## services/[slug]/page.tsx  (service-hub)

### Missing: LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Minneapolis Kitchen & Bath",
  "url": "https://mnkitchenbath.com/",
  "telephone": "[phone]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[street]",
    "addressLocality": "Minneapolis",
    "addressRegion": "MN",
    "postalCode": "[zip]",
    "addressCountry": "US"
  },
  "areaServed": { "@type": "Place", "name": "[City or Neighborhood]" }
}
```

### Missing: FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 1]" }
    },
    {
      "@type": "Question",
      "name": "[Question 2]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 2]" }
    }
  ]
}
```

