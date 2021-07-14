import Link from "next/link";
import { updateData } from "../../api";

const joinClub = async (e, clubid) => {
	e.preventDefault();
	try {
		console.log("making req");
		const response = await updateData(`/clubs/${clubid}/join`, {});
		console.log("done req", response);
	} catch (err) {
		console.log(err);
	}
};

export const LightCard = ({ club }) => {
	const { _id, name, description, count } = club;
	return (
		<div className="bg-white border border-white shadow-lg  rounded-xl p-4 m-4 ">
			<div className="flex-none sm:flex">
				<div className="relative h-32 w-32 sm:mb-0 mb-3">
					<img
						src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
						alt="aji"
						className=" w-50 h-32 object-cover rounded-lg"
					/>
				</div>
				<div className="flex-auto flex flex-col sm:ml-5 justify-evenly">
					<div className="flex-1 flex items-start sm:mt-2">
						<div className="flex items-center">
							<div className="flex flex-col">
								<Link href={`/clubs/${_id}`}>
									<a>
										<div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
											{name}
										</div>
									</a>
								</Link>
								<div className="flex-auto text-gray-500 my-1">
									<span>{description}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex mt-2  text-sm text-gray-500">
						<div className="flex-1 inline-flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
							</svg>
							<p className="">
								{count} Member{count == 1 ? "" : "s"}
							</p>
						</div>
						<button
							type="submit"
							onClick={(e) => joinClub(e, _id)}
							className="flex items-center justify-evenly py-2 px-5 text-sm font-medium text-gray-800 bg-gray-300 rounded-3xl hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
						>
							Join Group
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const DarkCard = ({ club }) => {
	const { _id, name, description, count } = club;
	return (
		<div className="bg-gray-900 border border-gray-900 shadow-lg  rounded-xl p-4 m-4">
			<div className="flex-none sm:flex">
				<div className="relative h-32 w-32 sm:mb-0 mb-3">
					<img
						src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
						alt="aji"
						className=" w-50 h-32 object-cover rounded-lg"
					/>
				</div>
				<div className="flex-auto flex flex-col sm:ml-5 justify-evenly">
					<div className="flex-1 flex items-start sm:mt-2">
						<div className="flex items-center">
							<div className="flex flex-col">
								<Link href={`/clubs/${_id}`}>
									<a>
										<div className="w-full flex-none text-lg text-gray-200 font-bold leading-none">
											{name}
										</div>
									</a>
								</Link>
								<div className="flex-auto text-gray-400 my-1">
									<span>{description}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex mt-2  text-sm text-gray-400">
						<div className="flex-1 inline-flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
							</svg>
							<p className="">
								{count} Member{count == 1 ? "" : "s"}
							</p>
						</div>
						<button
							type="submit"
							onClick={(e) => joinClub(e, _id)}
							className="flex items-center justify-evenly py-2 px-5 text-sm font-medium text-gray-800 bg-gray-300 rounded-3xl hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
						>
							Join Group
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
