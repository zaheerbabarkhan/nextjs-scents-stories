"use client"
import Link from 'next/link'
import React from 'react'

interface ContentHeaderProps {
    title: string
    URL?: string,
    showURL?: boolean
}
const ContentHeader: React.FC<ContentHeaderProps> = ({ title, URL, showURL = true }) => {
    return (
        <main>
            <div className='flex justify-between items-end font-bold'>
                <div>
                    <h2 className='uppercase text-3xl'>{title}</h2>
                </div>
                {
                    showURL && (
                        <div>
                            <Link href={URL as string} className='underline underline-offset-2'>
                                View All
                            </Link>
                        </div>
                    )
                }
            </div>
        </main>
    )
}

export default ContentHeader