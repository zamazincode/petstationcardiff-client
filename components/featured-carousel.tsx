"use client";

import { getProducts } from "@/data/services/get-products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductBox from "./product/ProductBox";
import { useEffect, useState } from "react";
import { Product } from "@/lib/constants/definitions";

export default function FeaturedCarousel() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const products = await getProducts(
                    "/products?sort[0]=id:desc&filters[isFeatured]=true&pagination[start]=0&pagination[limit]=8&populate=*",
                );
                setProducts(products);
            } catch (error) {
                console.log("Featured products error -> ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>loading</div>;
    }

    // swiper ı düzelt
    return (
        <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={3}
            spaceBetween={30}
            loop
        >
            {products?.map((product) => (
                <SwiperSlide key={product.id}>
                    <ProductBox data={product} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
