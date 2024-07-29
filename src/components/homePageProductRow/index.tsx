import React from 'react'
import ProductCard from '../productCard'

export interface ProductData {
  imageURL: string,
  onSale: boolean,
  title: string,
  description: string,
  price: number,
  salePrice: number,
  id: string,
  smallImages: string[],
  largeImages: string[]
}
interface ProductRowProps {
  products: ProductData[]
}
const HomePageProductsRow: React.FC<ProductRowProps> = ({ products }) => {
  return (
    <main>
      <div className='flex flex-row gap-[10px] justify-between'>
        {
          products.map(productData => {
            return <ProductCard key={productData.id} productData={productData} view='normal' />
          })
        }
      </div>
    </main>
  )
}

export default HomePageProductsRow
