import { Geist } from "next/font/google";
import "./globals.css";
import {
  getSiteUrl,
  ogImage,
  siteDescription,
  siteName,
  siteTitle,
} from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "shopping",
  keywords: [
    "Zevel & Co",
    "Zevel and Co",
    "premium jewelry",
    "modern jewelry",
    "gold jewelry",
    "diamond jewelry",
    "gold necklace",
    "diamond pendant",
    "gold bracelet",
    "diamond ring",
    "white gold jewelry",
    "yellow gold jewelry",
    "rose gold jewelry",
    "jewelry coming soon",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JewelryStore",
      "@id": `${siteUrl}/#store`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logo.webp`,
      image: `${siteUrl}${ogImage.url}`,
      description: siteDescription,
      slogan: "Premium jewelry for the modern world",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#store` },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#store` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="m-0 h-full overflow-hidden bg-white p-0 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
