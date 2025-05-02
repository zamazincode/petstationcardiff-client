"use client";

// #region dependency import
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBoxDeals } from "@/data/services/get-products";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import Fancybox from "@/components/ui/Fancybox";
import FancyboxCarousel from "@/components/ui/FancyboxCarousel";
import { BoxDeal, Product } from "@/lib/constants/definitions";
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
import { toast } from "sonner";

// #endregion

type BoxDealProductProps = {
    product: Product;
    totalQuantity: number;
    maxQuantity: number;
    setTotalQuantiy: Dispatch<SetStateAction<number>>;
    setSelectedProducts: Dispatch<SetStateAction<{ [slug: string]: number }>>;
};
const BoxDealProduct = ({
    product,
    totalQuantity,
    setTotalQuantiy,
    maxQuantity,
    setSelectedProducts,
}: BoxDealProductProps) => {
    const IMAGE_URL = product.images
        ? getStrapiURL() + product.images[0].url
        : "/placeholder-image.png";

    const [quantity, setQuantity] = useState(0);

    const updateQuantity = (change: number) => {
        const newQuantity = quantity + change;

        if (
            product?.trackStock &&
            product?.quantity &&
            newQuantity > product.quantity
        )
            return;
        if (change > 0 && totalQuantity >= maxQuantity) {
            toast.warning(`You can select maximum ${maxQuantity} products.`);
            return;
        }
        if (newQuantity < 1) return;

        setQuantity(newQuantity);
        setTotalQuantiy((prev) => prev + change);
        setSelectedProducts((prev) => ({
            ...prev,
            [product.slug]: newQuantity,
        }));
    };

    const incrementQuantity = () => updateQuantity(1);
    const decrementQuantity = () => updateQuantity(-1);

    return (
        <div className="flex items-center h-24 border rounded-lg bg-[#e3e5fa] w-full justify-between px-4 py-2">
            <div className="flex items-center gap-4">
                <div className="">
                    <Image
                        src={IMAGE_URL}
                        alt={product.name}
                        width={60}
                        height={60}
                    />
                </div>
                <h4 className="text-lg">{product.name}</h4>
            </div>

            {/* Buttons */}
            <div className="flex items-center h-12 border rounded-full w-fit bg-white">
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
                        product.stockState === "out of stock" ||
                        totalQuantity >= maxQuantity
                    }
                >
                    <PlusCircle size={30} />
                </button>
            </div>
        </div>
    );
};

export default function ProductDetailsPage() {
    const params = useParams();

    const [data, setData] = useState<BoxDeal | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [addingToCart, setAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const [selectedProducts, setSelectedProducts] = useState<{
        [slug: string]: number;
    }>({});
    const [totalSelected, setTotalSelected] = useState(0);

    // fetch data
    useEffect(() => {
        const fetchProduct = async () => {
            const query = `?filters[slug][$eq]=${params.slug}&populate[category][populate]=image&populate[pets][populate]=image&populate[brand][populate]=logo&populate[products][populate]=*&populate[images]=true`;

            setLoading(true);
            setError(null);

            const { data: _data, error } = await getBoxDeals(query);

            if (!_data.length) {
                setError("Product not found!");
            }

            if (error) {
                setError(error);
            } else {
                setData(_data[0]);
                // tüm productlar 0 adet
                const initialProducts = {};
                _data[0].products.forEach((product) => {
                    initialProducts[product.slug] = 0;
                });
                setSelectedProducts(initialProducts);
            }

            setLoading(false);
        };

        fetchProduct();
    }, [params.slug]);

    const handleAddToCart = () => {
        setAddingToCart(true);
        console.log(selectedProducts);

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
            <section className="container sm:pb-32 pb-16 max-sm:mt-12">
                {/* Breadcrumb */}
                <div className="mb-6">
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
                                            href={data?.category?.slug}
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
                        <div className="flex lg:flex-row flex-col gap-4 md:gap-8 items-start">
                            {/* Images */}
                            <div className="flex-1 overflow-hidden">
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
                            <div className="flex-1">
                                <div className="space-y-4">
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

                                    {/* Title */}
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {data.name}
                                    </h1>

                                    {/* Category and Pet */}
                                    <div className="flex gap-2.5 flex-wrap items-center">
                                        <h6 className="font-medium">
                                            Category:
                                        </h6>
                                        {data.category && (
                                            <Link
                                                className="capitalize flex gap-2 rounded-full border px-4 py-2 items-center justify-center hover:bg-primary/10 transition-colors"
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
                                                    className="uppercase flex gap-2 rounded-full border px-4 py-2 items-center justify-center hover:bg-primary/10 transition-colors"
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

                                    {/* Product */}
                                    <h2 className="text-lg !mb-1.5">
                                        Please select{" "}
                                        <span className="text-primary">
                                            {data.maxQuantity}
                                        </span>{" "}
                                        product
                                    </h2>
                                    <div className="flex flex-col gap-2 overflow-auto max-h-[260px] p-4 rounded-2xl border">
                                        {data?.products?.map((product) => (
                                            <BoxDealProduct
                                                product={product}
                                                totalQuantity={totalSelected}
                                                setTotalQuantiy={
                                                    setTotalSelected
                                                }
                                                maxQuantity={data.maxQuantity}
                                                setSelectedProducts={
                                                    setSelectedProducts
                                                }
                                                key={product.id}
                                            />
                                        ))}
                                    </div>

                                    {/* Price */}
                                    <div className="md:py-4">
                                        <div className="flex flex-row gap-4">
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

                                            {/* Add to Cart Button */}
                                            <Button
                                                className="flex-1 h-12 gap-2 text-base font-medium rounded-full"
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
                            <Tabs defaultValue="description">
                                <TabsList className="h-full rounded-full w-fit px-0 mb-6 py-0 cursor-pointer bg-[#E3E5FA]">
                                    <TabsTrigger
                                        value="description"
                                        className="py-4 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-copy-light font-semibold px-12"
                                    >
                                        Description
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
                            </Tabs>
                        </div>
                    </>
                )}
                {/* Related Products */}
                {!loading && (
                    <div className="mt-12">
                        <h2 className="mb-4 text-2xl font-sour-gummy font-medium">
                            Related Products
                        </h2>
                        <RelatedProducts rel={data?.category?.slug || ""} />
                        <LinkButton
                            href="/products"
                            className="mx-auto mt-6 group"
                        >
                            See All
                            <MoveRight className="group-hover:ml-2 transition-all" />
                        </LinkButton>
                    </div>
                )}
            </section>
        </>
    );
}
