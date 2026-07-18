import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-source-sans-3",
});

export const metadata: Metadata = {
  title:
    "Ioannis Papakostas | Full-Stack Developer | Internal Tools, Automation & Business Systems",
  description:
    "Portfolio of Ioannis Papakostas — a full-stack developer building secure business platforms, internal tools, and workflow automation with TypeScript, React/Next.js, Python/FastAPI, SQL, and AI-assisted development.",
  openGraph: {
    title: "Ioannis Papakostas | Full-Stack Developer",
    description:
      "Portfolio of Ioannis Papakostas — full-stack developer focused on internal tools, automation, and business systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} scroll-smooth`}>
      <body className={`${sourceSans.className} antialiased`}>{children}</body>
    </html>
  );
}
