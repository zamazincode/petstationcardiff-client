"use server";

import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import HeaderClient from "./HeaderClient";

export default async function Header() {
    const user = await getUserMeLoader();

    return <HeaderClient isAuth={user.ok ? true : false} />;
}
