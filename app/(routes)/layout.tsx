import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MobileHeader from "@/components/mobile/mobile-header";
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
            <MobileHeader />
            <main>{children}</main>
            <Footer />
        </>
    );
}
