import { cn } from "@/lib/utils";
import Link from "next/link";

type PropTypes = {
    children: React.ReactNode;
    className?: string;
    href: string;
    isExternal?: boolean;
};

export default function LinkButton({
    children,
    className,
    href,
    isExternal,
}: PropTypes) {
    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : "_self"}
            className={cn(
                "lg:py-3 lg:px-5 px-2.5 py-1.5 flex md:gap-4 bg-primary rounded-full text-white w-fit hover:bg-primary/90 transition-all",
                className,
            )}
        >
            {children}
        </Link>
    );
}
