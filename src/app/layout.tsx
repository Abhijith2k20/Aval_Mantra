import type { Metadata, Viewport } from "next";
import { Anton, Caveat, Cormorant_Garamond, Manrope, Yellowtail } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const script = Yellowtail({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-caveat" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Aval Mantra — Boutique & Designer Sarees in Bengaluru",
  description:
    "Aval Mantra — boutique designer sarees in organza, georgette, tissue and net, plus a handpicked edit of Kanjivaram and Banarasi silks. Horamavu, Bengaluru. Order on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#7a0f2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${anton.variable} ${script.variable} ${caveat.variable} ${manrope.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
