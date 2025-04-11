"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import testimonials from "@/lib/constants/testimonials";
import TestimoanialBox from "./TestimonialBox";
import LinkButton from "../ui/LinkButton";

export default function Testimonials() {
    return (
        <div className="">
            <div className="container flex justify-between items-end">
                <div>
                    <h5 className="flex items-center gap-1 font-light">
                        <span className="w-8 h-2 rounded-full bg-primary" />
                        Testimonials
                    </h5>
                    <h2 className="font-bold font-sour-gummy text-6xl">
                        Why our clients love us!
                    </h2>
                </div>

                <div className="flex gap-4 ">
                    <div className="prevEl1 bg-primary/90 text-white p-2 w-fit rounded-full z-10 cursor-pointer hover:bg-primary">
                        <ArrowLeft size={32} />
                    </div>
                    <div className="nextEl1 bg-primary/90 text-white p-2 w-fit rounded-full z-10 cursor-pointer hover:bg-primary">
                        <ArrowRight size={32} />
                    </div>
                </div>
            </div>

            <div className="relative mt-12">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        prevEl: ".prevEl1",
                        nextEl: ".nextEl1",
                    }}
                    slidesPerView={"auto"}
                    spaceBetween={20}
                    className="cursor-grab lg:!pl-32 lg:!pr-32"
                >
                    {testimonials.map((testimonial) => (
                        <>
                            <SwiperSlide
                                key={testimonial.name}
                                className="!w-fit !h-auto flex"
                            >
                                <TestimoanialBox testimonial={testimonial} />
                            </SwiperSlide>
                        </>
                    ))}
                </Swiper>
            </div>

            <div className="flex items-center justify-center mt-8">
                <LinkButton
                    href="https://www.google.com/search?sca_esv=cbf74057595eaae5&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzdoiqaRIGVEHQq3Qb8oWYE43d_gw0my8_9I_cZKjpHNuIm8t4_8NjpJl7spVcvgDP29z4I8GP2fQNfte0aFTvuIEkmX6VeulteIA2gMjUbRXG7ZNBf4S61hu_VZWz0Tszm6D88Q%3D&q=Pet+Station+-+Raw+Pet+food+Supplier+Reviews&sa=X&ved=2ahUKEwjnl_WU_sCMAxWSBdsEHeWpLvsQ0bkNegQIMxAE&biw=1920&bih=945&dpr=1"
                    isExternal
                    className="group gap-2"
                >
                    Read More
                    <MoveRight className="group-hover:ml-2 transition-all" />
                </LinkButton>
            </div>
        </div>
    );
}
