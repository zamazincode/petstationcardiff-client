const headerLinks = [
	{
		title: "All Brands",
		href: "/products/all-brands",
	},
	{
		title: "Raw Food",
		href: "/products?category=raw-food",
	},
	{
		title: "Dry Food",
		href: "/products?category=dry-food",
	},
	{
		title: "Raw Box Deals",
		href: "/box-deals",
	},
	{
		title: "Treats",
		links: [
			{
				title: "Raw Treats",
				href: "/products?category=raw-treats",
			},
			{
				title: "Dry Treats",
				href: "/products?category=dry-treats",
			},
		],
	},
	{
		title: "More",
		links: [
			{
				title: "Supplement",
				href: "/products?category=supplement",
			},
			{
				title: "Flea, Ticks and Wormers",
				href: "/products?category=flea-ticks-and-wormers",
			},
			{
				title: "Accessories",
				href: "/products?category=accessories",
			},
			{
				title: "Toys",
				href: "/products?category=toys",
			},
		],
	},
];

const footerLinks = {
	categories: [
		{
			title: "Raw Food",
			href: "/products?category=raw-food",
		},
		{
			title: "Dry Food",
			href: "/products?category=dry-food",
		},
		{
			title: "Raw Box Deals",
			href: "/box-deals",
		},
		{
			title: "Raw Treats",
			href: "/products?category=raw-treats",
		},
		{
			title: "Dry Treats",
			href: "/products?category=dry-treats",
		},
		{
			title: "Supplement",
			href: "/products?category=supplement",
		},
		{
			title: "Flea, Ticks and Wormers",
			href: "/products?category=flea-ticks-and-wormers",
		},
		{
			title: "Accessories",
			href: "/products?category=accessories",
		},
		{
			title: "Toys",
			href: "/products?category=toys",
		},
	],

	information: [
		{
			title: "Track Orders",
			href: "https://www.parcelforce.com/track-trace",
			external: true,
		},
		{
			title: "Refund & Returns",
			href: "/returns",
		},
		{
			title: "Delivery Information",
			href: "/delivery",
		},
		{
			title: "About Us",
			href: "/about-us",
		},
		{
			title: "Privacy Policy",
			href: "/privacy-policy",
		},
		{
			title: "Terms & Conditions",
			href: "/terms-conditions",
		},
	],

	account: [
		// {
		//     title: "Account Details",
		//     href: "/profile",
		// },
		{
			title: "My Orders",
			href: "/profile/orders",
		},
	],
};

export { headerLinks, footerLinks };
