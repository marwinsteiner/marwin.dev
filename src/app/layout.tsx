import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "marwin@london ~ $",
  description: "Marwin Steiner — Aspiring Quant, Derivatives Researcher, Builder. Explore my work in an interactive terminal.",
  keywords: ["Marwin Steiner", "quantitative finance", "derivatives", "systematic trading", "volatility", "London"],
  authors: [{ name: "Marwin Steiner" }],
  openGraph: {
    title: "marwin@london ~ $",
    description: "Aspiring Quant | Co-Founder @ Datex | Ex-Swiss Re. Interactive terminal portfolio.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    creator: "@steiner_marwin",
    title: "marwin@london ~ $",
    description: "Aspiring Quant | Co-Founder @ Datex | Ex-Swiss Re",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>></text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="crt-flicker">{children}</body>
    </html>
  );
}
