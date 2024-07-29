"use client"
import React, { useEffect, useState } from 'react'
import NavbarHeader from './NavbarHeader'
import NavabarMenu from './NavabarMenu'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Cart from '../cart'

const Navbar = () => {
    const [showCart, setShowCart] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [cartVisible, setCartVisible] = useState(showCart);
    const [mounted, setMounted] = useState(false);

    const cart = useSelector((state: RootState) => state.cart)



    useEffect(() => {
        if (showCart) {
            setCartVisible(true);
        } else {
            setIsAnimating(true);
        }
    }, [showCart]);
    useEffect(() => {
    }, [cart]);

    const handleAnimationEnd = () => {
        if (!showCart) {
            setCartVisible(false);
        }
        setIsAnimating(false);
    };

    useEffect(() => {
        setMounted(true);
    }, []);
    // if (!mounted) {
    //     return null; // Don't render anything until the component has mounted
    // }
    return (
        <main className='bg-black'>
            <div className='max-w-[1500px] lg:w-3/4 md:w-full mx-auto'>
                <NavbarHeader showCart={showCart} setShowCart={setShowCart} cartProductsCount={cart.products.length} />
            </div>
            <div className='h-[0.0625rem] bg-gray-700'></div>
            {
                mounted && <div className='relative max-w-[1500px] lg:w-3/4 md:w-full mx-auto'>
                    {cartVisible && (
                        <div
                            className={cn(
                                'absolute right-0 text-black bg-white shadow-lg w-[30rem] z-20',
                                {
                                    'animate-slideIn': showCart && !isAnimating,
                                    'animate-slideOut': !showCart && isAnimating,
                                }
                            )}
                            onAnimationEnd={handleAnimationEnd}
                        >
                            {
                                cart.products.length === 0 ? <div className='p-5'>Your cart is currently empty.</div> : <Cart cartItems={cart.products} totalPrice={cart.totalPrice} />
                            }
                        </div>
                    )}
                </div>
            }
            <div className='max-w-[1500px] lg:w-3/4 md:w-full mx-auto h-14 flex items-center justify-center'>
                <NavabarMenu />
            </div>
        </main>
    )
}

export default Navbar
