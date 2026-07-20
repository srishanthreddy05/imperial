import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imperial Care Internal Medicine | Dr. Sumbul Islam, MD | Anna & Sherman, TX",
  description:
    "Personalized, evidence-based primary care and internal medicine led by Dr. Sumbul Islam, MD. Serving Anna, TX (Collin County) and Sherman, TX (Grayson County). Services include adult wellness exams, Semaglutide weight loss program, and B12 injections.",
  icons: {
    icon: [
      { url: "/loho.jpeg", type: "image/jpeg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/loho.jpeg",
    apple: "/loho.jpeg",
  },
  keywords: [
    "Imperial Care Internal Medicine",
    "Dr. Sumbul Islam MD",
    "Internal Medicine Anna TX",
    "Primary Care Sherman TX",
    "Semaglutide Weight Loss Anna TX",
    "Vitamin B12 Injections Sherman TX",
    "Collin County Doctor",
    "Grayson County Internal Medicine",
    "Adult Wellness Exams Anna",
  ],
  authors: [{ name: "Imperial Care Internal Medicine" }],
  openGraph: {
    title: "Imperial Care Internal Medicine | Dr. Sumbul Islam, MD",
    description: "Personalized, evidence-based care for your health in Anna, TX and Sherman, TX.",
    url: "https://imperialcareinternalmedicine.com",
    siteName: "Imperial Care Internal Medicine",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Imperial Care Internal Medicine",
  "alternateName": "Imperial Care Clinic",
  "description": "Primary care and internal medicine practice led by Dr. Sumbul Islam, MD in Anna and Sherman, Texas.",
  "medicalSpecialty": "PrimaryCare",
  "telephone": "(903) 957-0417",
  "faxNumber": "(903) 355-2938",
  "founder": {
    "@type": "Person",
    "name": "Dr. Sumbul Islam, MD",
    "jobTitle": "Internal Medicine Physician"
  },
  "location": [
    {
      "@type": "MedicalClinic",
      "name": "Imperial Care Internal Medicine - Anna (Collin County)",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "450 N Standridge Blvd, Suite 104",
        "addressLocality": "Anna",
        "addressRegion": "TX",
        "postalCode": "75409",
        "addressCountry": "US"
      },
      "telephone": "(903) 957-0417"
    },
    {
      "@type": "MedicalClinic",
      "name": "Imperial Care Internal Medicine - Sherman (Grayson County)",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1700 N Travis St",
        "addressLocality": "Sherman",
        "addressRegion": "TX",
        "postalCode": "75092",
        "addressCountry": "US"
      },
      "telephone": "(903) 957-0417"
    }
  ],
  "openingHours": "Mo-Th 08:00-17:00, Fr 08:00-17:00"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/loho.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/loho.jpeg" type="image/jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-[#00A9CE]/20 selection:text-[#005EB8]">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
