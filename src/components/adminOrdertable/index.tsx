"use client"
import React, { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '../ui/table'
import { Badge } from '../ui/badge'
import { Order, Orders } from '@/types/order'
import Pagination from '@/components/pagination'
import { useGetAllOrdersQuery } from '@/provider/redux/query'

interface AdminOrderTableProps {
    orders: Orders
}
const AdminOrderTable: React.FC<AdminOrderTableProps> = ({ orders }) => {
    const [page, setPage] = React.useState(1)

    const { data, error, isLoading } = useGetAllOrdersQuery(page);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error in getting orders</p>;
    
    const totalPages = data &&  Math.ceil(data.totalOrders / 5)
    return (
        <div>
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Recent orders from your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead  className="text-left">Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">No Of Products</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.orders.map((order: Order, index: number) => {
                                    return <TableRow key={index}>
                                        <TableCell>
                                            <div className="font-medium">{order.username}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">{order.email}</div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                {order.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{order.totalPrice}</TableCell>
                                        <TableCell className="text-right">{order.noOfProducts}</TableCell>
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
        </div>
    )
}

export default AdminOrderTable
