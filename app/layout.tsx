import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat pinterest",
  description: "Frontend challenge uchi.ru Savonin Nikolay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body>{children}</body>
    </html>
  );
}
