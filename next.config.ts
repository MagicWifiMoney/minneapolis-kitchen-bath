import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  // Trailing-slash off keeps canonicals consistent with the URLs in sitemap.ts.
  trailingSlash: false,
  async headers() {
    // Security headers applied to every route. Kept conservative on purpose:
    // no CSP here so Google Tag Manager and the Resend API call are not broken.
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      // Long-cache the immutable hashed build assets.
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
