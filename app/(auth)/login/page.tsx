"use client";

import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import { loginUserAction } from "@/data/actions/auth-actions";
import { useActionState, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "@/components/zod-errors";
import { StrapiErrors } from "@/components/strapi-errors";
import { SubmitButton } from "@/components/ui/submit-button";
import { Eye, EyeClosed } from "lucide-react";

const INITIAL_STATE = {
    data: null,
};

export default function LoginPage() {
    const [isHiddenPswrd, setIsHiddenPswrd] = useState(true);

    const passwordToggle = () => {
        setIsHiddenPswrd((prev) => !prev);
    };

    const [formState, formAction] = useActionState(
        loginUserAction,
        INITIAL_STATE,
    );

    return (
        <div className="p-6 mt-12 shadow-2xl rounded-2xl bg-card relative w-full max-w-md">
            <Image
                src="/dog.png"
                alt="Dog Photo"
                width={354 / 2}
                height={497 / 2}
                className="absolute -top-39 right-0"
                priority
            />

            <Logo className="text-4xl mt-8" />

            <p className="text-gray-400 mb-6">Log in now and start shopping</p>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="identifier">Email</Label>
                    <Input
                        id="identifier"
                        name="identifier"
                        type="text"
                        placeholder="email or username"
                    />
                    <ZodErrors error={formState?.zodErrors?.identifier} />
                </div>

                <div className="space-y-2 relative">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type={isHiddenPswrd ? "password" : "text"}
                        placeholder="password"
                    />
                    <ZodErrors error={formState?.zodErrors?.password} />
                    <button
                        type="button"
                        onClick={passwordToggle}
                        className="absolute top-7.5 right-2 bg-transparent cursor-pointer"
                    >
                        {isHiddenPswrd ? <Eye /> : <EyeClosed />}
                    </button>
                </div>

                <div className="space-y-2">
                    <SubmitButton
                        className="w-full"
                        text="Log in"
                        loadingText="Loading"
                    />
                    <StrapiErrors
                        error={formState?.strapiErrors || formState?.message}
                    />
                </div>

                <div className="mt-4 text-center text-sm">
                    Don't have an account?
                    <Link
                        className="hover:underline ml-2 text-primary hover:text-primary/70 transition-colors"
                        href="register"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}
