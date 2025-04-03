import Header from "@/components/header/Header";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="w-full h-screen flex items-center justify-center gradient">
                {children}
            </main>
        </>
    );
}
