import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VTJesusLink | Увійдіть",
  };

export default function LoginPageLayout({
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