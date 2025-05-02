export default function LoadingAnimation() {
    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center w-full h-screen z-50 bg-[#e6dcdc]">
                <div className="cat">
                    <div className="cat__body"></div>
                    <div className="cat__body"></div>
                    <div className="cat__tail"></div>
                    <div className="cat__head"></div>
                </div>
            </div>
        </>
    );
}
