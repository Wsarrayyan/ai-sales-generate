import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SalesForge AI — AI-Powered Sales Page Generator",
  description:
    "Transform your product information into stunning, high-converting sales pages in seconds using AI.",
  keywords: ["sales page", "AI", "marketing", "copywriting", "landing page"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-dark-900 text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
