"use client";

import Link from "next/link";
import { headerLinks } from "@/lib/constants/menu";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LogIn, Package2, User2 } from "lucide-react";
import SearchBar from "../SearchBar";
import Cart from "../Cart";
import { LogoutButton } from "../ui/logout-button";
import Logo from "../Logo";

export default function HeaderClient({ isAuth }: { isAuth: boolean }) {
    return (
        <div className="w-full py-4 lg:block hidden">
            <header className="container flex justify-between items-center">
                <Logo variant="link" />

                <nav className="flex items-center justify-center gap-6">
                    {headerLinks.map((navItem) =>
                        navItem.links ? (
                            <NavigationMenu key={navItem.title}>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>
                                            {navItem.title}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            {navItem.links.map((link) => (
                                                <NavigationMenuLink
                                                    asChild
                                                    key={link.title}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        className="text-nowrap hover:text-primary"
                                                    >
                                                        {link.title}
                                                    </Link>
                                                </NavigationMenuLink>
                                            ))}
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        ) : (
                            <Link
                                href={navItem.href}
                                key={navItem.title}
                                className="text-nowrap hover:text-primary"
                            >
                                {navItem.title}
                            </Link>
                        ),
                    )}
                </nav>

                <div className="flex items-center justify-center gap-4">
                    <SearchBar />

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    isIcon={false}
                                    className="p-2 h-full !aspect-square rounded-full border cursor-pointer"
                                >
                                    <Link href="/profile" className="">
                                        <User2 />
                                    </Link>
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                    {isAuth ? (
                                        <>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/profile"
                                                    className="flex flex-row justify-between items-center hover:text-primary transition-colors text-nowrap gap-6 "
                                                >
                                                    Profile
                                                    <User2 className="text-inherit" />
                                                </Link>
                                            </NavigationMenuLink>

                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/profile"
                                                    className="flex flex-row justify-between items-center hover:text-primary transition-colors text-nowrap gap-6"
                                                >
                                                    My Orders
                                                    <Package2 className="text-inherit" />
                                                </Link>
                                            </NavigationMenuLink>

                                            <NavigationMenuLink
                                                asChild
                                                className="p-0 py-0 bg-transparent hover:bg-transparent"
                                            >
                                                <LogoutButton />
                                            </NavigationMenuLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/login"
                                                    className="flex flex-row justify-between items-center hover:text-primary transition-colors text-nowrap gap-6"
                                                >
                                                    Log In
                                                    <LogIn className="text-inherit" />
                                                </Link>
                                            </NavigationMenuLink>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/register"
                                                    className="flex flex-row justify-between items-center hover:text-primary transition-colors text-nowrap gap-6"
                                                >
                                                    Sign Up
                                                    <User2 className="text-inherit" />
                                                </Link>
                                            </NavigationMenuLink>
                                        </>
                                    )}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <Cart />
                </div>
            </header>
        </div>
    );
}
