import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giannis Tsiamakis | Software Developer & Engineer",
  description: "Personal portfolio of Giannis Tsiamakis, a software developer and engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
