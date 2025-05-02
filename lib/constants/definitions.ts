export type Pet = {
    id: number;
    name: string;
    slug: string;
    image?: Image;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    image?: Image;
};

export type Brand = {
    id: number;
    name: string;
    slug: string;
    logo?: Image;
};

export type Image = {
    id: number;
    url: string;
    formats: {
        thumbnail: {
            url: string;
        };
    };
};

export type Product = {
    id: number;
    name: string;
    description: string;
    slug: string;
    price: number;
    salePrice: number;
    isFeatured: boolean;
    category: Category;
    brand: Brand;
    pets: Pet[];
    images: Image[];
    quantity: number;
    barcode: string;
    trackStock: boolean;
    stockState: "in stock" | "out of stock";
    weight: number;
};

export type BoxDeal = {
    id: number;
    name: string;
    slug: string;
    description: string;
    images: Image[];
    price: number;
    salePrice: number;
    maxQuantity: number;
    products: Product[];
    category: Category;
    brand: Brand;
    pets: Pet[];
};

export type Campaign = {
    id: number;
    productSlug: string;
    image: Image;
};

export type StrapiResponse<T> = {
    data: T[];
    meta?: any;
    error?: any;
};
