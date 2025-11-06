"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ZodErrors } from "@/components/zod-errors";
import { checkoutAction } from "@/data/actions/checkout-action";
import { checkStock } from "@/data/services/check-stock";
import { useCartStore } from "@/lib/stores/cartStore";
import Image from "next/image";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const INITIAL_STATE = {
	data: null,
};

export default function ClientCheckout({ user }: { user: boolean }) {
	const searchParams = useSearchParams();

	const normalItems = useCartStore((state) => state.normalItems);
	const boxDeals = useCartStore((state) => state.boxDeals);

	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeNormalItem = useCartStore((state) => state.removeNormalItem);

	const subTotal =
		normalItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
		boxDeals.reduce((acc, deal) => acc + deal.price, 0);

	const [formState, formAction, isPending] = useActionState(
		checkoutAction,
		INITIAL_STATE,
	);

	const router = useRouter();

	useEffect(() => {
		// if there is no item in cart route
		if (normalItems.length === 0 && boxDeals.length === 0) {
			router.push("/");
			toast.warning("There is no item in your cart!");
		}

		// check stock
		const checkStocks = async () => {
			for (const item of normalItems) {
				const stock = await checkStock(item.slug, item.quantity);
				if (stock === 0) {
					removeNormalItem(item.id);
					toast.warning(
						"Some products deleted from cart. Because there is no stock.",
					);
				} else if (item.quantity > stock) {
					updateQuantity(item.id, stock);
					toast.warning(
						"Some products deleted from cart. Because there is no stock.",
					);
				}
			}
		};

		checkStocks();
	}, []);

	useEffect(() => {
		if (formState.url) router.push(formState.url);
	}, [formState]);

	useEffect(() => {
		const isCanceled = searchParams.get("canceled");
		isCanceled && toast.error("Payment canceled! Please try again.");
	}, [searchParams]);

	const [different, setDifferent] = useState(false);
	const [selectedShip, setSelectedShip] = useState("flat");

	const [formValues, setFormValues] = useState({
		bilFirstName: "",
		bilLastName: "",
		bilStreet: "",
		bilCity: "",
		bilPostCode: "",
		bilPhone: "",
		shipFirstName: "",
		shipLastName: "",
		shipStreet: "",
		shipCity: "",
		shipPostCode: "",
		shipPhone: "",
		email: "",
		note: "",
		differentAddress: false,
		terms: false,
	});

	const handleInputChange = (field: string, value: string) => {
		setFormValues((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCheckboxChange = (field: string, checked: boolean) => {
		setFormValues((prev) => ({
			...prev,
			[field]: checked,
		}));

		if (field === "differentAddress") {
			setDifferent(checked);
		}
	};

	return (
		<div className="container mb-36 sm:mb-64">
			<div>
				<h1 className="text-2xl font-semibold mb-2">Checkout</h1>
				{!user && (
					<div>
						Returning customer?{" "}
						<Link href="/login" className="text-primary">
							Click here to login
						</Link>
					</div>
				)}
				{formState.error && (
					<div className="bg-red-200 text-red-600 text-center">
						{formState.error}
					</div>
				)}
			</div>

			<form
				action={formAction}
				className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 "
			>
				<Card>
					<CardHeader>
						<CardTitle>Billing Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<input
							type="hidden"
							name="normalItems"
							value={JSON.stringify(normalItems)}
						/>
						<input
							type="hidden"
							name="boxDeals"
							value={JSON.stringify(boxDeals)}
						/>

						<div className="space-y-2">
							<Label htmlFor="bilFirstName">First Name*</Label>
							<Input
								required
								id="bilFirstName"
								name="bilFirstName"
								type="text"
								placeholder="Your name"
								value={formValues.bilFirstName}
								onChange={(e) =>
									handleInputChange(
										"bilFirstName",
										e.target.value,
									)
								}
							/>
							<ZodErrors
								error={formState?.zodErrors?.bilFirstName}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="bilLastName">Last Name*</Label>
							<Input
								required
								id="bilLastName"
								name="bilLastName"
								type="text"
								placeholder="Your last name"
								value={formValues.bilLastName}
								onChange={(e) =>
									handleInputChange(
										"bilLastName",
										e.target.value,
									)
								}
							/>
							<ZodErrors
								error={formState?.zodErrors?.bilLastName}
							/>
						</div>

						<div className="space-y-2 mt-6">
							<Label>Country / Region</Label>
							<div className="border px-2.5 py-2 rounded-md text-sm">
								United Kingdom (UK)
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="bilStreet">Street Address*</Label>
							<Input
								required
								id="bilStreet"
								name="bilStreet"
								type="text"
								placeholder="Address"
								value={formValues.bilStreet}
								onChange={(e) =>
									handleInputChange(
										"bilStreet",
										e.target.value,
									)
								}
							/>
							<ZodErrors
								error={formState?.zodErrors?.bilStreet}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="bilCity">Town / City*</Label>
							<Input
								required
								id="bilCity"
								name="bilCity"
								type="text"
								placeholder="City"
								value={formValues.bilCity}
								onChange={(e) =>
									handleInputChange("bilCity", e.target.value)
								}
							/>
							<ZodErrors error={formState?.zodErrors?.bilCity} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="bilPostCode">Post Code*</Label>
							<Input
								required
								id="bilPostCode"
								name="bilPostCode"
								type="text"
								placeholder="Post code"
								value={formValues.bilPostCode}
								onChange={(e) =>
									handleInputChange(
										"bilPostCode",
										e.target.value,
									)
								}
							/>
							<ZodErrors
								error={formState?.zodErrors?.bilPostCode}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="bilPhone">Phone*</Label>
							<Input
								required
								id="bilPhone"
								name="bilPhone"
								type="tel"
								placeholder="Phone"
								value={formValues.bilPhone}
								onChange={(e) =>
									handleInputChange(
										"bilPhone",
										e.target.value,
									)
								}
							/>
							<ZodErrors error={formState?.zodErrors?.bilPhone} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email*</Label>
							<Input
								required
								id="email"
								name="email"
								type="email"
								placeholder="Email address"
								value={formValues.email}
								onChange={(e) =>
									handleInputChange("email", e.target.value)
								}
							/>
							<ZodErrors error={formState?.zodErrors?.email} />
						</div>

						<div className="items-center flex space-x-2">
							<Checkbox
								id="differentAddress"
								name="differentAddress"
								checked={different}
								onCheckedChange={(checked) =>
									handleCheckboxChange(
										"differentAddress",
										checked === true,
									)
								}
							/>
							<Label
								htmlFor="differentAddress"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Ship to a different address?
							</Label>
						</div>

						{different && (
							<>
								<div className="space-y-2">
									<Label htmlFor="shipFirstName">
										First Name*
									</Label>
									<Input
										required
										id="shipFirstName"
										name="shipFirstName"
										type="text"
										placeholder="Your name"
										value={formValues.shipFirstName}
										onChange={(e) =>
											handleInputChange(
												"shipFirstName",
												e.target.value,
											)
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="shipLastName">
										Last Name*
									</Label>
									<Input
										required
										id="shipLastName"
										name="shipLastName"
										type="text"
										placeholder="Your last name"
										value={formValues.shipLastName}
										onChange={(e) =>
											handleInputChange(
												"shipLastName",
												e.target.value,
											)
										}
									/>
								</div>

								<div className="space-y-2 mt-6">
									<Label>Country / Region</Label>
									<div className="border px-2.5 py-2 rounded-md text-sm">
										United Kingdom (UK)
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="shipStreet">
										Street Address*
									</Label>
									<Input
										required
										id="shipStreet"
										name="shipStreet"
										type="text"
										placeholder="Address"
										value={formValues.shipStreet}
										onChange={(e) =>
											handleInputChange(
												"shipStreet",
												e.target.value,
											)
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="shipCity">
										Town / City*
									</Label>
									<Input
										required
										id="shipCity"
										name="shipCity"
										type="text"
										placeholder="City"
										value={formValues.shipCity}
										onChange={(e) =>
											handleInputChange(
												"shipCity",
												e.target.value,
											)
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="shipPostCode">
										Post Code*
									</Label>
									<Input
										required
										id="shipPostCode"
										name="shipPostCode"
										type="text"
										placeholder="Post code"
										value={formValues.shipPostCode}
										onChange={(e) =>
											handleInputChange(
												"shipPostCode",
												e.target.value,
											)
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="shipPhone">Phone*</Label>
									<Input
										required
										id="shipPhone"
										name="shipPhone"
										type="text"
										placeholder="Phone"
										value={formValues.shipPhone}
										onChange={(e) =>
											handleInputChange(
												"shipPhone",
												e.target.value,
											)
										}
									/>
								</div>
							</>
						)}

						<div className="space-y-2">
							<Label htmlFor="note">Order notes (optional)</Label>
							<Textarea
								id="note"
								name="note"
								placeholder="Note"
								value={formValues.note}
								onChange={(e) =>
									handleInputChange("note", e.target.value)
								}
							/>
						</div>
					</CardContent>
				</Card>

				<Card className="h-fit">
					<CardHeader>
						<CardTitle>Your order</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{normalItems.length > 0 && (
								<div className="space-y-2.5">
									{normalItems.map((item) => (
										<Product item={item} key={item.id} />
									))}
								</div>
							)}

							{boxDeals.length > 0 &&
								boxDeals.map((deal) => (
									<div
										key={deal.id}
										className="flex items-start gap-2 shadow p-2 rounded-lg "
									>
										<div className="bg-[#e1f2f9] w-[100px]  p-1 h-full !aspect-square flex items-center justify-center overflow-hidden rounded-lg">
											<Image
												src={deal.image}
												alt={deal.name}
												width={100}
												height={100}
												className="w-full h-full !object-contain"
											/>
										</div>
										<div className="w-full flex flex-col justify-between h-full">
											<div className="flex items-center justify-between">
												<div className="font-medium text-copy text-ellipsis line-clamp-2">
													{deal.name}
												</div>
											</div>
											<div className="flex flex-col items-start justify-between">
												<div className="space-y-1 text-sm">
													{deal.selectedItems.map(
														(item) => (
															<div
																key={item.id}
																className="text-muted-foreground"
															>
																{item.name} (
																{item.quantity})
															</div>
														),
													)}
												</div>
												<div></div>
												<div className="font-semibold w-fit mt-2 ml-auto">
													{deal.price.toFixed(2)} £
												</div>
											</div>
										</div>
									</div>
								))}
						</div>

						<div className="flex items-end justify-between px-2">
							<span>Subtotal:</span>
							<span className="font-semibold">
								{subTotal.toFixed(2)} £
							</span>
						</div>

						<div className="flex items-start justify-between px-2 border-t border-b py-6">
							<span className="font-semibold">Shipping:</span>
							<RadioGroup
								value={selectedShip}
								onValueChange={(val) => setSelectedShip(val)}
								defaultValue="flat"
								name="shipping"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="flat" id="flat" />
									<Label htmlFor="flat">
										Flat Rate: 4.00 £
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="local" id="local" />
									<Label htmlFor="local">Local pickup</Label>
								</div>
							</RadioGroup>
						</div>

						<div className="flex items-end justify-between">
							<span className="text-lg">Total:</span>
							<span className="text-xl font-bold">
								{(
									subTotal + (selectedShip === "flat" ? 4 : 0)
								).toFixed(2)}{" "}
								£
							</span>
						</div>

						<div className="items-center flex space-x-2">
							<Checkbox
								required
								id="terms"
								name="terms"
								checked={formValues.terms}
								onCheckedChange={(checked) =>
									handleCheckboxChange(
										"terms",
										checked === true,
									)
								}
							/>
							<Label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								<div>
									I have read and agree to the website{" "}
									<Link
										href="/terms-conditions"
										className="text-primary text-nowrap"
									>
										terms and conditions
									</Link>{" "}
									*
								</div>
							</Label>
						</div>

						<Button
							type="submit"
							disabled={isPending}
							className="w-full py-4 flex items-center justify-center mt-6"
						>
							{isPending ? (
								<span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></span>
							) : (
								"Order"
							)}
						</Button>
					</CardContent>
				</Card>
			</form>
		</div>
	);
}

const Product = ({ item }) => {
	return (
		<div className="flex items-center gap-2 shadow p-2 rounded-lg h-[90px]">
			<div className="bg-[#e1f2f9] w-[100px] p-1 h-full !aspect-square flex items-center justify-center overflow-hidden rounded-lg">
				<Image
					src={item.image}
					alt={item.name}
					width={100}
					height={100}
					className="w-full h-full !object-contain"
				/>
			</div>
			<div className="w-full flex flex-col justify-between gap-2">
				<div className="font-medium text-copy text-ellipsis line-clamp-2">
					{item.name}
				</div>

				<div className="flex items-end justify-between">
					<div className="flex items-center gap-1">
						{item.quantity}
						<span className="text-sm">x</span>
						{item.price}
					</div>
					<div className=" font-semibold">
						{(item.price * item.quantity).toFixed(2)} £
					</div>
				</div>
			</div>
		</div>
	);
};
