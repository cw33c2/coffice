import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Coffice | A cup of coffee, a moment of peace",
  description: "每一個清晨，從純粹開始。為您準備好，專屬的靜謐角落。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-oat text-coffee overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
