"use client"
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import Pagination from '../pagination'
import { useGetProductsQuery } from '@/provider/redux/query'
import AddProduct from '../addProduct'

const AdminProductTable = () => {
    const [page, setPage] = React.useState(1)

    const { data, error, isLoading } = useGetProductsQuery(page);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error in getting orders</p>;
    const totalPages = data && Math.ceil(data.totalProducts / 10)
    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products and view their sales performance.</CardDescription>
                </div>
                <div>
                    <AddProduct />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="">Top Category</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead >Sale Price</TableHead>
                            <TableHead>
                                Sale On
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.products.map((product: any, index: number) => {
                                return <TableRow key={index}>

                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{product.price}</Badge>
                                    </TableCell>
                                    <TableCell >{product.categoryGenre}</TableCell>
                                    <TableCell >{product.category}</TableCell>
                                    <TableCell >{product.salePrice}</TableCell>
                                    <TableCell>
                                        {product.onSale? "Yes" : "No"}
                                    </TableCell>
                                </TableRow>
                            })

                        }

                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className='justify-end'>
                <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
            </CardFooter>
        </Card>
    )
}

export default AdminProductTable
