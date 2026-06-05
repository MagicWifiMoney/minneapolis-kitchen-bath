import { ImageResponse } from "next/og";

// Shared Open Graph image renderer for the file-convention opengraph-image
// routes. Generates branded 1200x630 social cards at build time so every page
// has a real, on-brand og:image (the site previously referenced a missing
// /og-image.jpg). Uses the default font — no external asset required.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage({
  title,
  eyebrow = "Minneapolis Kitchen & Bath",
  subtitle,
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f172a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 56,
              background: "#2563eb",
              borderRadius: 6,
            }}
          />
          <div
            style={{
              color: "#93c5fd",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: title.length > 60 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ color: "#cbd5e1", fontSize: 30 }}>
            {subtitle ?? "Twin Cities kitchen & bath remodeling"}
          </div>
          <div style={{ color: "#64748b", fontSize: 26 }}>
            minneapoliskitchenandbath.com
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
