import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { auth } from "@/lib/firebase/firebase";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moun",
  description: "프로 작곡가의 시작 , Moun",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <Header />
        <main className="Center flex-col mt-[4.5rem]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
