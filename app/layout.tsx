import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Headers from "./component/Headers";
import Footer from "./component/Footer";
import { CartProvider } from "./context/CartContext";

import { DataProvider } from "./context/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sasa Kopi",
  description: "Suasana Kuno, Fasilitas Modern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DataProvider>
          <CartProvider>
            <Headers />
            {children}
            <Footer />
          </CartProvider>
        </DataProvider>
      </body>
    </html>
  );
}
