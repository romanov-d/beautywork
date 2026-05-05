import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Soprano Titanium",
  description: "Политика в отношении обработки персональных данных и конфиденциальности информации.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
