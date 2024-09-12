import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VTJesusLink |Налаштування акаунта ",
  };

export default function AccountSettingsPageLayout({
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