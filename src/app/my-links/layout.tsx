import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VTJesusLink | Мої посилання",
  };

export default function MyLinksPageLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
        {children}
      </div>
    );
}