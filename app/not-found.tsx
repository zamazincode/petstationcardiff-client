import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="w-full h-screen">
            <h1>Could not found</h1>
            <Button asChild>
                <Link href="/" className="">
                    Return Homepage
                </Link>
            </Button>
        </div>
    );
}
