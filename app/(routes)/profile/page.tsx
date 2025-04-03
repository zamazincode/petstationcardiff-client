import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const user = await getUserMeLoader();

    if (!user.ok) {
        return redirect("/login");
    }

    return <div>profile page</div>;
}
