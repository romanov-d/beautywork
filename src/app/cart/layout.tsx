import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корзина и заявка на счёт",
  description:
    "Оформление заявки на счёт для юридических лиц и ИП. Менеджер свяжется в течение рабочего дня и подготовит коммерческое предложение.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
