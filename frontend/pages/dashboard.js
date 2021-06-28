import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import LeftContainer from "../components/dash-left";
import RightContainer from "../components/dash-right";

const pageTitle = "Dashboard | Clubhouse";

export default function Dashboard() {
	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<div className="bg-gray-100 h-full">
				<div className="container mx-auto max-w-6xl box-border">
					<div className=" flex flex-row py-8 items-start">
						<LeftContainer />
						<RightContainer />
					</div>
				</div>
			</div>
		</Layout>
	);
}
