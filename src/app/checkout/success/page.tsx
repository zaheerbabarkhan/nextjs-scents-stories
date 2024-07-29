"use client"
import { AppDispatch } from '@/lib/store'
import { clearCart } from '@/provider/redux/cart.slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const SuccessPage = () => {

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(clearCart())
    }, [])
    return (
        <div className='w-96 mx-auto my-36 '>
            <h1 className='text-3xl text-[#c13535] font-bold text-center'>Payment Sucessfull</h1>
        </div>
    )
}

export default SuccessPage
