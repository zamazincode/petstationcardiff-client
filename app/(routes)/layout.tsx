import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MoveTop from "@/components/move-top";

export default function RoutesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MoveTop />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
