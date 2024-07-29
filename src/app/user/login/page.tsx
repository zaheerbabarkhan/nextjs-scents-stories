"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { FormEvent, useActionState, useState } from "react";
import { login } from "@/lib/action";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

const loginInitialState = {
    message: '',
    errors: {
        email: '',
        password: '',
        credentials: '',
        unknown: '',
    },
};
const Login = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [state, formAction] = useFormState(login, loginInitialState);
    if (state.message && state.message === "success") {
        router.push("/");
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            formAction(formData);
        } catch (error) {

        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-[26rem] mx-auto border-none">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-4xl font-bold uppercase">Login</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-11 border-none">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-base font-bold">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="m@example.com"

                            required
                            name="email"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-base font-bold">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            name="password"
                        />
                    </div>
                </CardContent>
                <CardFooter className="">
                    <Button type="submit" className="w-full p-3 h-11 bg-[#c13535] rounded-full hover:bg-[#c13535]">
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export default Login;