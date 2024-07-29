"use client"
import React, { useState } from 'react'
import ImageComponent from '../Image'
import { cn } from '@/lib/utils'

export interface ImageURLs {
    smallImages: string[]
    largeImages: string[]
}
interface SingleProductImageProps {
    images: ImageURLs,
    className: string
}
const SingleProductImage: React.FC<SingleProductImageProps> = ({ images, className }) => {


    const [currentLargeImage, setCurrentLargeImage] = useState(images.largeImages[0])
    const [currentSmallImage, setCurrentSmallImage] = useState(images.smallImages[0])

    const handleImageChange = (smallImageURL: string) => {
        const largeImage = smallImageURL.replace("small", "large")
        setCurrentSmallImage(smallImageURL)
        setCurrentLargeImage(largeImage)
    }
    return (
        <main className={className}>
            <div className='flex flex-row gap-5'>
                <div className='flex flex-col gap-3'>
                    {
                        images.smallImages.map((image, index) => {
                            return <ImageComponent key={index} src={image} alt={""} height={300} width={200} className={cn("h-28 w-full cursor-pointer border-2 border-transparent", {
                                "border-black": currentSmallImage === image
                            })} onClick={() => handleImageChange(image)} />
                        })
                    }

                </div>
                <div>
                    <div>
                        <ImageComponent className='' src={currentLargeImage} alt='' height={900} width={600} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SingleProductImage
