import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VTJesusLink | Скидання пароля",
  };

export default function ResetPasswordPageLayout({
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