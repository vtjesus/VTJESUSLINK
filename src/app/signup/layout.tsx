import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VTJesusLink | Реєстрація",
  };

export default function SignupPageLayout({
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