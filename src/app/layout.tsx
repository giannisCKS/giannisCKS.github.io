import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Giannis Papakostas | Software Developer & Engineer",
  description:
    "Personal portfolio of Giannis Papakostas — a software developer and engineer specializing in full-stack web applications and robust backend systems.",
  openGraph: {
    title: "Giannis Papakostas | Software Developer & Engineer",
    description:
      "Personal portfolio of Giannis Papakostas — software developer and engineer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
