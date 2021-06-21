import Link from "next/link";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css"

export default function About() {
	return (
		<Layout>
			<Head>
				<title>About | {siteTitle}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					clubhouse is for the discoverability of club activities inside IIIT
				</p>
			</section>
			<Link href="/">
				<a>Back to Home</a>
			</Link>
		</Layout>
	);
}
