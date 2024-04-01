import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScalerSuite",
  description: "Admin Suite for Hotel Room Management Powered by Scaler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
