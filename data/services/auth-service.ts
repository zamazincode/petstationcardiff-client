import { getStrapiURL } from "@/lib/utils";

interface RegisterUserProps {
    username: string;
    password: string;
    email: string;
}

interface LoginUserProps {
    identifier: string;
    password: string;
}

interface ResetPasswordProps {
    code: string;
    password: string;
    passwordConfirmation: string;
}

const baseUrl = getStrapiURL();

export async function registerUserService(userData: RegisterUserProps) {
    const url = new URL("/api/auth/local/register", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
        });

        return response.json();
    } catch (error) {
        console.log("***************************************");
        console.error("Registration Service Error:", error);
        console.log("***************************************");
        return {
            error: {
                message: "An error occured!",
            },
        };
    }
}

export async function loginUserService(userData: LoginUserProps) {
    const url = new URL("/api/auth/local", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
        });

        return response.json();
    } catch (error) {
        console.log("***************************************");
        console.error("Login Service Error:", error);
        console.log("***************************************");
        return {
            error: {
                message: "An error occured!",
            },
        };
    }
}

export async function getResetPasswordToken(email: string) {
    const url = new URL("/api/auth/forgot-password", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        return response.json();
    } catch (error) {
        console.error("An error occurred::", error);
        return {
            error: {
                message: "An error occured!",
            },
        };
    }
}

export async function resetPassword(data: ResetPasswordProps) {
    const url = new URL("/api/auth/reset-password", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data }),
        });

        return response.json();
    } catch (error) {
        console.error("An error occurred:", error);
        return {
            error: {
                message: "An error occured!",
            },
        };
    }
}
