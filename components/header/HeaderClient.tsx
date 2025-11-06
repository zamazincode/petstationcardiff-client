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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogIn, Package2, User2 } from "lucide-react";
import SearchBar from "../SearchBar";
import Cart from "../Cart";
import { LogoutButton } from "../ui/logout-button";
import Logo from "../Logo";
import { useEffect, useState } from "react";

export default function HeaderClient({ isAuth }: { isAuth: boolean }) {
	const [showHeader, setShowHeader] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY < lastScrollY || currentScrollY < 50) {
				setShowHeader(true);
			} else {
				setShowHeader(false);
			}
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);

	return (
		<>
			<div className="w-full lg:block hidden h-[73.6px]"></div>
			<div
				className={`w-full py-4 lg:block hidden transition-transform duration-300 ${
					showHeader ? "translate-y-0" : "-translate-y-full"
				} fixed top-0 left-0 z-50 bg-white`}
			>
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

						{isAuth ? (
							<NavigationMenu>
								<NavigationMenuList>
									<NavigationMenuItem>
										<NavigationMenuTrigger
											isIcon={false}
											className="p-2 h-full !aspect-square rounded-full border cursor-pointer"
										>
											<User2 />
										</NavigationMenuTrigger>

										<NavigationMenuContent>
											<NavigationMenuLink asChild>
												<Link
													href="/profile/my-orders"
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
										</NavigationMenuContent>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						) : (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											href="/login"
											className="p-2 h-full aspect-square rounded-full border cursor-pointer flex items-center justify-center hover:bg-gray-50 transition-colors"
										>
											<User2 />
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>Log In</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}

						<Cart />
					</div>
				</header>
			</div>
		</>
	);
}
