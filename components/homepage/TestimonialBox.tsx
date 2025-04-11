import { PawPrint, Star, StarHalf } from "lucide-react";
import Image from "next/image";

export default function TestimoanialBox({ testimonial }) {
    return (
        <div className="p-8 relative bg-card rounded-3xl max-w-[400px] min-w-[250px] h-full flex flex-col ">
            {/* <span className="text-4xl font-sour-gummy text-primary absolute top-29 rotate-12 left-4 pointer-events-none">
                {"❝"}
            </span> */}

            <div
                className="absolute right-7 top-3 w-fit p-1.5 text-white rounded-full"
                style={{ backgroundColor: testimonial.color }}
            >
                <PawPrint className="-rotate-45" size={24} />
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-muted relative">
                        <Image
                            src={
                                testimonial.gender === "man"
                                    ? "/man.png"
                                    : "/woman.png"
                            }
                            alt={testimonial.name}
                            fill
                        />
                    </div>
                    <h6 className=" font-bold">{testimonial.name}</h6>
                </div>
                <div className="flex">
                    <Star fill="#f9be1a" stroke="#fill" />
                    <Star fill="#f9be1a" stroke="#fill" />
                    <Star fill="#f9be1a" stroke="#fill" />
                    <Star fill="#f9be1a" stroke="#fill" />
                    <Star fill="#f9be1a" stroke="#fill" />
                    {/* <StarHalf fill="#f9be1a" stroke="#fill" /> */}
                </div>
            </div>

            <hr className="my-4" />

            <p className="text-wrap text-justify w-full line-clamp-5">
                {testimonial.testimonial}
            </p>
        </div>
    );
}
