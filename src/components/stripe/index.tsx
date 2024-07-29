import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";

const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/checkout/success`,
            },
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message || "An error occurred with your card.");
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else {
            setMessage(null);
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button
                className="w-full mt-7 bg-[#c13535]"
                disabled={isProcessing || !stripe || !elements}
            >
                <span>{isProcessing ? "Processing ... " : "Pay now"}</span>
            </Button>
            {/* Show any error or success messages */}
            {message && <div>{message}</div>}
        </form>
    );
};

export default StripeForm;