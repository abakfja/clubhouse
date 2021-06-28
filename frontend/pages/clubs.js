import Layout from "../components/layout";
import Head from "next/head";

const pageTitle = "Groups | Clubhouse";

const Post = () => {
	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<p>Groups page</p>
		</Layout>
	);
};

export default Post;
