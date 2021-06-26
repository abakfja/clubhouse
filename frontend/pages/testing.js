import Link from "next/link";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
// import Activity from "../components/Activity"

export default function Home() {
	return (
        <>
			<Head>
				<title>{siteTitle}</title>
			</Head>
            {/* <Activity /> */}
        </>
	);
}