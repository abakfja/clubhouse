import Head from "next/head";
import Navbar from "./navbar";

export const siteTitle = "clubhouse";

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Platform for discovering clubs in IIIT"
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<Navbar />
			<header>
				<p className="text-4x1">Welcome to clubhouse!</p>
			</header>
			<main>{children}</main>
		</div>
	);
}
