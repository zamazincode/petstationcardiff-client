"use client";

import Image from "next/image";
import Link from "next/link";
import { resetPasswordTokenAction } from "@/data/actions/auth-actions";
import { useActionState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "@/components/zod-errors";
import { StrapiErrors } from "@/components/strapi-errors";
import { SubmitButton } from "@/components/ui/submit-button";

const INITIAL_STATE = {
    data: null,
};

export default function ForgotPage() {
    const [formState, formAction] = useActionState(
        resetPasswordTokenAction,
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

            <h1 className="text-4xl mt-8 font-semibold">Reset Password</h1>

            <p className="text-gray-400 mb-6">
                Please enter the email address you'd like your password reset
                information sent to
            </p>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email address"
                    />
                    <ZodErrors error={formState?.zodErrors?.email} />
                </div>

                <div className="space-y-2">
                    <SubmitButton
                        className="w-full"
                        text="Send"
                        loadingText="Loading"
                    />
                    <StrapiErrors
                        error={formState?.strapiErrors || formState?.message}
                    />
                </div>

                {formState?.message && (
                    <p className="text-red-500 text-sm">{formState.message}</p>
                )}

                {formState?.success && (
                    <p className="text-green-500 text-sm">
                        {formState.success}
                    </p>
                )}

                <div className="mt-4 text-center text-sm">
                    <Link
                        className="hover:underline ml-2 text-primary hover:text-primary/70 transition-colors"
                        href="/login"
                    >
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
