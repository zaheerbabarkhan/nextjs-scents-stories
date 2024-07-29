import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "../StoreProvider";
import SessionWrapper from "@/provider/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// const futura = localFont({
//   src: [
//     {
//       path: '../../../public/fonts/futura/Futura-Book-font.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../../public/fonts/futura/futur.ttf',
//       weight: '700',
//       style: 'bold',
//     },
//   ],
//   variable: '--font-futura',
// });

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