"use client";

import LinkButton from "@/components/ui/LinkButton";
import {
    ChevronLeft,
    ChevronRight,
    MoveRight,
    ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import ProductsCarousel from "@/components/products-carousel";
import Categories from "@/components/homepage/categories";
import Brands from "@/components/homepage/brands";
import Testimonials from "@/components/homepage/testimonials";
import Campaigns from "@/components/homepage/campaigns";
import { useDevice } from "@/lib/hooks/useDevice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingAnimation from "@/components/ui/loading";

export default function Home() {
    const { ready, isMobile, isTablet } = useDevice();
    const router = useRouter();

    useEffect(() => {
        if (ready && (isMobile || isTablet)) {
            router.push("/products");
        }
    }, [ready, isMobile, isTablet, router]);

    if (!ready) return null;

    if (isMobile || isTablet) return <LoadingAnimation />;

    return (
        <>
            {/* Hero */}
            <section className="container rounded-md bg-[#EEF0FF] md:p-8 flex items-center justify-center mt-4">
                <div className="flex-1">
                    <h1 className="font-sour-gummy text-center font-medium md:text-8xl text-3xl">
                        Happy Pets, <br />
                        Happy Hearts!
                    </h1>
                    <div className="flex items-center gap-4">
                        <Image
                            src="/hero-cat.png"
                            alt="Happy Cat"
                            width={410 / 1.3}
                            height={438 / 1.3}
                        />
                        <div className="space-y-4">
                            <p className="text-copy-light">
                                Discover the best for your furry friends! From
                                premium pet food to cozy accessories, we provide
                                everything your pet needs for a happy and
                                healthy life. Shop with love, because they
                                deserve the best!
                            </p>
                            <LinkButton href="/products">
                                Shop Now
                                <ShoppingCart />
                            </LinkButton>
                        </div>
                    </div>
                </div>
                <Image
                    src="/hero-dog.png"
                    alt="Happy Dog"
                    width={495}
                    height={593}
                />
            </section>

            {/* Featured Products */}
            <section className="container rounded-md bg-[#E1F2F9] px-8 py-12 mt-12 flex gap-8 lg:justify-between lg:flex-row flex-col relative">
                <div className="space-y-8 flex-[2]">
                    <h2 className="text-5xl font-semibold font-sour-gummy">
                        Check Out Our <br /> Featured Products!
                    </h2>
                    <p className="max-w-[460px]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eveniet quae corporis iure nobis molestiae
                        doloremque
                    </p>
                    <LinkButton href="/products" className="group gap-2">
                        Explore All
                        <MoveRight className="group-hover:ml-2 transition-all" />
                    </LinkButton>
                </div>
                <div className="flex gap-4 absolute right-7 top-5 z-[11]">
                    <div className="prevEl bg-primary/90 text-white p-2 w-fit rounded-full z-10 cursor-pointer hover:bg-primary">
                        <ChevronLeft />
                    </div>
                    <div className="nextEl bg-primary/90 text-white p-2 w-fit rounded-full z-10 cursor-pointer hover:bg-primary">
                        <ChevronRight />
                    </div>
                </div>
                <div className="flex-[3] relative overflow-hidden">
                    <div className="h-full w-1/5 absolute right-0 top-0 bg-gradient-to-r from-[rgba(255,255,255,0)] to-99% to-[#E1F2F9] pointer-events-none  z-10" />
                    <div className="h-full w-1/5 absolute -left-8 top-0 bg-gradient-to-l from-[rgba(255,255,255,0)] to-99% to-[#E1F2F9] pointer-events-none  z-10" />
                    <ProductsCarousel />
                </div>
            </section>

            {/* Categories */}
            <section className="container my-16">
                <h2 className="text-6xl font-semibold font-sour-gummy mb-10">
                    Shop by Categories
                </h2>
                <Categories />
            </section>

            {/* Brands */}
            <section className=" mt-18 mb-24  bg-gradient-to-b from-[#EEF0FF] to-[#fff] pb-12 pt-20">
                <div className="flex container lg:items-center gap-4 mb-12 lg:flex-row flex-col">
                    <h2 className="text-9xl leading-0 font-semibold font-sour-gummy mb-12">
                        Brands
                    </h2>
                    <p className="max-w-[700px] text-sm">
                        We've brought together the best brands for your beloved
                        pets! Support their health and happiness with reliable,
                        nutritious, and vet-approved products. Find the
                        high-quality food and accessories you're looking for
                        here!
                    </p>
                </div>
                <Brands />
            </section>

            {/* Campaigns */}
            <section className="container my-18">
                <div className="mb-8">
                    <h5 className="flex items-center gap-1 font-light">
                        <span className="w-8 h-2 rounded-full bg-primary" />
                        Campaigns
                    </h5>
                    <h2 className="font-bold font-sour-gummy text-6xl">
                        Explore Box Deals
                    </h2>
                </div>
                <Campaigns />
            </section>

            {/* Testimonials */}
            <section className="bg-[#E1F2F9]   mt-12 py-12 ">
                <Testimonials />
            </section>
        </>
    );
}
