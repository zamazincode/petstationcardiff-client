"use server";

import { getAuthToken } from "@/data/services/get-token";
import HeaderClient from "./HeaderClient";

export default async function Header() {
    const token = await getAuthToken();

    return <HeaderClient isAuth={token ? true : false} />;
}
