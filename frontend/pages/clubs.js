import Layout from "../components/layout";
import SearchBar from "../components/club-search";
import Head from "next/head";

const pageTitle = "Clubs | Clubhouse";

const Post = () => {
	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<SearchBar />
		</Layout>
	);
};

export default Post;
