import { ImageResponse } from "next/og";

// Metadata, JSON-LD, and per-page OG tags across the site reference
// /og-image.jpg as an absolute URL, so the image must live at this exact path.
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, textAlign: "center" }}>
          Minneapolis Kitchen &amp; Bath
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#cbd5e1",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Kitchen &amp; Bathroom Remodeling Across the Twin Cities
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#fbbf24",
            marginTop: 48,
          }}
        >
          minneapoliskitchenandbath.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
