"use client";

import { useSearchParams } from 'next/navigation';


export function useProductDetails() {
    const searchParams = useSearchParams();

    return {
        src: searchParams.get("src") || "",
        themeHeading: searchParams.get("themeHeading") || "",
        name: searchParams.get("name") || "",
        price: searchParams.get("price") || "",
    };
}
