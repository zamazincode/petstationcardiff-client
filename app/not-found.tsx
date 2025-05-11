import Logo from "@/components/Logo";
import LinkButton from "@/components/ui/LinkButton";
import { Home } from "lucide-react";
import Image from "next/image";

export default function NotFoundPage() {
    return (
        <main className="w-full h-screen flex items-center justify-center gradient">
            <div className="p-6 mt-12 shadow-2xl rounded-2xl bg-card relative w-full max-w-md space-y-4">
                <Image
                    src="/dog.png"
                    alt="Dog Photo"
                    width={354 / 2}
                    height={497 / 2}
                    className="absolute -top-39 right-0"
                    priority
                />

                <Logo className="mb-4 block" variant="link" />

                <h1 className="text-4xl font-semibold font-sour-gummy uppercase">
                    OOPS! Page not found.
                </h1>

                <p className="text-copy-light">
                    You must have picked the wrong door because I haven't been
                    able to lay my eye on the page you've been searching for.
                </p>

                <LinkButton href="/" className="group gap-2.5 p-4">
                    <Home />
                    Back to Home
                </LinkButton>
            </div>
        </main>
    );
}
