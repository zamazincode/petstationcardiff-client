"use client";

import Fancybox from "@/components/ui/Fancybox";
import FancyboxCarousel from "@/components/ui/FancyboxCarousel";
import { getProducts } from "@/data/services/get-products";
import { Product } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
    const params = useParams();

    const [data, setData] = useState<Product | null>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            const query = `?filters[slug][$eq]=${params["slug"]}&populate=*`;

            setLoading(true);
            setError(null);

            const { data, error } = await getProducts(query);

            if (error) {
                setError(error);
            } else {
                setData(data[0]);
            }

            setLoading(false);
        };

        fetchProduct();
    }, []);

    return (
        <section className="container">
            <div className="flex md:flex-row flex-col gap-6">
                <div className="flex-1">
                    {data?.images?.length && (
                        <Fancybox
                            options={{
                                Carousel: {
                                    infinite: false,
                                },
                            }}
                        >
                            <FancyboxCarousel options={{ infinite: true }}>
                                {data?.images.length > 0 ? (
                                    data.images.map((image) => (
                                        <div
                                            key={image.id}
                                            className="f-carousel__slide max-h-[500px] aspect-square flex items-center justify-center"
                                            data-fancybox="gallery"
                                            data-src={
                                                getStrapiURL() + image.url
                                            }
                                            data-thumb-src={
                                                getStrapiURL() +
                                                image.formats.thumbnail.url
                                            }
                                        >
                                            <Image
                                                width={400}
                                                height={400}
                                                alt={data.name}
                                                src={getStrapiURL() + image.url}
                                                className="w-full h-full object-contain p-1 "
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div
                                        className="f-carousel__slide w-full aspect-square"
                                        data-fancybox="gallery"
                                        data-src="/placeholder-image.png"
                                        data-thumb-src="/placeholder-image.png"
                                    >
                                        <Image
                                            width={500}
                                            height={500}
                                            alt="product image"
                                            src="/placeholder-image.png"
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                )}
                            </FancyboxCarousel>
                        </Fancybox>
                    )}
                </div>
                <div className="flex-1">
                    <h1>{data?.name}</h1>
                </div>
            </div>
        </section>
    );
}
