import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import '../assets/sass/global.scss';

export const metadata: Metadata = {
  title: "VTJESUSLINK | Fanlink generator",
  description: "Згенеровано за допомогою Create Next App",
};

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" type="image/ico" href="/vibrlink-favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
