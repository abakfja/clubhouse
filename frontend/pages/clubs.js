import Layout from "../components/layout";
import Head from "next/head";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "../api";
import SearchBar from "../components/Clubs/clubSearch";
import { DarkCard, LightCard } from "../components/Clubs/clubCard";

const pageTitle = "Clubs | Clubhouse";

const Post = () => {
	const [startSearch, setStartSearch] = useState("");

	const { data, error } = useSWR(`/clubs?q=${startSearch}`, fetcher);
	if (error) {
		console.log(error);
		return <div>failed to load </div>;
	}
	// if (!data) return <div>loading...</div>;
	const clubs = data?.object || [];
	console.log(clubs);

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<div className="container m-8 text-center mx-auto max-w-xl">
				<SearchBar setStartSearch={setStartSearch} />
				<div className="mt-12 flex-col items-center justify-center">
					{/* {clubs.length ? <></> : <p> No clubs to display</p>} */}
					<LightCard />
				</div>
			</div>
		</Layout>
	);
};

export default Post;
