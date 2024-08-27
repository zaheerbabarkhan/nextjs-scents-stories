"use client"
import CartItem from '@/components/cart/cartItem'
import CheckoutSuccessUserDetail from '@/components/checkoutSuccessUserDetail'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { AppDispatch } from '@/lib/store'
import { clearCart } from '@/provider/redux/cart.slice'
import { useGetOrderByIdQuery } from '@/provider/redux/query'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const SuccessPage = () => {
    const searchParams = useSearchParams()
    const productId = searchParams.get('payment_intent')
    let content;
    const { data, isFetching, isSuccess, isError } = useGetOrderByIdQuery(productId)
    if (isFetching) {
        content = <Spinner className="text-red-400 w-max mx-auto">
            <span className="text-red-400">Loading... </span>
        </Spinner>
    }
    else if (isError) {
        content = <div>Error: Failed to get product</div>;
    }
    if (isSuccess) {
        content = <div className='flex flex-row w-[1150px] gap-10 mx-auto mt-10'>
            <div className='w-1/2'>
                <CheckoutSuccessUserDetail orderID={data.id} userID={data.userId}/>
            </div>
            <Separator orientation='vertical' className='h-auto' />
            <div className='w-1/3'>
                {
                    data.products.map((product, index) => {
                        return <div className='flex w-full flex-col' key={product.productId}>
                            <CartItem showQuantity={false} key={product.productId} productId={product.productId} quantity={product.quantity} />
                            {
                                index + 1 != data.products.length && <div className='w-full'>
                                    <Separator />
                                </div>
                            }
                        </div>
                    })
                }
                <div className="p-4 border border-gray-300 rounded">
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        {
                            <span>Rs {`${data.totalPrice}.00`}</span>
                        }
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>Rs 169.00</span>
                    </div>
                    <div className="flex justify-between font-semibold mb-2">
                        <span>Total</span>
                        {
                            <span>PKR Rs {data.totalPrice + 169}.00</span>
                        }
                    </div>
                    <p className="text-sm text-gray-600">Including Rs 187.44 in taxes</p>
                </div>
            </div>
        </div>
    }
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(clearCart())
    }, [])
    return (
        <div className='w-full mx-auto'>
            {content}
        </div>
    )
}

export default SuccessPage
