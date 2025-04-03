import { cn } from "@/lib/utils";
import Link from "next/link";

type PropTypes = {
    children: React.ReactNode;
    className?: string;
    href: string;
};

export default function LinkButton({ children, className, href }: PropTypes) {
    return (
        <Link
            href={href}
            className={cn(
                "p-3 flex gap-4 bg-primary rounded-lg text-white w-fit hover:bg-primary/90",
                className,
            )}
        >
            {children}
        </Link>
    );
}
