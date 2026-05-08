import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "@/styles/webflow.css";
import "@/styles/custom.css";
import "./globals.css";
import AnimationProvider from "@/components/Providers/AnimationProvider";
import ScrollReveal from "@/components/ScrollReveal";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

export const SITE_URL = "https://krasivoe-delo.ru";
const SITE_NAME = "Красивое Дело";
const HOME_TITLE = "КРАСИВОЕ ДЕЛО — оборудование для салонов и клиник в Москве";
const HOME_DESCRIPTION =
  "Лазерное оборудование и аппаратная косметология для салонов красоты и клиник: Soprano Titanium, Hydrafacial, Morpheus, Velashape, Эльза. Прямые поставки, гарантия 12 месяцев, обучение мастеров, сервисный центр в Москве.";
const KEYWORDS = [
  "лазерное оборудование",
  "лазерная эпиляция",
  "аппаратная косметология",
  "оборудование для салонов",
  "оборудование для клиник",
  "Soprano Titanium",
  "Hydrafacial",
  "Morpheus MR8",
  "Velashape",
  "Эндосфера",
  "кушетка Эльза",
  "поставщик косметологического оборудования Москва",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s — Красивое Дело",
  },
  description: HOME_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "ООО Красивое Дело" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    locale: "ru_RU",
    images: ["/images/692f49f1afb55cbab80de786_GL-open-graph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/images/690259b69f89ee33a3d0015a_G Favicon.png",
    apple: "/images/69051ba2c6f5ceca04e3348d_Good Life - Webclip.png",
  },
  verification: {
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "ООО «Красивое Дело»",
  url: SITE_URL,
  logo: `${SITE_URL}/images/690259b69f89ee33a3d0015a_G Favicon.png`,
  email: "sales@krasivoedelo.com",
  telephone: "+7-495-123-45-67",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  areaServed: "RU",
  sameAs: [] as string[],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} w-mod-js`} suppressHydrationWarning={true}>
      <body className="is-home">
        <Preloader />
        <CartProvider>
          <AnimationProvider>
            {children}
            <ScrollReveal />
          </AnimationProvider>
        </CartProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }}
        />

        {process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID && (
          <>
            <Script id="ym-counter" strategy="afterInteractive">
              {`
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document,"script","https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
              `}
            </Script>
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}

        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
