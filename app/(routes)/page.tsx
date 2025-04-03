import LinkButton from "@/components/ui/LinkButton";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import FeaturedCarousel from "@/components/featured-carousel";

export default function Home() {
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
                            <p className="text-copy/80">
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
            <section className="container rounded-md bg-[#E1F2F9] p-8 mt-12 flex lg:items-center lg:justify-between lg:gap-8 lg:flex-row flex-col ">
                <div className="space-y-8 flex-1">
                    <h2 className="text-5xl font-semibold">
                        Check Out Our <br /> Featured Products!
                    </h2>
                    <p className="max-w-[460px] lg:block hidden">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eveniet quae corporis iure nobis molestiae
                        doloremque
                    </p>
                    <LinkButton href="/products" className="lg:block hidden">
                        Explore All
                    </LinkButton>
                </div>
                <div className="flex-1 h-full">
                    <FeaturedCarousel />
                </div>
            </section>

            {/* Categories */}
            <section className="container md:p-8 mt-12 flex items-center justify-between gap-8">
                <h2 className="text-5xl font-semibold">Popular Categories</h2>
                <div className=""></div>
            </section>
        </>
    );
}
