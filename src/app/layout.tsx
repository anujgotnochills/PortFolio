import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Anton, Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { homeUrl, siteConfig } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const caveat = Caveat({ subsets: ["latin"], weight: "600", variable: "--font-hand" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Anuj',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: 'Anuj', url: homeUrl }],
  creator: 'Anuj',
  category: 'Video editing portfolio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: '/opengraph-image', alt: 'Anuj - video editor and visual storyteller' }],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico?v=orange-dot', type: 'image/x-icon', sizes: '16x16 32x32 48x48' },
      { url: '/favicon-16x16.png?v=orange-dot', type: 'image/png', sizes: '16x16' },
      { url: '/icon.png?v=orange-dot', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.svg?v=orange-dot', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: { url: '/apple-icon.png?v=orange-dot', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          inter.variable,
          anton.variable,
          caveat.variable
        )}
        suppressHydrationWarning
      >
        <LenisProvider>
          {children}
          <Toaster />
        </LenisProvider>
      </body>
    </html>
  );
}
