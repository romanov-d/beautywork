import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | Soprano Titanium",
  description: "Правила использования сайта и условия предоставления услуг.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
