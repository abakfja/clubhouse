import Link from "next/link";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
// import utilStyles from '../styles/utils.module.css'

export default function Home() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Link href="/about">
				<a>Know More -&gt;</a>
			</Link>
		</Layout>
	);
}
