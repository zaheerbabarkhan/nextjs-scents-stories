"use client"
import { useGetProductByIdQuery } from '@/provider/redux/query'
import React, { useState } from 'react'
import { Spinner } from '../ui/spinner'
import Image from 'next/image'
import { ProductData } from '../homePageProductRow'
import QuantityButton from '../quanityButtons'
import { useAppDispatch } from '@/lib/hooks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { addProduct, removeProductQuantity } from '@/provider/redux/cart.slice'

interface CartItemProps {
    productId: string
    quantity: number,
    showQuantity?: boolean
}
const CartItem: React.FC<CartItemProps> = ({ productId, quantity, showQuantity = true }) => {
    const [prodQuantity, setProdQuantity] = useState(quantity)
    const dispatch: AppDispatch = useDispatch()


    let content;
    const { data, isFetching, isSuccess, isError } = useGetProductByIdQuery(productId)
    if (isFetching) {
        content = <Spinner />
    } else if (isError) {
        content = <div>Error: Filed to get product</div>;
    } else if (isSuccess) {
        const product: ProductData = data

        const addQuantity = () => {
            setProdQuantity((prevState) => prevState + 1)
            dispatch(addProduct({
                productId,
                price: product.onSale ? product.salePrice : product.price,
                quantity: 1

            }))
        }
        const removeQuantity = () => {
            if (prodQuantity > 0) {
                setProdQuantity((prevState) => prevState - 1)
                dispatch(removeProductQuantity({
                    productId,
                    price: product.onSale ? product.salePrice : product.price
                }))
            }

        }

        content = <div className='w-full'>
            <div className='flex h-28 w-full gap-3 my-2'>
                <div className='h-auto'>
                    <Image src={product.smallImages[0]} width={100} height={40} alt={'Product Image'} className='object-fill h-28' />
                </div>
                <div className='flex flex-col pt-2 gap-2 w-full'>
                    <div className='text-sm uppercase'>{product.title}</div>
                    <div className='flex text-xs gap-1'>
                        <div className='font-bold'>Format:</div>
                        <div>Perfume Spray (50ml)</div>
                    </div>
                    <div className='flex justify-between pt-2 w-full items-center'>
                        {showQuantity && <QuantityButton quantity={prodQuantity} addQuanHandler={addQuantity} removeQuantHandler={removeQuantity} />}
                        <div className='text-base font-bold'>Rs. {product.onSale ? product.salePrice * prodQuantity : product.price * prodQuantity}</div>
                    </div>
                </div>
            </div>
        </div>

    }
    return (
        <div className='w-full'>
            {content}
        </div>
    )
}

export default CartItem
