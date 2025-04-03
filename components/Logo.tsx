import { cn } from "@/lib/utils";
import Link from "next/link";

type propTypes = {
    className?: string;
    variant?: "link" | "normal";
};

export default function Logo({ className, variant }: propTypes) {
    if (variant === "link") {
        return (
            <Link
                href="/"
                className={cn(
                    "text-2xl font-bold leading-tight font-sour-gummy",
                    className,
                )}
            >
                <span className="text-primary">PetStation</span>Cardiff
            </Link>
        );
    }

    return (
        <div
            className={cn(
                "text-2xl font-bold leading-tight font-sour-gummy",
                className,
            )}
        >
            <span className="text-primary">PetStation</span>Cardiff
        </div>
    );
}
