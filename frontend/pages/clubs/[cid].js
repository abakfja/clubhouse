import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Head from "next/head";

import LeftContainer from "../../components/Clubs/clubLeft";
import RightContainer from "../../components/Clubs/clubRight";

const Post = () => {
	const router = useRouter();
	const { cid } = router.query;

	const pageTitle = `${cid} | Clubhouse`;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<div className=" h-full">
				<div className="container mx-auto max-w-6xl box-border">
					<div className=" flex flex-row py-8 items-start">
						{/* <LeftContainer /> */}
						<RightContainer />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Post;
