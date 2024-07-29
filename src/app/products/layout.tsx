import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from '@next/font/local';
import "../globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "../StoreProvider";
import SessionWrapper from "@/provider/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <SessionWrapper>
        <html lang="en">

          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </html>
      </SessionWrapper>
    </StoreProvider>
  );
}
