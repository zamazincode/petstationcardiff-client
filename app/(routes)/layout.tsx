import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MobileMenu from "@/components/mobile/mobile-menu";
import MoveTop from "@/components/move-top";

export default function RoutesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MoveTop />
            <MobileMenu />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
