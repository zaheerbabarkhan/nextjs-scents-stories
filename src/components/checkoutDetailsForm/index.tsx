import Link from 'next/link'
import React from 'react'
import { FloatingInput, FloatingLabel } from '../ui/floatingInput'
import { Checkbox } from '../ui/checkbox'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import RadioButtonCircle from '../ui/radioButtonCircle'
import { Button } from '../ui/button'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '@/types/schemas'
import { useAddUserMutation } from '@/provider/redux/query'

interface CheckoutDetailFormProps {
    setDetailSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
    setUserId: React.Dispatch<React.SetStateAction<string | undefined>>
}
const CheckoutDetailForm: React.FC<CheckoutDetailFormProps> = ({ setDetailSubmitted, setUserId }) => {
    const [selectedPayment, setSelectedPayment] = React.useState('item-1');
    const [selectedBilling, setSelectedBilling] = React.useState('item-1');
    const [addUser] = useAddUserMutation();

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(checkoutSchema)
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await addUser(data).unwrap();
            setUserId(response.id);
            setDetailSubmitted(true);
        } catch (error) {
            console.error('Failed to add/update user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h2 className='text-xl'>Give your Email for Confirmation Message</h2>
                    </div>
                    <div>
                        <Link href="/user/login" className='underline underline-offset-2'>
                            Log in
                        </Link>
                    </div>
                </div>
                <div className="relative">
                    <FloatingInput id="email" type='email' {...register('email')} />
                    <FloatingLabel htmlFor="email">Email</FloatingLabel>
                    {errors.email?.message && <p className="text-red-500">{errors.email.message.toString()}</p>}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                    <Checkbox id="email-offers" />
                    <label
                        htmlFor="email-offers"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Email me with news and offers
                    </label>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div>
                    <h2 className='text-xl'>Delivery</h2>
                </div>
                <div>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="pakistan">Pakistan</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {errors.country?.message && <p className="text-red-500">{`coming from here${errors.country.message.toString()}`}</p>}
                </div>
                <div className='flex flex-row gap-2'>
                    <div className="relative w-full">
                        <FloatingInput id="firstName" type='text' {...register('firstName')} />
                        <FloatingLabel htmlFor="firstName">First Name</FloatingLabel>
                        {errors.firstName?.message && <p className="text-red-500">{errors.firstName.message.toString()}</p>}
                    </div>
                    <div className="relative w-full">
                        <FloatingInput id="lastName" type='text' {...register('lastName')} />
                        <FloatingLabel htmlFor="lastName">Last Name</FloatingLabel>
                        {errors.lastName?.message && <p className="text-red-500">{errors.lastName.message.toString()}</p>}
                    </div>
                </div>
                <div className="relative">
                    <FloatingInput id="address" type='text' {...register('address')} />
                    <FloatingLabel htmlFor="address">Address</FloatingLabel>
                    {errors.address?.message && <p className="text-red-500">{errors.address.message.toString()}</p>}
                </div>
                <div className="relative">
                    <FloatingInput id="apartment" type='text' {...register('apartment')} />
                    <FloatingLabel htmlFor="apartment">Apartment, suite, etc. (optional)</FloatingLabel>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className="relative w-full">
                        <FloatingInput id="city" type='text' {...register('city')} />
                        <FloatingLabel htmlFor="city">City</FloatingLabel>
                        {errors.city?.message && <p className="text-red-500">{errors.city.message.toString()}</p>}
                    </div>
                    <div className="relative w-full">
                        <FloatingInput id="postalCode" type='text' {...register('postalCode')} />
                        <FloatingLabel htmlFor="postalCode">Postal code (optional)</FloatingLabel>
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                    <Checkbox id="info-save" />
                    <label
                        htmlFor="info-save"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Save this information for next time
                    </label>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div>
                    <h2 className='text-xl'>Shipping method</h2>
                </div>
                <div className="border border-black rounded-md p-4 flex justify-between items-center bg-gray-50">
                    <span>Standard</span>
                    <span>Rs {169}</span>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div>
                    <h2 className='text-xl'>Payment</h2>
                </div>
                <div className='border border-input pl-3'>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" >
                            <AccordionTrigger>
                                <div className="flex items-center" onClick={() => setSelectedPayment("item-1")}>
                                    <RadioButtonCircle checked={selectedPayment === "item-1"} />
                                    <span>Cash on Delivery (COD)</span>
                                </div>

                            </AccordionTrigger>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger >
                                <div className="flex items-center" onClick={() => setSelectedPayment("item-2")}>
                                    <RadioButtonCircle checked={selectedPayment === "item-2"} />
                                    <span>Pay Via Cards</span>
                                </div>

                            </AccordionTrigger>
                            <AccordionContent>
                                Pay Via Cards
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <div className="flex items-center" onClick={() => setSelectedPayment("item-3")}>
                                    <RadioButtonCircle checked={selectedPayment === "item-3"} />
                                    <span>Swich (Cards, Accounts, Wallets)</span>
                                </div>

                            </AccordionTrigger>
                            <AccordionContent>
                                Swich (Pay via Debit / Credit / Wallet / Bank Account)
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div>
                    <h2 className='text-xl'>Billing address</h2>
                </div>
                <div className='border border-input pl-3'>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" >
                            <AccordionTrigger>
                                <div className="flex items-center" onClick={() => setSelectedBilling("item-1")}>
                                    <RadioButtonCircle checked={selectedBilling === "item-1"} />
                                    <span>Same as shipping address</span>
                                </div>

                            </AccordionTrigger>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger >
                                <div className="flex items-center" onClick={() => setSelectedBilling("item-2")}>
                                    <RadioButtonCircle checked={selectedBilling === "item-2"} />
                                    <span>Use a different billing address</span>
                                </div>

                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        <Select {...register('country')}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="pakistan">Pakistan</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.country?.message && <p className="text-red-500">{errors.country.message.toString()}</p>}
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <div className="relative w-full">
                                            <FloatingInput id="firstName" type='text' {...register('firstName')} />
                                            <FloatingLabel htmlFor="firstName">First Name</FloatingLabel>
                                            {errors.firstName?.message && <p className="text-red-500">{errors.firstName.message.toString()}</p>}
                                        </div>
                                        <div className="relative w-full">
                                            <FloatingInput id="lastName" type='text' {...register('lastName')} />
                                            <FloatingLabel htmlFor="lastName">Last Name</FloatingLabel>
                                            {errors.lastName?.message && <p className="text-red-500">{errors.lastName.message.toString()}</p>}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <FloatingInput id="address" type='text' {...register('address')} />
                                        <FloatingLabel htmlFor="address">Address</FloatingLabel>
                                        {errors.address?.message && <p className="text-red-500">{errors.address.message.toString()}</p>}
                                    </div>
                                    <div className="relative">
                                        <FloatingInput id="apartment" type='text' {...register('apartment')} />
                                        <FloatingLabel htmlFor="apartment">Apartment, suite, etc. (optional)</FloatingLabel>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <div className="relative w-full">
                                            <FloatingInput id="city" type='text' {...register('city')} />
                                            <FloatingLabel htmlFor="city">City</FloatingLabel>
                                            {errors.city?.message && <p className="text-red-500">{errors.city.message.toString()}</p>}
                                        </div>
                                        <div className="relative w-full">
                                            <FloatingInput id="postalCode" type='text' {...register('postalCode')} />
                                            <FloatingLabel htmlFor="postalCode">Postal code (optional)</FloatingLabel>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Checkbox id="info-save" {...register('saveInfo')} />
                                        <label
                                            htmlFor="info-save"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Save this information for next time
                                        </label>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>
            </div>

            <div>
                <Button className='w-full text-lg h-14' type="submit">
                    Complete Order
                </Button>
            </div>
        </form>
    );
};

export default CheckoutDetailForm;