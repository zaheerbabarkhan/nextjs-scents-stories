import Navbar from '@/components/Navbar';
import React from 'react'
import StoreProvider from '../StoreProvider';
import { Inter } from 'next/font/google';
import "../globals.css";
import SessionWrapper from '@/provider/session';

const inter = Inter({ subsets: ["latin"] });

const CheckoutLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
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
        </StoreProvider >
    )
}

export default CheckoutLayout
