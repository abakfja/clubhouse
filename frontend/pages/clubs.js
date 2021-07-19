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
	const clubs = data?.obj || [];
	console.log(clubs);

	return (
		<Layout>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<div className="m-8">
				<div className="text-center mx-auto max-w-2xl container">
					<SearchBar setStartSearch={setStartSearch} />
				</div>
				<div
					className="mt-16 grid mx-auto max-w-6xl"
					style={{
						gridTemplateColumns: "repeat(auto-fit, minmax(25rem, 1fr))",
						gridGap: "3rem",
					}}
				>
					{clubs.map((club, index) =>
						index % 4 == 0 || index % 4 == 3 ? (
							<LightCard club={club} key={club._id} />
						) : (
							<DarkCard club={club} key={club._id} />
						)
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Post;
