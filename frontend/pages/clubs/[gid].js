import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Head from "next/head";

const Post = () => {
	const router = useRouter();
	const { gid } = router.query;

	const pageTitle = `${gid} | Clubhouse`;

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<p>Group: {gid}</p>
		</Layout>
	);
};

export default Post;
