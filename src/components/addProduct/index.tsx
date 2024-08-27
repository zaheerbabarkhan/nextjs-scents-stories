import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { CirclePlusIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { useAddProductMutation } from '@/provider/redux/query'

// Define the Zod schema for form validation
const productSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().min(0, { message: "Price must be a positive number" }),
    salePrice: z.number().optional(),
    categoryGenre: z.string().min(1, { message: "Top category is required" }),
    category: z.string().min(1, { message: "Sub category is required" }),
    onSale: z.boolean().default(false).optional(),
}, {})

const AddProduct = () => {
    const [dialogOpen, setDialogOpen] = React.useState(false)
    // { register, control, handleSubmit, formState: { errors }, watch, reset }
    const form = useForm({
        resolver: zodResolver(productSchema)
    })
    const { register, control, handleSubmit, formState: { errors }, watch, reset } = form

    const [addProductMutation] =
        useAddProductMutation();

    const onSubmit = async (data: any) => {
        addProductMutation(data)
            .unwrap()
            .then((res) => {
                setDialogOpen(false);
            })
            .catch((err) => {
                console.log("Error is ", err);
            });
    }


    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger>
                    <Button className="h-8 gap-1" onClick={() =>  setDialogOpen(true)}>
                        <CirclePlusIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Enter product details here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" placeholder="Product title" {...register('title')} />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message?.toString()}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" placeholder="Please include all information relevant to product." {...register('description')} />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message?.toString()}</p>}
                            </div>
                            <div className="flex gap-3">
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" type='number' placeholder="Original price" {...register('price', { valueAsNumber: true })} />
                                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message?.toString()}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="sale-price">Sale Price</Label>
                                    <Input id="sale-price" type='number' placeholder="Sale price" {...register('salePrice', { valueAsNumber: true })} />
                                    {errors.salePrice && <p className="text-red-500 text-sm">{errors.salePrice.message?.toString()}</p>}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div>
                                    <Label htmlFor="topCategory">Top Category</Label>
                                    <Input id="topCategory" placeholder="Top category" {...register('categoryGenre')} />
                                    {errors.topCategory && <p className="text-red-500 text-sm">{errors.topCategory.message?.toString()}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="subCategory">Sub Category</Label>
                                    <Input id="subCategory" placeholder="Sub category" {...register('category')} />
                                    {errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory.message?.toString()}</p>}
                                </div>
                            </div>
                            <div>
                                <FormField
                                    control={control}
                                    name="onSale"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className='flex gap-2 items-center'>
                                                    <div className='pt-1'>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            onChange={field.onChange}
                                                        />
                                                    </div>
                                                    <div><Label htmlFor="sale" className='text-xl'>On sale</Label></div>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddProduct


// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
// } from "@/components/ui/form"
// import { Switch } from "@/components/ui/switch"

// const FormSchema = z.object({
//     marketing_emails: z.boolean().default(false).optional(),
//     security_emails: z.boolean(),
// })

// export default function SwitchForm() {
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//             security_emails: true,
//         },
//     })

//     function onSubmit(data: z.infer<typeof FormSchema>) {
//         console.log(data)
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
//                 <div>
//                     <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
//                     <div className="space-y-4">
//                         <FormField
//                             control={form.control}
//                             name="marketing_emails"
//                             render={({ field }) => (
//                                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                                     <FormControl>
//                                         <Switch
//                                             checked={field.value}
//                                             onCheckedChange={field.onChange}
//                                         />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="security_emails"
//                             render={({ field }) => (
//                                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                                     <div className="space-y-0.5">
//                                         <FormLabel className="text-base">Security emails</FormLabel>
//                                         <FormDescription>
//                                             Receive emails about your account security.
//                                         </FormDescription>
//                                     </div>
//                                     <FormControl>
//                                         <Switch
//                                             checked={field.value}
//                                             onCheckedChange={field.onChange}
//                                             disabled
//                                             aria-readonly
//                                         />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                 </div>
//                 <Button type="submit">Submit</Button>
//             </form>
//         </Form>
//     )
// }
