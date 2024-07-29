import { ProductData } from '@/components/homePageProductRow'
import SingleProductDetails from '@/components/singleProductDetails'
import SingleProductImage, { ImageURLs } from '@/components/singleProductImage'
import { fetchSingleProduct } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'

interface URLParams {
    id: string
}
interface SingleProductPageProps {
    params: URLParams
}
const SingleProductPage: React.FC<SingleProductPageProps> = async ({ params }) => {
    const id = params.id
    const product: ProductData | null = await fetchSingleProduct(id)
    if (!product) {
        notFound()
    }
    const imageData: ImageURLs = {
        smallImages: product.smallImages,
        largeImages: product.largeImages
    }
    return (
        <main>
            <div className='max-w-[1500px] 2xl:w-3/4 xl:w-full mx-auto mt-10 flex flex-row gap-16'>
                <SingleProductImage className='w-1/2' images={imageData} />
                <SingleProductDetails className='w-1/2' product={product}/>
            </div>
        </main>
    )
}

export default SingleProductPage
