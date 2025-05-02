import Testimonials from "@/components/homepage/testimonials";
import { Bone, Leaf, PawPrint } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <>
            <section className="space-y-4 container mt-4">
                <div className="flex items-center flex-col md:flex-row ">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl capitalize font-bold mb-4 text-copy">
                            We care for the healthy and standardized development
                            of your pet.
                        </h1>
                        <div className="flex gap-4 mt-6">
                            <div className="flex items-center gap-2">
                                <Leaf color="#612cc9" />
                                100% Natural
                            </div>
                            <div className="flex items-center gap-2">
                                <PawPrint color="#612cc9" />
                                Easy Prepare
                            </div>
                            <div className="flex items-center gap-2">
                                <Bone color="#612cc9" />
                                Strengthens immunity
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Image
                            src="/about.webp"
                            alt="pets image"
                            width={1000}
                            height={1000}
                            className="object-cover w-full h-auto"
                        />
                    </div>
                </div>
                <div className="my-12">
                    <div className="text-center">
                        <h2 className="text-center font-semibold text-4xl">
                            Pet Station Cardiff
                        </h2>
                        <span className="text-sm text-primary">
                            (Sunny pet foods Ltd)
                        </span>
                    </div>
                </div>
                <p className="text-center">
                    Your go-to destination for all things pet-related. We are a
                    raw food supplier and pet shop established in December 2024,
                    based in Cardiff. We strive to provide high-quality products
                    and services to pet owners and enthusiasts in the local
                    community. Our team of pet experts is dedicated to helping
                    you find the perfect products for your furry friends. We
                    carry a wide range of raw food options for dogs and cats, as
                    well as a variety of pet supplies including toys, grooming
                    products, and more. At Pet Station Cardiff, we believe that
                    pets are an important part of the family and deserve the
                    best care possible. That's why we are committed to providing
                    you with the highest quality products and services at
                    competitive prices.We are more than just a pet shop, we want
                    to be a part of your pet's journey.
                </p>
            </section>
            <section className="bg-[#E1F2F9] max-md:hidden mt-12 py-12 ">
                <Testimonials />
            </section>
        </>
    );
}
