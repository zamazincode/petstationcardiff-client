import type { Metadata } from "next";
import { Sour_Gummy, Poppins } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import MobileMenu from "@/components/mobile/mobile-menu";
import AutoScrollToTop from "@/components/AutoScrollTop";

const sourGummy = Sour_Gummy({
    variable: "--font-sour-gummy",
});

const poppings = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Petstation Cardiff",
    description: "Petstation Cardiff",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${poppings.className} ${sourGummy.variable} antialiased `}
            >
                <AutoScrollToTop />
                <MobileMenu />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
