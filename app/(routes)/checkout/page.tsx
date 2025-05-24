import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import ClientCheckout from "./ClientCheckout";

export default async function CheckoutPage() {
    const user = await getUserMeLoader();

    return <ClientCheckout user={user.ok} />;
}
