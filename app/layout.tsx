import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Headers from "./component/Headers";
import Footer from "./component/Footer";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";

const themeInitScript = `
  (function() {
    try {
      var storedTheme = localStorage.getItem('theme');
      var hour = new Date().getHours();
      var isDaytime = hour >= 6 && hour < 18;
      var theme = storedTheme || (isDaytime ? 'light' : 'dark');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

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
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <DataProvider>
            <CartProvider>
              <Headers />
              {children}
              <Footer />
            </CartProvider>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
