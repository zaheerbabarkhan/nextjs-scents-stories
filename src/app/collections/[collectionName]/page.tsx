import ContentHeader from '@/components/contentHeader'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import ListingViewToggle from '@/components/ListingViewToggle';
import { fetchProducts } from '@/lib/data';
import CollectionCards from '@/components/collectionCards';
import { ProductData } from '@/components/homePageProductRow';

const CollectionPage = async ({ params: { collectionName } }: {
    params: { collectionName: string }
}) => {
    const products = await fetchProducts();
    return (
        <div>
            <main className='max-w-[1500px] 2xl:w-3/4 xl:w-full mx-auto mt-10 flex flex-col'>
                <ContentHeader title={collectionName} showURL={false} />
                <Separator className='m-0 mt-16' />

                <div>
                    <CollectionCards initialProducts={[]} productCategory={collectionName} />
                </div>
            </main>
        </div>
    )
}

export default CollectionPage
