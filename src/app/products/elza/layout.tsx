import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кушетка «Эльза» — косметологическая кушетка",
  description:
    "Кушетка «Эльза» для салонов красоты и клиник: эргономичная конструкция, регулировка положения, обивка под легкую дезинфекцию. Прямые поставки, гарантия, доставка по Москве и регионам.",
  alternates: { canonical: "/products/elza" },
};

export default function ElzaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
