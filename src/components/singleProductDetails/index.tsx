"use client"
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { IoStar } from 'react-icons/io5'
import { ProductData } from '../homePageProductRow'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { AiOutlineSafety } from 'react-icons/ai'
import { TiGift } from 'react-icons/ti'
import { FaAward } from 'react-icons/fa'
import { Switch } from '../ui/switch'
import { AppDispatch } from '@/lib/store'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/provider/redux/cart.slice'
import QuantityButton from '../quanityButtons'
interface SingleProductDetailsProps {
  product: ProductData,
  className: string
}
const SingleProductDetails: React.FC<SingleProductDetailsProps> = ({ product, className }) => {
  const dispatch: AppDispatch = useDispatch()

  const [activeTemplate, setActiveTemplate] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [buttonText, setButtonText] = useState('Add to cart');
  const [isClicked, setIsClicked] = useState(false);

  const changeTemplateHandler = (templateNumber: number) => {
    setActiveTemplate(templateNumber)
  }

  const addQuantity = () => {
    setQuantity((prevState) => prevState + 1)
  }
  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1)
    }
  }

  const addProductToCart = async (productId: string, quantity: number, price: number) => {
    setButtonText('Adding...');
    setIsClicked(true);

    const product = { productId, quantity, price }
    dispatch(addProduct(product))
    await new Promise(resolve => setTimeout(resolve, 2000))
    setButtonText('Add to cart');
    setIsClicked(false);
  }

  return (
    <main className={className}>
      <div className='mt-10 flex flex-col gap-8'>
        <div className='uppercase text-[27px] font-extrabold'>
          {product.title}
        </div>
        <div className='flex flex-col gap-[3px]'>
          <div className='flex'>
            <div className='flex gap-1'>
              <IoStar size={20} />
              <IoStar size={20} />
              <IoStar size={20} />
              <IoStar size={20} />
              <IoStar size={20} />
            </div>
            <div className='font-semibold mx-2 text-sm'>79 Reviews</div>
          </div>

          <div className=''><p>{product.description.substring(1, 30)}</p></div>
        </div>
        <div className='flex flex-col'>
          <div className='text-base font-bold'>Format</div>
          <div className='flex gap-2'>
            <div className={cn("border p-[10px] cursor-pointer", {
              "border-2 border-black": activeTemplate === 1
            })} onClick={() => changeTemplateHandler(1)}>
              <p>Perfume Spray (50ml)</p>
            </div>
            <div className={cn("border p-[10px] cursor-pointer", {
              "border-2 border-black": activeTemplate === 2
            })} onClick={() => changeTemplateHandler(2)}>
              <p>Perfume Spray (100ml)</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-base font-bold mb-3'>Price</div>
          <div className='flex text-2xl text-[#c13535] gap-5'>
            <div className={cn({
              "line-through": product.onSale
            })}>
              Rs. {product.price}
            </div>
            {product.onSale && <div>
              Rs. {product.salePrice}</div>}
          </div>
        </div>
        <div className="flex flex-col">
          <div className='text-base font-bold mb-3'>Quantity</div>
          <QuantityButton quantity={quantity} addQuanHandler={addQuantity} removeQuantHandler={removeQuantity} />
        </div>

        <div className='flex flex-col gap-3 text-lg'>
          <div className='flex gap-2 items-center'>
            <div>
              <AiOutlineSafety size={20} />
            </div>
            <div>15 Days Easy Returns</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              <TiGift strokeWidth={1} size={20} />
            </div>
            <div>Surprise in Every Order</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              <FaAward size={20} />
            </div>
            <div>15 Days Easy Returns</div>
          </div>
        </div>

        <div className='flex flex-col'>
          <div className='text-base font-bold'>Is it a gift?</div>
          <div><Switch id="airplane-mode" className='data-[state=checked]:bg-[#c13535]' /></div>
        </div>

        <div>
          <Button className='text-xl w-full leading-9 bg-[#c13535] rounded-full hover:bg-[#c13535]' disabled={isClicked} onClick={() => addProductToCart(product.id, quantity, product.onSale ? product.salePrice : product.price)}>{buttonText}</Button>
        </div>
      </div>
    </main>
  )
}

export default SingleProductDetails
