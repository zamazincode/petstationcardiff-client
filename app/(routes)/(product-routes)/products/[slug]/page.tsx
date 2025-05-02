"use client";

// #region dependency import
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "@/data/services/get-products";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import Fancybox from "@/components/ui/Fancybox";
import FancyboxCarousel from "@/components/ui/FancyboxCarousel";
import { Product } from "@/lib/constants/definitions";
import { getStrapiURL } from "@/lib/utils";

import {
    ShoppingCart,
    Truck,
    MinusCircle,
    PlusCircle,
    Check,
    Home,
    Leaf,
    MoveRight,
} from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LinkButton from "@/components/ui/LinkButton";
import RelatedProducts from "@/components/product/RelatedProducts";

// #endregion

export default function ProductDetailsPage() {
    const params = useParams();

    const [data, setData] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    // fetch data
    useEffect(() => {
        const fetchProduct = async () => {
            const query = `?filters[slug][$eq]=${params.slug}&populate[category][populate]=image&populate[pets][populate]=image&populate[brand][populate]=logo&populate[box_deals]=true&populate[images]=true`;

            setLoading(true);
            setError(null);

            const { data: _data, error } = await getProducts(query);

            if (!_data.length) {
                setError("Product not found!");
            }

            if (error) {
                setError(error);
            } else {
                setData(_data[0]);
            }

            setLoading(false);
        };

        fetchProduct();
    }, [params.slug]);

    const incrementQuantity = () => {
        if (data?.trackStock && data?.quantity && quantity >= data.quantity) {
            return;
        }
        setQuantity((prev) => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        setAddingToCart(true);

        // Burada sepete ekleme mantığınızı uygulayın
        setTimeout(() => {
            setAddingToCart(false);
            setAddedToCart(true);

            setTimeout(() => {
                setAddedToCart(false);
            }, 2000);
        }, 800);
    };

    if (loading) {
        return (
            <section className="container py-10">
                <div className="flex md:flex-row flex-col gap-6">
                    <div className="flex-[2] space-y-4">
                        <Skeleton className="w-full h-[400px]" />
                        <div className="flex gap-2">
                            <Skeleton className="w-20 h-20" />
                            <Skeleton className="w-20 h-20" />
                            <Skeleton className="w-20 h-20" />
                        </div>
                    </div>
                    <div className="flex-[3] space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-10 w-40" />
                        <div className="flex gap-2">
                            <Skeleton className="h-12 w-32" />
                            <Skeleton className="h-12 w-48" />
                        </div>
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <div className="container py-10">
                <Alert
                    variant="destructive"
                    className="bg-red-100 h-[300px] items-center justify-center"
                >
                    <AlertDescription className="justify-items-center  text-lg gap-4">
                        {error}
                        <LinkButton
                            href="/"
                            className="flex items-center justify-center gap-1 py-2"
                        >
                            <Home />
                            Return Home
                        </LinkButton>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const isOnSale = data?.salePrice && data.salePrice < data.price;

    const discountPercentage = isOnSale
        ? Math.round(((data.price - data.salePrice) / data.price) * 100)
        : 0;

    return (
        <>
            {/* <Link
                href=""
                className="w-10 h-10 p-2 flex items-center justify-center absolute top-4 left-4 border border-primary rounded-full md:hidden"
            >
                <Image
                    src={"/arrow.svg"}
                    alt="arrow"
                    width={16}
                    height={16}
                    className="object-cover"
                />
            </Link> */}
            <section className="container sm:pb-32 pb-16">
                {/* Breadcrumb */}
                <div className="lg:mb-6 mb-2.5">
                    <Breadcrumb>
                        <BreadcrumbList className="max-sm:text-xs max-sm:gap-0.5">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/products">
                                    Products
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {data && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            href={
                                                "/category/" +
                                                data?.category?.slug
                                            }
                                        >
                                            {data?.category?.name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            {data.name}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {data && (
                    <>
                        <div className="flex overflow-hidden lg:flex-row flex-col md:gap-8 items-start">
                            {/* Images */}
                            <div className="flex-1 w-full overflow-hidden">
                                {data?.images?.length ? (
                                    <div className="sticky top-8">
                                        <Fancybox
                                            options={{
                                                Carousel: {
                                                    infinite: false,
                                                },
                                            }}
                                        >
                                            <FancyboxCarousel
                                                options={{ infinite: true }}
                                            >
                                                {data.images.length > 0 ? (
                                                    data.images.map((image) => (
                                                        <div
                                                            key={image?.id}
                                                            className="f-carousel__slide max-h-[500px] aspect-square flex items-center justify-center cursor-zoom-in relative rounded-lg overflow-hidden bg-[#E3E5FA] !p-4"
                                                            data-fancybox="gallery"
                                                            data-src={
                                                                getStrapiURL() +
                                                                image?.url
                                                            }
                                                            data-thumb-src={
                                                                getStrapiURL() +
                                                                image?.formats
                                                                    ?.thumbnail
                                                                    .url
                                                            }
                                                        >
                                                            {isOnSale && (
                                                                <div className="absolute top-4 left-4 z-10">
                                                                    <Badge className="bg-orange-500 px-2 py-1 text-sm uppercase">
                                                                        %
                                                                        {
                                                                            discountPercentage
                                                                        }{" "}
                                                                        Discount
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                            <Image
                                                                priority
                                                                width={500}
                                                                height={500}
                                                                alt={data.name}
                                                                src={
                                                                    getStrapiURL() +
                                                                    image?.url
                                                                }
                                                                className="w-full h-full object-contain z-[5]"
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
                                    </div>
                                ) : null}
                            </div>

                            {/* Informations */}
                            <div className="flex-1 w-full">
                                <div className="lg:space-y-4 space-y-1.5">
                                    {/* Brand */}
                                    {data?.brand && (
                                        <Link
                                            href={`/products?brand=${data?.brand?.slug}`}
                                            className="flex items-center justify-center border border-primary hover:bg-primary/10 transition-colors w-fit px-4 py-2.5 rounded-full min-w-[80px] max-sm:hidden"
                                        >
                                            <Image
                                                src={
                                                    getStrapiURL() +
                                                    data?.brand?.logo?.url
                                                }
                                                alt={data?.brand?.name}
                                                width={60}
                                                height={60}
                                                className="h-8 w-auto object-contain"
                                            />
                                        </Link>
                                    )}

                                    {/* Title and Stock State */}
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            {data.name}
                                        </h1>

                                        <div className="mt-2 flex items-center gap-2 uppercase text-white">
                                            {data.trackStock && (
                                                <Badge
                                                    className={
                                                        data.stockState ===
                                                        "in stock"
                                                            ? "bg-green-600 font-semibold rounded-full py-1"
                                                            : "bg-red-500 font-semibold rounded-full py-1"
                                                    }
                                                >
                                                    {data.stockState}
                                                </Badge>
                                            )}

                                            {data.barcode && (
                                                <span className="text-sm text-gray-500">
                                                    <span className="font-medium">
                                                        SKU:
                                                    </span>{" "}
                                                    {data.barcode}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Category and Pet */}
                                    <div className="flex gap-2.5 flex-wrap items-center">
                                        <h6 className="font-medium">
                                            Category:
                                        </h6>
                                        {data.category && (
                                            <Link
                                                className="capitalize flex gap-2 rounded-full border lg:px-4 lg:py-2 px-2 py-1 items-center justify-center hover:bg-primary/10 transition-colors"
                                                key={data.category?.id}
                                                href={`/products?pet=${data.category?.slug}`}
                                            >
                                                {data.category.image && (
                                                    <Image
                                                        src={
                                                            getStrapiURL() +
                                                            data?.category
                                                                ?.image?.url
                                                        }
                                                        alt={
                                                            data.category?.name
                                                        }
                                                        width={24}
                                                        height={24}
                                                        className=""
                                                    />
                                                )}
                                                {data.category?.name}
                                            </Link>
                                        )}
                                        {data.pets &&
                                            data.pets.length > 0 &&
                                            data.pets.map((pet) => (
                                                <Link
                                                    className="uppercase flex gap-2 rounded-full border lg:px-4 lg:py-2 px-2 py-1 items-center justify-center hover:bg-primary/10 transition-colors"
                                                    key={pet?.id}
                                                    href={`/products?pet=${pet?.slug}`}
                                                >
                                                    <Image
                                                        src={
                                                            getStrapiURL() +
                                                            pet?.image?.url
                                                        }
                                                        alt={pet?.name}
                                                        width={24}
                                                        height={24}
                                                        className=""
                                                    />
                                                    {pet?.name}
                                                </Link>
                                            ))}
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-end gap-3">
                                        <div>
                                            <span className="text-3xl font-bold text-primary">
                                                £
                                                {isOnSale
                                                    ? data.salePrice
                                                    : data.price}
                                            </span>
                                            {isOnSale && (
                                                <span className="ml-2 text-xl line-through text-gray-500">
                                                    £{data.price}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="md:py-4">
                                        <div className="flex flex-row gap-4">
                                            <div className="flex items-center h-12 border rounded-full w-fit">
                                                <button
                                                    onClick={decrementQuantity}
                                                    className="flex items-center justify-center h-full px-3 text-gray-600 cursor-pointer hover:text-primary transition-colors disabled:text-gray-200"
                                                    disabled={quantity <= 1}
                                                >
                                                    <MinusCircle size={30} />
                                                </button>
                                                <span className="flex items-center justify-center h-full w-12 text-center font-medium">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={incrementQuantity}
                                                    className="flex items-center justify-center h-full px-3 text-gray-600 cursor-pointer hover:text-primary transition-colors disabled:text-gray-200"
                                                    disabled={
                                                        data.stockState ===
                                                        "out of stock"
                                                    }
                                                >
                                                    <PlusCircle size={30} />
                                                </button>
                                            </div>

                                            <Button
                                                className="flex-1 h-12 gap-2 text-base font-medium rounded-full"
                                                disabled={
                                                    addingToCart ||
                                                    (data.trackStock &&
                                                        data.stockState ===
                                                            "out of stock")
                                                }
                                                onClick={handleAddToCart}
                                            >
                                                {addingToCart ? (
                                                    <span className="inline-flex items-center gap-2">
                                                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></span>
                                                        Adding...
                                                    </span>
                                                ) : addedToCart ? (
                                                    <span className="inline-flex items-center gap-2">
                                                        <Check size={18} />
                                                        Added to Cart
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2">
                                                        <ShoppingCart
                                                            size={18}
                                                        />
                                                        Add to Cart
                                                    </span>
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                                                <Truck size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    Fast Delivery
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Tuesday and Friday during
                                                    1pm – 7pm
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                                                <Leaf size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    Always Fresh
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Good Quality Product
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="mt-16">
                            <Tabs defaultValue="description" className="w-full">
                                <TabsList className="h-full rounded-full grid grid-cols-2 mb-6 py-0 cursor-pointer bg-[#E3E5FA]">
                                    <TabsTrigger
                                        value="description"
                                        className="py-4 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-copy-light font-semibold px-12"
                                    >
                                        Description
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="details"
                                        className="py-4 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-copy-light font-semibold px-12"
                                    >
                                        Details
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="description"
                                    className="p-6 border rounded-lg bg-[#F9FAFF] border-[#E3E5FA]"
                                >
                                    <div className=" max-w-none markdown gap-6 flex flex-col">
                                        <Markdown>{data.description}</Markdown>
                                    </div>
                                </TabsContent>
                                <TabsContent
                                    value="details"
                                    className="p-6 border rounded-lg bg-[#F9FAFF] border-[#E3E5FA]"
                                >
                                    <div className=" max-w-none">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Details
                                        </h3>
                                        <div className="grid grid-cols-1 gap-y-2">
                                            {data.weight && (
                                                <div className="flex justify-between py-2">
                                                    <span className="font-medium">
                                                        Weight
                                                    </span>
                                                    <span>{data.weight}</span>
                                                </div>
                                            )}
                                            {data.brand && (
                                                <div className="flex justify-between py-2 border-t">
                                                    <span className="font-medium">
                                                        Brand
                                                    </span>
                                                    <Link
                                                        className="hover:text-primary transition-colors"
                                                        href={
                                                            "/products?brand=" +
                                                            data?.brand?.slug
                                                        }
                                                    >
                                                        {data?.brand?.name}
                                                    </Link>
                                                </div>
                                            )}
                                            <div className="flex justify-between py-2 border-t">
                                                <span className="font-medium">
                                                    Category
                                                </span>
                                                <Link
                                                    className="hover:text-primary transition-colors"
                                                    href={
                                                        "/category/" +
                                                        data?.category?.slug
                                                    }
                                                >
                                                    {data?.category?.name}
                                                </Link>
                                            </div>
                                            {data.trackStock && (
                                                <div className="flex justify-between py-2 border-t">
                                                    <span className="font-medium">
                                                        Stock Status
                                                    </span>
                                                    <span
                                                        className={
                                                            data.stockState ===
                                                            "in stock"
                                                                ? "text-green-600 capitalize"
                                                                : "text-red-600 capitalize"
                                                        }
                                                    >
                                                        {data.stockState}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </>
                )}
                {/* Related Products */}
                <div className="mt-12">
                    <h2 className="mb-4 text-2xl font-sour-gummy font-medium">
                        Related Products
                    </h2>
                    <RelatedProducts rel={data?.category?.slug || ""} />
                    <LinkButton href="/products" className="mx-auto mt-6 group">
                        See All
                        <MoveRight className="group-hover:ml-2 transition-all" />
                    </LinkButton>
                </div>
            </section>
        </>
    );
}
