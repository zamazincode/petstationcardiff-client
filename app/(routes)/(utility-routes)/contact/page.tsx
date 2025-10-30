import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <section className="space-y-4 container mt-4 pb-20">
            <h1 className="text-4xl md:text-6xl capitalize font-bold mb-4 text-copy">
                Contact Us
            </h1>

            <div className="flex gap-6 flex-col md:flex-row items-center">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-4 ">
                        Do you have some questions?
                    </h2>
                    <p>We are at your disposal 7 days a week!</p>
                    <div className="w-full my-4 border-t border-border" />
                    <p className="text-primary">
                        Pet Station (Sunny pet foods Ltd) 1pt
                    </p>

                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex text-lg gap-2.5 items-center w-full">
                            <MapPin
                                size={28}
                                color="#612cc9"
                                className="shrink-0"
                            />
                            <p>
                                Unit 1 Dominion Business Centre Dominion Way
                                Newport Road Cardiff Cf24
                            </p>
                        </div>

                        <div className="flex text-lg gap-2.5 items-center">
                            <Phone size={28} color="#612cc9" />
                            <p>029 2049 02 49</p>
                        </div>

                        <Link
                            href="mailto:info@petstationcardiff.com"
                            className="flex text-lg gap-2.5 items-center"
                        >
                            <Mail size={28} color="#612cc9" />
                            <p>info@petstationcardiff.com</p>
                        </Link>

                        <Link
                            href="https://m.me//PetStationCardiff"
                            target="_blank"
                            className="flex w-fit items-center justify-center p-1 gap-1 bg-green-500 hover:bg-green-600 transition-colors rounded-md text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                                ></path>
                            </svg>
                            Live Chat
                        </Link>
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <iframe
                        className="w-full min-h-[400px] rounded-lg"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d317965.09977645095!2d-3.1486204!3d51.4929894!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486e1d9eb71017c9%3A0x8308d51e36eccf2a!2sPet%20Station%20-%20Raw%20Pet%20food%20Supplier!5e0!3m2!1str!2str!4v1752092076777!5m2!1str!2str"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
