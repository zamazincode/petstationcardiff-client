import Header from "@/components/header/Header";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { redirect } from "next/navigation";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getUserMeLoader();
	if (user.ok) {
		return redirect("/");
	}

	return (
		<>
			<Header />
			<main className="w-full h-screen flex items-center justify-center gradient">
				{children}
			</main>
		</>
	);
}
