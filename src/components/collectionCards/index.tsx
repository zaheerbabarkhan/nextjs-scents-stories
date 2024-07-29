"use client"
import React, { useEffect, useState } from 'react'
import { ProductData } from '../homePageProductRow'
import ProductCard from '../productCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Separator } from '@radix-ui/react-separator'
import ListingViewToggle from '../ListingViewToggle'
import { cn } from '@/lib/utils'
import { useGetProductsQuery } from '@/provider/redux/query'
import InfiniteScroll from 'react-infinite-scroll-component';

interface CollectionCardsProps {
    initialProducts: ProductData[]

}
export type ScreenSize = 'small' | 'list' | 'large' | 'normal'
const CollectionCards: React.FC<CollectionCardsProps> = ({ initialProducts }) => {

    const [products, setProducts] = useState<ProductData[]>(initialProducts);
    const [view, setView] = useState<ScreenSize>('large');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { data, error, isLoading } = useGetProductsQuery({ page });

    useEffect(() => {
        if (data) {
            if (data.products.length === 0) {
                setHasMore(false);
            } else {
                const moreProdcuts: ProductData[] = [];
                data.products.forEach(
                    (product: {
                        description: any;
                        id: any;
                        image: any;
                        onSale: any;
                        price: any;
                        salePrice: any;
                        title: any;
                        smallImages: any;
                        largeImages: any;
                    }) => {
                        moreProdcuts.push({
                            description: product.description,
                            id: product.id,
                            imageURL: product.image,
                            onSale: product.onSale,
                            price: product.price,
                            salePrice: product.salePrice,
                            title: product.title,
                            smallImages: product.smallImages,
                            largeImages: product.largeImages,
                        });
                    }
                );
                setProducts((prevProducts) => [...prevProducts, ...moreProdcuts]);
            }
        }
    }, [data]);

    const fetchMoreProducts = () => {
        setPage((prevPage) => prevPage + 1);
        console.log('fetching more products');
    };
    return (
        <div className='flex flex-col gap-5'>
            <div className='mt-10 flex flex-row justify-between text-lg'>
                <div>35 products</div>
                <div className='flex flex-row gap-2'>
                    <div>
                        <Select >
                            <SelectTrigger className="w-[180px] border-none focus:border-none focus-visible:border-none focus:shadow-none focus-visible:shadow-none">
                                <SelectValue placeholder="Featured" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="apple">Featured</SelectItem>
                                    <SelectItem value="banana">A-Z</SelectItem>
                                    <SelectItem value="blueberry">Z-A</SelectItem>
                                    <SelectItem value="grapes">Price 1-9</SelectItem>
                                    <SelectItem value="pineapple">Price 9-1</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Separator orientation='vertical' />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <ListingViewToggle setView={setView} />
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={products.length}
                next={fetchMoreProducts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>All products loaded</p>}
                style={{ overflow: 'unset' }}
                className={cn("", {
                    "flex flex-wrap gap-3": view === "large",
                    "grid grid-cols-3 gap-3": view === "small",
                    "flex flex-col gap-3": view === "list",
                })}
            >
                {
                    products.map(productData => {
                        return <ProductCard key={productData.id} productData={productData} view={view} />
                    })
                }
            </InfiniteScroll>
            {/* <div className={cn("", {
                "flex flex-wrap gap-3": view === "large",
                "grid grid-cols-3 gap-3": view === "small",
                "flex flex-col gap-3": view === "list",
            })}>
                {
                    initialProducts.map(productData => {
                        return <ProductCard key={productData.id} productData={productData} view={view} />
                    })
                }
            </div> */}
        </div>
    )
}

export default CollectionCards
