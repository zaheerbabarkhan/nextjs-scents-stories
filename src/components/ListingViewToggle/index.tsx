"use client"
import React from 'react'
import { IoGridSharp } from 'react-icons/io5'
import { MdSquare } from 'react-icons/md'
import { VscThreeBars } from 'react-icons/vsc'
import { ScreenSize } from '../collectionCards'

interface ListingViewToggleProps {
    setView: (view: ScreenSize) => void
}
const ListingViewToggle: React.FC<ListingViewToggleProps> = ({ setView }) => {

    const handleViewChange = (view: ScreenSize) => {
        setView(view as 'small' | 'list' | 'large' | 'normal')
    }

    return (
        <div className='flex gap-2 items-center'>
            <div onClick={() => handleViewChange("large")} className='hover:cursor-pointer'><MdSquare size={24} /> </div>
            <div onClick={() => handleViewChange("small")} className='hover:cursor-pointer'><IoGridSharp size={20} /></div>
            <div onClick={() => handleViewChange("list")} className='hover:cursor-pointer'><VscThreeBars size={25} /></div>
        </div >
    )
}

export default ListingViewToggle
