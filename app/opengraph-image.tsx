import { ImageResponse } from "next/og";
import { business, slogans } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${business.name} — ${business.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0B0F",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 20,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#00AEEF" }} />
          <div style={{ flex: 1, backgroundColor: "#EC008C" }} />
          <div style={{ flex: 1, backgroundColor: "#FFD500" }} />
          <div style={{ flex: 1, backgroundColor: "#E11D2E" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              color: "#FFD500",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {slogans.fast}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "white",
              marginTop: 24,
              lineHeight: 1.05,
            }}
          >
            {business.name}
          </div>
          <div style={{ fontSize: 40, color: "#E11D2E", marginTop: 16, fontWeight: 700 }}>
            {business.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.7)" }}>
            Banners · Signage · Stickers · T-Shirts · Cards
          </div>
          <div style={{ fontSize: 32, color: "white", fontWeight: 700 }}>
            {business.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
