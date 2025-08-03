import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainProvider from "./providers/main-provider/mainProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex Johnson - Frontend Developer Portfolio",
  description:
    "A personal portfolio showcasing the work and skills of Alex Johnson, a passionate frontend developer.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    // <html lang={lang} dir={dir} suppressHydrationWarning>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
