import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Fira_Code } from "next/font/google";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { ThemeProvider }  from "@/components/ui/ThemeProvider";
import "./globals.css";
import { siteConfig } from "@/lib/data";

const dmSans   = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmSerif  = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} — Software Developer`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} — Software Developer`,
    description: siteConfig.description,
    url: siteConfig.url, siteName: siteConfig.name, locale: "en_US", type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${dmSerif.variable} ${firaCode.variable} cursor-none antialiased font-sans`}>
        <ThemeProvider>
          <MagneticCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
