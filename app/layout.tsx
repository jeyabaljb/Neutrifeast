import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neutrifeast | Homemade Goodness",
  description:
    "Wholesome millet biscuits, laddus, brownies and cakes handmade with care.",
  icons: { icon: "/image.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
