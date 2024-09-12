import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VTJesusLink | Редактор посилань ",
  };

export default function LinkEditorPageLayout({
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