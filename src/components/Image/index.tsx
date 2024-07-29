"use client"
import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | StaticImageData
  alt: string
  className: string
  height: number
  width: number
}
const ImageComponent: React.FC<ImageProps> = ({ src, alt, className, height, width, ...props }) => {
  return (
      <Image src={src} alt={alt} className={className} height={height} width={width} />
  )
}

export default ImageComponent
