"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { resetPasswordAction } from "@/data/actions/auth-actions";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { ZodErrors } from "@/components/zod-errors";
import { StrapiErrors } from "@/components/strapi-errors";
import { toast } from "sonner";

const INITIAL_STATE = {
    data: null,
    strapiErrors: null,
    zodErrors: null,
    message: null,
    success: null,
};

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    const [formState, formAction] = useActionState(
        resetPasswordAction.bind(null, code),
        INITIAL_STATE,
    );

    const router = useRouter();

    useEffect(() => {
        if (formState.success) {
            toast.success(formState.success);

            const timeout = setTimeout(() => {
                router.push("/login");
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [formState.success, router]);

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
            <h1 className="text-4xl mt-8 font-semibold">Reset Your Password</h1>
            <p className="text-gray-400 mb-6">
                Set a new password for your account.
            </p>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" name="password" type="password" />
                    <ZodErrors error={formState?.zodErrors?.password} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="passwordConfirmation">
                        Confirm Password
                    </Label>
                    <Input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                    />
                    <ZodErrors
                        error={formState?.zodErrors?.passwordConfirmation}
                    />
                </div>

                <div className="space-y-2">
                    <SubmitButton
                        className="w-full"
                        text="Reset Password"
                        loadingText="Resetting..."
                    />
                    <StrapiErrors
                        error={formState?.strapiErrors || formState?.message}
                    />
                </div>

                {formState?.message && (
                    <p className="text-red-500 text-sm">{formState.message}</p>
                )}
            </form>
        </div>
    );
}
