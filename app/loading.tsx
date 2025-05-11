import LoadingAnimation from "@/components/ui/loading";

export default function Loading() {
    return (
        <div className="w-full h-screen !fixed inset-0 bg-white">
            <LoadingAnimation />
        </div>
    );
}
