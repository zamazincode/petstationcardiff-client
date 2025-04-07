"use server";
import { z, ZodError } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
    getResetPasswordToken,
    loginUserService,
    registerUserService,
    resetPassword,
} from "@/data/services/auth-service";

// cookies config
const config = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

// register form validation schema
const schemaRegister = z.object({
    username: z.string().min(3).max(20, {
        message: "Username must be between 3 and 20 characters",
    }),
    password: z.string().min(6).max(100, {
        message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

// register form action
export async function registerUserAction(prevState: any, formData: FormData) {
    const validatedFields = schemaRegister.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
            message: "Missing Fields. Failed to Register.",
        };
    }

    const responseData = await registerUserService(validatedFields.data);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Register.",
        };
    }

    const cookieStore = await cookies();
    cookieStore.set("jwt", responseData.jwt, config);

    redirect("/");
}

// login form validation schema
const schemaLogin = z.object({
    identifier: z
        .string()
        .min(3, {
            message: "Identifier must have at least 3 or more characters",
        })
        .max(20, {
            message: "Please enter a valid username or email address",
        }),
    password: z
        .string()
        .min(6, {
            message: "Password must have at least 6 or more characters",
        })
        .max(100, {
            message: "Password must be between 6 and 100 characters",
        }),
});

// login form action
export async function loginUserAction(prevState: any, formData: FormData) {
    const validatedFields = schemaLogin.safeParse({
        identifier: formData.get("identifier"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Login.",
        };
    }

    const responseData = await loginUserService(validatedFields.data);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Login.",
        };
    }

    const cookieStore = await cookies();
    cookieStore.set("jwt", responseData.jwt, config);

    redirect("/");
}

// logout action
export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.set("jwt", "", { ...config, maxAge: 0 });
    redirect("/");
}

// reset password
const schemaEmail = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

export async function resetPasswordTokenAction(
    prevState: any,
    formData: FormData,
) {
    const validatedFields = schemaEmail.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: null,
            strapiErrors: null,
        };
    }

    const responseData = await getResetPasswordToken(
        validatedFields.data.email,
    );

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: null,
        };
    }

    return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: null,
        success: "If this email exists, a reset link has been sent.",
    };
}

const resetSchema = z
    .object({
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters." }),
        passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    });

export async function resetPasswordAction(
    code: string | null,
    prevState: any,
    formData: FormData,
) {
    const validatedFields = resetSchema.safeParse({
        password: formData.get("password"),
        passwordConfirmation: formData.get("passwordConfirmation"),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: null,
        };
    }

    if (!code) {
        return {
            ...prevState,
            zodErrors: null,
            strapiErrors: null,
            message: "Reset code is missing.",
        };
    }

    const responseData = await resetPassword({
        code,
        password: validatedFields.data.password,
        passwordConfirmation: validatedFields.data.passwordConfirmation,
    });

    if (!responseData || responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData?.error || null,
            message: "Failed to reset password.",
        };
    }

    return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: null,
        success: "Password succesfuly changed!",
    };
}
