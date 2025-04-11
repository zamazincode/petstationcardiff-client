import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUserMeLoader();

    if (!user.ok) {
        return redirect("/login");
    }

    return <>{children}</>;
}
