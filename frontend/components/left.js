import Image from "next/image";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon, PlusCircleIcon } from "@heroicons/react/solid";

const groups = [
	"adkjsf;asdfj",
	"adjsfklaldsf",
	"aldjsfkldasf",
	"adfjdkladskd",
	"afdfjskladskd",
];

const admin = [
	"adfjsadksfja",
	"fadkjsfkljad",
	"fakdljsfkldk",
	"dfjadklsjfds",
	"fjkldjasklfj",
];

const MyList = ({ items }) => {
	return (
		<ul className="list-disc space-y-2">
			{items.map((item, index) => (
				<li className="flex items-start pt-1" key={index}>
					<span className=" flex items-center h-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="flex-shrink-0 h-5 w-5 text-cyan-500"
							fill="none"
							viewBox="0 0 22 22"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
								clipRule="evenodd"
							/>
						</svg>
					</span>
					<p className="ml-2">{item}</p>
				</li>
			))}
		</ul>
	);
};

const MyDisclosure = ({ items, title }) => {
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button className="flex self-stretch mt-4 justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
						<span>{title}</span>
						<ChevronUpIcon
							className={`${
								open ? "transform rotate-180" : ""
							} w-5 h-5 text-purple-500`}
						/>
					</Disclosure.Button>
					<Transition
						show={open}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
							<MyList items={items} />
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
};

const LeftContainer = () => {
	return (
		<div className="  flex flex-col w-1/3 justify-center items-center space-y-6">
			<div className=" w-3/5 flex flex-row items-center space-x-4">
				<div className="bg-gray-800 m-4 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
					<Image
						className="h-8 w-8 rounded-full"
						src="/images/avatar.png"
						alt="profile"
						width={80}
						height={80}
					/>
				</div>
				<div>Username</div>
			</div>
			<div className="shadow-lg w-2/5 flex justify-evenly px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<p type="button" className=" ">
					New Group
				</p>
			</div>
			<div className="w-3/5 flex flex-col justify-center items-start">
				{/* <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl"> */}
				<MyDisclosure title={"Clubs"} items={groups} />
				<MyDisclosure title={"Moderating"} items={admin} />
				{/* </div> */}
			</div>
		</div>
	);
};

export default LeftContainer;
