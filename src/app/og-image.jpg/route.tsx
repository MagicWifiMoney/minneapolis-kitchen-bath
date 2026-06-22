import { ImageResponse } from "next/og";

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
          background: "linear-gradient(135deg, #f5f5f4 0%, #ffffff 50%, #f0fdfa 100%)",
          color: "#1c1917",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            textAlign: "center",
            letterSpacing: "-0.02em",
            maxWidth: "900px",
            lineHeight: 1.1,
          }}
        >
          Minneapolis Kitchen &amp; Bath
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#57534e",
            marginTop: 24,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Kitchen &amp; Bathroom Remodeling Across the Twin Cities
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#0f766e",
            marginTop: 48,
            fontWeight: 600,
          }}
        >
          minneapoliskitchenandbath.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
