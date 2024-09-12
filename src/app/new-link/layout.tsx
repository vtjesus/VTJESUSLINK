import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VTJesusLink | Нове посилання    ",
  };

export default function NewLinkPageLayout({
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