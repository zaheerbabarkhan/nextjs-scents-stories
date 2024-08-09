"use client"
import { AppDispatch, RootState } from '@/lib/store';
import { attachUserToCart } from '@/provider/redux/cart.slice';
import { useAddCartMutation, useGetStripeQuery } from '@/provider/redux/query';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import StripeForm from '../stripe';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CartItem from '../cart/cartItem';
import { Separator } from '../ui/separator';
import CheckoutDetailForm from '../checkoutDetailsForm';
import { Spinner } from '../ui/spinner';

const Checkout = () => {
    // read the cart value from the redux store
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch: AppDispatch = useDispatch();
    const [addCart] = useAddCartMutation();
    const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
    const [isStripeReady, setIsStripeReady] = useState(false);
    const [detailSubmitted, setDetailSubmitted] = useState(false);
    const { data: session } = useSession();

    const [userId, setUserId] = useState<string | undefined>(session?.user?.userId);

    const [orderId, setOrderId] = useState<string | null>(null);
    const [hasCalledAddCart, setHasCalledAddCart] = useState(false);
    const { data: stripeData, isError, isLoading } = useGetStripeQuery(orderId as string, {
        skip: !orderId,
    });



    useEffect(() => {
        if (detailSubmitted) {
            if (userId && !cart.userId) {
                dispatch(attachUserToCart({ userId }));
            }
            if (cart.userId && userId && cart.userId == userId && !hasCalledAddCart && !orderId) {
                setHasCalledAddCart(true);

                addCart(cart)
                    .unwrap()
                    .then((result) => {
                        console.log("result from order",result)
                        setOrderId(result.id);
                    }).catch((err) => {
                        console.log("error from order",err)

                    });
            }
        }
    }, [session, cart, detailSubmitted]);


    useEffect(() => {
        if (detailSubmitted) {
            loadStripe(
                "pk_test_51PbEK8JFz4xOqBAp9GQ9KsJCQ5KGkxqxDTmThwi5yg4L260SfZOy2BEAgOxK40rd3rMeWDKnMeGbom0BQL2Uen0900YgwJrG7N"
            )
                .then((stripe) => {
                    setStripePromise(stripe);
                })
                .catch((error) => {
                    console.error("Failed to load Stripe:", error);
                });
        }
    }, [detailSubmitted]);

    useEffect(() => {

        if (detailSubmitted) {
            if (!isLoading && stripeData?.clientSecret && stripePromise) {
                setIsStripeReady(true);
            } else {
                setIsStripeReady(false);
            }
        }
    }, [stripeData, isLoading, stripePromise, detailSubmitted]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="flex gap-5 p-16 justify-center items-center">
            {
                detailSubmitted && <div className="flex justify-center items-center">
                    {isError && <p>Error loading Stripe data</p>}
                    {isLoading && <Spinner className="text-red-400 w-max mx-auto">
                        <span className="text-red-400">Loading Stripe</span>
                    </Spinner>}
                </div>
            }
            <div className='flex flex-row w-[1150px] gap-10'>
                <div className='w-1/2'>
                    {detailSubmitted && isStripeReady && (
                        <Elements
                            stripe={stripePromise}
                            options={{ clientSecret: stripeData?.clientSecret }}
                        >
                            <StripeForm />
                        </Elements>
                    )}

                    {
                        !detailSubmitted && <CheckoutDetailForm setDetailSubmitted={setDetailSubmitted} setUserId={setUserId} />
                    }
                </div>
                <Separator orientation='vertical' className='h-auto' />
                <div className='w-1/3'>
                    {
                        mounted && cart.products.map((cartItem, index) => {
                            return <div className='flex w-full flex-col' key={cartItem.productId}>
                                <CartItem showQuantity={false} key={cartItem.productId} productId={cartItem.productId} quantity={cartItem.quantity} />
                                {
                                    index + 1 != cart.products.length && <div className='w-full'>
                                        <Separator />
                                    </div>
                                }
                            </div>
                        })
                    }
                    <div className="p-4 border border-gray-300 rounded">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            {
                                mounted && <span>Rs {`${cart.totalPrice}.00`}</span>
                            }
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>Rs 169.00</span>
                        </div>
                        <div className="flex justify-between font-semibold mb-2">
                            <span>Total</span>
                            {
                                mounted && <span>PKR Rs {cart.totalPrice + 169}.00</span>
                            }
                        </div>
                        <p className="text-sm text-gray-600">Including Rs 187.44 in taxes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
