import { useState } from "react";

const SearchBar = ({ setStartSearch }) => {
	const onSubmit = (e) => {
		e.preventDefault();
		setStartSearch(searchTerm);
	};
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="flex flex-col">
			<p className="my-4 ml-2 self-start flex-shrink text-xl font-bold">
				Discover Clubs
			</p>
			<div className="flex w-full space-x-2">
				<input
					className="border-2 border-gray-300 py-2 flex-1 bg-white h-10 pl-4 pr-2 rounded-lg text-sm focus:outline-none"
					type="search"
					name="search"
					placeholder="Search for Clubs"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				></input>
				<button
					onClick={onSubmit}
					// type="submit"
					className="flex-none border-2 border-gray-300 py-2 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
