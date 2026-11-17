import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoBytes = fs.readFileSync(
    path.join(process.cwd(), "public/brand/logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0a0a0f",
          color: "#f2ede3",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} alt="" width={56} height={56} style={{ objectFit: "cover" }} />
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            HyperDrift
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.0,
              fontWeight: 900,
              letterSpacing: "-1px",
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            We build with founders.
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(242,237,227,0.55)",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            A team behind your app
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(242,237,227,0.4)",
            letterSpacing: "0.08em",
            textTransform: "lowercase",
          }}
        >
          hyperdrift.io
        </div>
      </div>
    ),
    size
  );
}
