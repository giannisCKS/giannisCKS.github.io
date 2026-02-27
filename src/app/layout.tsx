import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giannis Tsiamakis | Software Developer & Engineer",
  description:
    "Personal portfolio of Giannis Tsiamakis — a software developer and engineer specializing in full-stack web applications and robust backend systems.",
  openGraph: {
    title: "Giannis Tsiamakis | Software Developer & Engineer",
    description:
      "Personal portfolio of Giannis Tsiamakis — software developer and engineer.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
