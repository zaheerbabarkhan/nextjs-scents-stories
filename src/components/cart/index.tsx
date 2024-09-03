"use client"
import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { CartItemI } from '@/types/cart'
import CartItem from './cartItem'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart)

    return (
        <div>
            <Card className='border-none shadow-none p-0'>
                <CardContent className='border-none p-5'>
                    {
                        cart.products.map((cartItem, index) => {
                            return <div className='flex w-full flex-col' key={cartItem.productId}>
                                <CartItem key={cartItem.productId} productId={cartItem.productId} quantity={cartItem.quantity} />
                                {
                                    index + 1 != cart.products.length && <div className='w-full'>
                                        <Separator />
                                    </div>
                                }
                            </div>
                        })
                    }

                </CardContent>
                <CardFooter className='p-0'>
                    <div className='flex flex-col w-full'>
                        <div className='w-full my-1'>
                            <Separator />
                        </div>
                        <div className='flex justify-between w-full text-base font-bold p-3'>
                            <div>Subtotal</div>
                            <div>{cart.totalPrice}</div>
                        </div>
                        <div className='p-2 px-4'>
                            <Link href={"/checkout"}>
                                <Button className='text-xl w-full leading-9 bg-[#c13535] rounded-full hover:bg-[#c13535]'>Checkout</Button>
                            </Link>
                        </div>
                        <div className='w-80 text-sm mx-auto text-center'>
                            Taxes included. Shipping and discount codes calculated at checkout.
                        </div>
                    </div>

                </CardFooter>
            </Card>
        </div>
    )
}

export default Cart
