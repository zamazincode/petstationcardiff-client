import Image from "next/image";
import Logo from "../Logo";
import { Headset, HeartPulse, Leaf, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { footerLinks } from "@/lib/constants/menu";

export default function Footer() {
    return (
        <footer className="gradient relative h-full mb-0 pt-12 mt-20">
            <Image
                src="/dog.png"
                alt="Dog Photo"
                width={354}
                height={497}
                className="absolute -top-78 right-0 z-10"
                priority
            />

            <div className="container mb-16 flex items-stretch gap-8 max-md:flex-col">
                {/* Box */}
                <div className="max-w-[400px] p-8 w-fit rounded-xl bg-gradient-to-b from-[#DEBFFF]/10 to-[#DEBFFF]/20 border border-[#B74BFF]/15 ">
                    <Logo className="mb-2" />
                    {/* <p className="text-lg my-2 text-foreground/80">
                        Top quality food and products for the happiness & health
                        of your pet!
                    </p> */}
                    {/* 
                    <div className="flex gap-6 font-medium mt-4">
                        <div className="flex items-center gap-2">
                            <Leaf color="#612CC9" />
                            100% Natural
                        </div>

                        <div className="flex items-center gap-2">
                            <HeartPulse color="#612CC9" />
                            Healty
                        </div>
                    </div> */}

                    <hr className="my-4" />

                    <ul className="space-y-4">
                        <li>
                            <Link
                                href="tel:+02920490249"
                                className="flex gap-2.5 hover:text-primary transition-all"
                            >
                                <Phone color="#612CC9" className="shrink-0" />
                                029 2049 02 49
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="mailto:info@petstationcardiff.com"
                                className="flex gap-2.5 hover:text-primary transition-all"
                            >
                                <Mail color="#612CC9" className="shrink-0" />
                                info@petstationcardiff.com
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="https://maps.app.goo.gl/tnoXpaKo8bRvMk1a9"
                                target="_blank"
                                className="flex gap-2.5 hover:text-primary transition-all"
                            >
                                <MapPin color="#612CC9" className="shrink-0" />
                                Unit 1 Dominion Business Centre Dominion Way
                                Newport Road Cardiff Cf24 1pt
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Menu */}
                <div className="flex justify-evenly w-full mr-32 max-md:flex-wrap max-md:justify-start gap-8">
                    <ul className="space-y-1.5">
                        <li className="font-semibold mb-4">Categories</li>
                        {footerLinks.categories.map((link) => (
                            <li
                                key={link.title}
                                className="text-copy-light hover:text-copy hover:translate-x-1 transition-all"
                            >
                                <Link href={link.href}>{link.title}</Link>
                            </li>
                        ))}
                    </ul>

                    <ul className="space-y-1.5">
                        <li className="font-semibold mb-4">Informations</li>
                        {footerLinks.information.map((link) => (
                            <li
                                key={link.title}
                                className="text-copy-light hover:text-copy hover:translate-x-1 transition-all"
                            >
                                <Link
                                    href={link.href}
                                    target={link.external ? "_blank" : "_self"}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div>
                        <ul className="space-y-1.5">
                            <li className="font-semibold mb-4">Account</li>
                            {footerLinks.account.map((link) => (
                                <li
                                    key={link.title}
                                    className="text-copy-light hover:text-copy hover:translate-x-1 transition-all"
                                >
                                    <Link href={link.href}>{link.title}</Link>
                                </li>
                            ))}
                        </ul>

                        <ul className="space-y-1.5 mt-8">
                            <li className="font-semibold mb-4">Help</li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-center p-1 gap-1 border border-primary transition-colors rounded-md text-copy hover:bg-primary hover:text-white "
                                >
                                    <Headset />
                                    Contact
                                </Link>
                            </li>

                            <li className="">
                                <Link
                                    href="https://m.me//PetStationCardiff"
                                    target="_blank"
                                    className="flex items-center justify-center p-1 gap-1 bg-green-500 hover:bg-green-600 transition-colors rounded-md text-white"
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
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#FFE66B] py-3 text-center text-sm">
                {
                    "Copyright © 2024 Pet Station ( Sunny pet foods Ltd ) All Rights Reserved"
                }
            </div>
        </footer>
    );
}
