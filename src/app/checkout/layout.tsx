import Navbar from '@/components/Navbar';
import React from 'react'
import StoreProvider from '../StoreProvider';
import { Inter } from 'next/font/google';
import "../globals.css";
import SessionWrapper from '@/provider/session';
import Link from 'next/link';
import Image from 'next/image'
import { GiShoppingBag } from 'react-icons/gi';



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

                        <div className='flex flex-row w-full h-20 items-center'>
                            <div className='w-1/3'></div>
                            <div className='w-1/3 flex justify-center'><Link href="/"><Image src={'	https://cdn.shopify.com/s/files/1/0264/9243/6565/files/Main_Logo_Black_x320.png?v=1691871483'} width={200} height={43} alt={''} /></Link></div>
                            <div className='w-1/3 flex justify-center'><Link href="/"><GiShoppingBag fill='black' size={23} /></Link></div>
                        </div>
                        {children}

                    </body>
                </html>
            </SessionWrapper>
        </StoreProvider >
    )
}

export default CheckoutLayout
