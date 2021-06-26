import Head from "next/head";
import Dashboard from "../pages/dashboard";
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
			<Dashboard />

			<main>{children}</main>
		</div>
	);
}
