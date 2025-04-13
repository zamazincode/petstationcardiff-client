"use client";

import { getProducts } from "@/data/services/get-products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import ProductBox from "./product/ProductBox";
import { useEffect, useState } from "react";
import { Product } from "@/lib/constants/definitions";
import { Skeleton } from "./ui/skeleton";

export default function ProductsCarousel() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await getProducts(
                "?filters[isFeatured]=true&filters[stockState][$eq]=in%20stock&populate=*",
            );

            if (error) {
                setError(error);
            } else {
                setProducts(data);
            }

            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (error) {
        return (
            <div className="text-red-500 flex items-center justify-center h-full">
                {error}
            </div>
        );
    }

    if (products?.length === 0) {
        return (
            <div className="text-red-500 flex items-center justify-center h-full">
                Products not found
            </div>
        );
    }

    return (
        <div className="relative mt-8 w-full">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: ".prevEl",
                    nextEl: ".nextEl",
                }}
                loop
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    540: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className=" cursor-grab"
            >
                {loading
                    ? [...Array(10).keys()].map((i) => (
                          <SwiperSlide key={i} className="!h-auto flex">
                              <div className="relative h-full max-w-[300px] flex flex-col">
                                  <Skeleton className="rounded-md aspect-square max-h-[280px] relative flex items-center justify-center" />
                                  <Skeleton className="w-full h-12 my-2" />
                              </div>
                          </SwiperSlide>
                      ))
                    : products?.map((product) => (
                          <SwiperSlide
                              key={product.id}
                              className="!h-auto flex"
                          >
                              <ProductBox data={product} />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </div>
    );
}
