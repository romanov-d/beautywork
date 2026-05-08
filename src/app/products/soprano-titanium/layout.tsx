import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soprano Titanium — лазер для эпиляции всех типов кожи",
  description:
    "Soprano Titanium 1200/1600 Вт — лазерная эпиляция с тремя длинами волны (Alexandrite 755, Diode 810, Nd:YAG 1064 нм), охлаждением ICE TECH до −31°C и ресурсом 100 млн вспышек. Купить с гарантией и сервисом в Москве.",
  alternates: { canonical: "/products/soprano-titanium" },
};

export default function SopranoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
