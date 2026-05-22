import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Baitun Na'im Islamic Full Day School di Blitar",
  description:
    "Baitun Na'im - Sekolah Islam Full Day School Terbaik di Blitar. Lembaga pendidikan Islam terbaik di Binangun dengan program full day school berstandar modern.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Baitun Na'im Islamic Full Day School - Blitar",
    description:
      "Sekolah Islam terbaik di Blitar dengan sistem full day school. Terletak di Binangun, Blitar, menyediakan pendidikan modern dan Islami.",
    url: "https://www.baitunnaim.com",
    siteName: "Baitun Na'im",
    images: [
      {
        url: "https://www.baitunnaim.com/logo_lpi.png",
        width: 600,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  alternates: {
    canonical: "https://www.baitunnaim.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Baitun Na'im Islamic Full Day School",
              url: "https://www.baitunnaim.com",
              logo: "https://www.baitunnaim.com/logo_lpi.png",
              image: "https://www.baitunnaim.com/logo_lpi.png",
              brand: {
                "@type": "Brand",
                name: "Baitun Na'im",
                logo: "https://www.baitunnaim.com/logo_lpi.png",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Binangun",
                addressRegion: "Blitar",
                addressCountry: "ID",
              },
              sameAs: [
                "https://www.instagram.com/mial_maarifngadri",
                "https://www.tiktok.com/@baitunnaim_official",
                "https://youtube.com/@baitunnaim_official2019",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
