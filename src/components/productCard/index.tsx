import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'
import HoverButtons from './HoverButtons'
import { ProductData } from '../homePageProductRow'
import { cn } from '@/lib/utils'

interface ProductCardProps {
    productData: ProductData,
    view?: 'small' | 'list' | 'large' | 'normal'
}
const ProductCard: React.FC<ProductCardProps> = ({ productData, view }) => {
    const { description, imageURL, onSale, price, salePrice, title, id } = productData
    return (
        <div className={cn('h-min-[550px] max-h-max relative rounded-xl cursor-pointer', {
            "w-1/5": view === 'normal',
            "w-[calc(50%-(0.75rem/2))]": view === 'large',
            "w-full": view === 'small' || view === 'list',
        })}>
            {
                view === 'list' ?
                    (
                        <Card className='rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] bg-white h-full group flex flex-row'>
                            <HoverButtons product={productData} />
                            <Link href={`products/${id}`}>
                                <CardContent className='overflow-hidden p-0 rounded-t-xl relative'>
                                    <Image src={imageURL} alt={''} height={20} width={250} className='w-full max-h-max object-fill' />
                                    {
                                        onSale && <div className='absolute bottom-0 left-0 bg-[#f90000] w-max text-white px-[5px] py-[2px] uppercase text-[13px] rounded-r-sm font-semibold'>
                                            sale
                                        </div>
                                    }
                                </CardContent>
                            </Link>
                            <Link href={`products/${id}`} className='w-full'>

                                <CardFooter className='flex flex-row gap-2 items-center w-full h-full justify-between break-all'>
                                    <div className='flex flex-col items-start'>
                                        <div className='font-normal text-base'>{title}</div>
                                        <div className='!text-gray-500'>{description.substring(0, 20)}</div>
                                    </div>
                                    <div className='text-[#c13535] font-bold text-[13px] flex xl:flex-col md:flex-col items-center gap-2'>
                                        <div className='text-[13px]'>
                                            from
                                        </div>
                                        <div className='text-lg'>
                                            Rs. {onSale ? salePrice : price}
                                        </div>
                                        {onSale && <div className='line-through'>
                                            Rs. {price}
                                        </div>}
                                    </div>
                                </CardFooter>
                            </Link>
                        </Card>
                    )
                    : (
                        <Card className='rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] bg-white h-full group'>
                            <HoverButtons product={productData} />
                            <Link href={`products/${id}`}>
                                <CardContent className='overflow-hidden p-0 rounded-t-xl relative'>
                                    <Image src={imageURL} alt={''} height={20} width={250} className='w-full max-h-max object-fill' />
                                    {
                                        onSale && <div className='absolute bottom-0 left-0 bg-[#f90000] w-max text-white px-[5px] py-[2px] uppercase text-[13px] rounded-r-sm font-semibold'>
                                            sale
                                        </div>
                                    }
                                </CardContent>
                            </Link>
                            <Link href={`products/${id}`}>

                                <CardFooter className='flex flex-col gap-2 pt-4 items-start break-all'>
                                    <div className='flex flex-col items-start'>
                                        <div className='font-normal text-base'>{title}</div>
                                        <div className='!text-gray-500'>{description.substring(0, 20)}</div>
                                    </div>
                                    <div className='text-[#c13535] font-bold text-[13px] flex xl:flex-row md:flex-col items-center gap-2'>
                                        <div className='text-[13px]'>
                                            from <span className='text-lg px-1'>Rs. {onSale ? salePrice : price} </span>
                                        </div>
                                        {onSale && <div className='line-through'>
                                            Rs. {price}
                                        </div>}
                                    </div>
                                </CardFooter>
                            </Link>
                        </Card>
                    )
            }
        </div>
    )
}

export default ProductCard
