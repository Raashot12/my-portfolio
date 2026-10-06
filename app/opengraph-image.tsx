import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rasheed Iskilu - Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#3155df",
          color: "#fffdf7",
          fontFamily: "Georgia, serif",
          padding: "66px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 570,
            height: 570,
            border: "2px solid rgba(255,255,255,.16)",
            borderRadius: 999,
            right: -165,
            top: -285,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: 999,
            right: 66,
            bottom: -182,
            background: "#d9ff66",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", width: 920 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 78,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            RI<span style={{ color: "#d9ff66" }}>.</span>
            <span style={{ marginLeft: 28, opacity: 0.72, fontSize: 18 }}>
              Senior Frontend Engineer
            </span>
          </div>
          <div style={{ fontSize: 78, lineHeight: 0.98, fontWeight: 800, letterSpacing: "-0.055em" }}>
            Product interfaces
            <br />
            people can <span style={{ color: "#d9ff66" }}>trust.</span>
          </div>
          <div style={{ display: "flex", marginTop: 60, fontSize: 20, opacity: 0.76 }}>
            React · Next.js · TypeScript · React Native
          </div>
        </div>
      </div>
    ),
    size,
  );
}
