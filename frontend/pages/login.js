import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { sendData } from "../api";

import Input from "../components/control/Input";
import SubmitButton from "../components/control/SubmitButton";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		const body = {
			email,
			password,
		};
		try {
			const data = await sendData("/auth/login", body);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="lg:flex">
			<div className="lg:w-1/2 xl:max-w-screen-sm ml-8">
				<div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
					<div className="cursor-pointer flex items-center">
						<div>
							<svg
								className="w-10 text-indigo-500"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								version="1.1"
								id="Layer_1"
								x="0px"
								y="0px"
								viewBox="0 0 225 225"
								xmlSpace="preserve"
							>
								<g transform="matrix( 1, 0, 0, 1, 0,0) ">
									<g>
										<path
											id="Layer0_0_1_STROKES"
											className="st0"
											d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
										/>
									</g>
								</g>
							</svg>
						</div>
						<div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
							blockify
						</div>
					</div>
				</div>
				<div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
					<h2
						className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                            xl:text-bold"
					>
						Log in
					</h2>
					<div className="mt-4">
						<form>
							<Input
								label="Email Address"
								type="email"
								placeholder="john.snow@yahoo.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Input
								label="Password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<SubmitButton onClick={(e) => onSubmit(e)} label="Sign In" />
						</form>
						<div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
							{"Don't have an account ? "}
							<Link href="/register">
								<a className="cursor-pointer text-indigo-600 hover:text-indigo-800">
									Sign up
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
				<div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
					<Image
						src="/images/svg1.svg"
						alt="login"
						width={1000}
						height={1000}
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
