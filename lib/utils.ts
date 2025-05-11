import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { remark } from "remark";
import html from "remark-html";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getStrapiURL() {
    return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export async function markdownToHtml(markdown: any) {
    const result = await remark().use(html).process(markdown);
    console.log(result);
    return result.toString();
}
