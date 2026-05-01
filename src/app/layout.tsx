import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/webflow.css";
import "@/styles/custom.css";
import "./globals.css";
import AnimationProvider from "@/components/Providers/AnimationProvider";
import ScrollReveal from "@/components/ScrollReveal";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "КРАСИВОЕ ДЕЛО — Оборудование для салонов и клиник",
  description:
    "Поставки лазерного оборудования и аппаратной косметологии для салонов и клиник. Прямые контракты с производителями, гарантия 12 месяцев, обучение мастеров и сервисный центр в Москве.",
  openGraph: {
    title: "КРАСИВОЕ ДЕЛО — Оборудование для салонов и клиник",
    description:
      "Поставки лазерного оборудования и аппаратной косметологии для салонов и клиник. Прямые контракты с производителями, гарантия 12 месяцев, обучение мастеров и сервисный центр в Москве.",
    type: "website",
    images: ["/images/692f49f1afb55cbab80de786_GL-open-graph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "КРАСИВОЕ ДЕЛО — Оборудование для салонов и клиник",
    description:
      "Поставки лазерного оборудования и аппаратной косметологии для салонов и клиник.",
  },
  icons: {
    icon: "/images/690259b69f89ee33a3d0015a_G Favicon.png",
    apple: "/images/69051ba2c6f5ceca04e3348d_Good Life - Webclip.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} w-mod-js`} suppressHydrationWarning={true}>
      <body className="is-home">
        <CartProvider>
          <AnimationProvider>
            {children}
            <ScrollReveal />
          </AnimationProvider>
        </CartProvider>
      </body>
    </html>
  );
}
