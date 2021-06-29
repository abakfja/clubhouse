import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Head from "next/head";

const Post = () => {
	const router = useRouter();
	const { cid } = router.query;

	const pageTitle = `${cid} | Clubhouse`;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<p>Club: {cid}</p>
		</Layout>
	);
};

export default Post;
