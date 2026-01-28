import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Matenote - Notas Potenciadas con IA",
    template: "%s | Matenote"
  },
  description: "Transformá tu aprendizaje con Matenote. Creá notas con IA desde videos de YouTube, PDFs y grabaciones de audio. Organizá, estudiá y dominá cualquier tema eficientemente.",
  keywords: [
    "apuntes con inteligencia artificial",
    "resumir videos de youtube para estudiar",
    "crear apuntes desde pdf",
    "app para estudiar con ia",
    "transcribir audios para estudiar",
    "resúmenes automáticos",
    "estudiar mejor",
    "flashcards ia"
  ],
  authors: [{ name: "Equipo Matenote" }],
  creator: "Matenote",
  metadataBase: new URL("https://matenote.app"), // Placeholder, update with actual domain
  openGraph: {
    title: "Matenote - Notas Potenciadas con IA",
    description: "Transformá tu aprendizaje con IA. Creá notas desde cualquier fuente al instante.",
    url: "https://matenote.app",
    siteName: "Matenote",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matenote - Notas Potenciadas con IA",
    description: "Transformá tu aprendizaje con IA. Creá notas desde cualquier fuente al instante.",
    creator: "@matenote", // Placeholder
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Matenote",
              "url": "https://matenote.app",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web",
              "description": "Transformá tu aprendizaje con IA. Creá notas desde YouTube, PDF y Audio.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
