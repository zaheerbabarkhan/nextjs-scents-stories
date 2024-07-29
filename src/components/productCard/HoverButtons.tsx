"use client"
import { AppDispatch } from '@/lib/store';
import { addProduct } from '@/provider/redux/cart.slice';
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { RiSearchLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { ProductData } from '../homePageProductRow';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import SingleProductDetails from '../singleProductDetails';
import SingleProductImage, { ImageURLs } from '../singleProductImage';


interface HoverButtonsProps {
    product: ProductData,
}

const HoverButtons: React.FC<HoverButtonsProps> = ({ product }) => {
    const [isClicked, setIsClicked] = useState(false);
    const dispatch: AppDispatch = useDispatch()


    const addProductToCart = async (productId: string, quantity: number, price: number) => {
        setIsClicked(true);

        const product = { productId, quantity, price }
        dispatch(addProduct(product))
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsClicked(false);
    }
    const imageData: ImageURLs = {
        smallImages: product.smallImages,
        largeImages: product.largeImages
    }
    return (
        <div>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className='bg-[#f90000] disabled:opacity-70 hidden group-hover:block absolute rounded-full p-2 -top-2 -right-3 z-20 hover:scale-125 transition-transform ease-out duration-700'>
                            <RiSearchLine size={23} className='' fill='white' stroke='white' />
                        </button>
                    </DialogTrigger>
                    <DialogContent className='max-w-[1200px] 2xl:w-3/4 xl:w-full mx-auto mt-10 flex flex-row gap-16'>
                        <SingleProductImage className='w-1/2' images={imageData} />
                        <SingleProductDetails className='w-1/2' product={product} />
                    </DialogContent>
                </Dialog>
            </div>
            
            <div>
                <button disabled={isClicked} className='bg-[#f90000] disabled:opacity-70 hidden group-hover:block absolute rounded-full p-2 top-[40px] -right-3 z-20 hover:scale-125 transition-transform ease-out duration-700' onClick={() => addProductToCart(product.id, 1, product.onSale ? product.salePrice : product.price)} >
                    <GoPlus size={23} fill='white' stroke='white' />
                </button>
            </div>
        </div>
    )
}

export default HoverButtons
