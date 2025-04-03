import Header from "@/components/header/Header";

export default function RoutesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
