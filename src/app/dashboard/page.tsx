
import { auth } from "@/auth"
import AdminOrderTable from "@/components/adminOrdertable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchDashBoardOrders, fetchDashBoardStats } from "@/lib/data"
import { redirect } from "next/navigation"


export default async function Component() {
    const session = await auth()
    if (!session || !session.isAdmin) {
        redirect("/user/login")
    }

    const stats = await fetchDashBoardStats();
    const orders = await fetchDashBoardOrders();
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription className="text-lg font-bold">Total Products</CardDescription>
                                    <CardTitle className="text-4xl">{stats?.totalProducts}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription className="text-lg font-bold">Total Orders</CardDescription>
                                    <CardTitle className="text-4xl">{stats?.totalOrders}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription className="text-lg font-bold">Total Revenue</CardDescription>
                                    <CardTitle className="text-4xl">{stats?.totalRevenue}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription className="text-lg font-bold">Total Users</CardDescription>
                                    <CardTitle className="text-4xl">{stats?.totalUsers}</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                        <AdminOrderTable orders={orders} />
                    </div>
                    <div>
                    </div>
                </main>
            </div>
        </div>
    )
}

