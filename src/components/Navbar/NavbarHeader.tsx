import React, { useEffect } from 'react'
import { SearchInput } from '../ui/search-input'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegUser } from 'react-icons/fa6'
import { GiShoppingBag } from 'react-icons/gi'
import { IoClose } from 'react-icons/io5'

interface NavbarHeaderProps {
    className?: string,
    showCart: boolean,
    cartProductsCount: number
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>
}
const NavbarHeader: React.FC<NavbarHeaderProps> = ({ className, showCart, setShowCart, cartProductsCount, ...props }) => {
    const closeCartHandler = () => {
        setShowCart(false)
    }
    const openCartHandler = () => {
        setShowCart(true)
    }

    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className={`flex flex-row justify-between py-5 w-full items-center ${className}`}>
            <div className="flex flex-row">
                <SearchInput placeholder='Search' />
            </div>
            <div>
                <Link href="/"><Image src={'https://scentsnstories.pk/cdn/shop/files/Main_Logo.png?v=1691871428&width=480'} width={200} height={43} alt={''} /></Link>
            </div>
            <div className='text-white text-sm flex flex-row gap-5'>
                {
                    showCart && <div className='text-lg flex items-center gap-1 cursor-pointer' onClick={() => closeCartHandler()}>
                        <div className='uppercase'>close</div> <div><IoClose size={24} /></div>
                    </div>
                }
                {
                    !showCart && <><div className='flex flex-row gap-3 items-center cursor-pointer'>
                        <Link href={"/user/login"}>
                            <div className='flex gap-3 items-center justify-center'>
                                <div><FaRegUser fill='white' size={23} /></div>
                                <div>ACCOUNT</div>
                            </div>
                        </Link>
                    </div><div className='flex flex-row gap-3 items-center cursor-pointer' onClick={() => openCartHandler()}>

                            <div className='relative'>
                                <GiShoppingBag fill='white' size={23} />
                                {
                                    mounted && cartProductsCount !== 0 ? <div className='bg-[#ba4444] absolute top-1/2 text-xs font-bold -right-2 py-1 px-2 leading-none rounded-full'>{cartProductsCount}</div> : <></>
                                }
                            </div>
                            <div>CART</div>
                        </div></>
                }
            </div>
        </div>
    )
}

export default NavbarHeader
