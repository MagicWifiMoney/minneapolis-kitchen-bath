import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

export const metadata: Metadata = {
  metadataBase: new URL("https://minneapoliskitchenandbath.com"),
  title: {
    default: "Minneapolis Kitchen & Bath | Remodeling Contractors",
    template: "%s | Minneapolis Kitchen & Bath",
  },
  description:
    "Minneapolis Kitchen & Bath — trusted local remodeling contractors for kitchens and bathrooms across the Twin Cities. Get a free quote today.",
  keywords: [
    "kitchen remodeling Minneapolis",
    "bathroom remodeling Minneapolis",
    "kitchen contractor Twin Cities",
    "bathroom renovation MN",
    "Minneapolis kitchen and bath",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://minneapoliskitchenandbath.com",
    siteName: "Minneapolis Kitchen & Bath",
    title: "Minneapolis Kitchen & Bath | Remodeling Contractors",
    description:
      "Trusted local remodeling contractors for kitchens and bathrooms across the Twin Cities.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Minneapolis Kitchen & Bath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minneapolis Kitchen & Bath | Remodeling Contractors",
    description:
      "Trusted local remodeling contractors for kitchens and bathrooms across the Twin Cities.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <LocalBusinessSchema />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
