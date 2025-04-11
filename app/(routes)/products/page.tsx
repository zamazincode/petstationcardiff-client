"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
    const searcParams = useSearchParams();

    const queries = useState({
        search: searcParams.get("search"),
        category: searcParams.get("category"),
        brand: searcParams.get("brand"),
        pet: searcParams.get("pet"),
    });

    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                setError(false);
            } catch (error) {
                console.log("Products fetch error -> ", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    });

    return (
        <>
            <div>products page search: {searcParams.get("search")}</div>
        </>
    );
}
