"use client";

import { LogoutButton } from "@/components/ui/logout-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/profile/my-orders");
    }, []);

    return (
        <div>
            <LogoutButton />
        </div>
    );
}
