import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rajendran Chandrasekaran Profile & AI news updates",
  description: "Personal branding website showcasing my accomplishments and latest AI technology news updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
